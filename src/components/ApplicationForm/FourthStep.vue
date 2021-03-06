<template>
  <v-container>
    <v-row>
      <center><v-label>{{ $t('label.applicant_letter_title') }}</v-label></center>
    </v-row>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <center>
              <img v-if="!isUpload" height="140" src="../../static/upload_no_dokumen.svg">
              <img v-if="isUpload" height="140" src="../../static/upload_dokumen.svg">
            </center>
          </v-col>
          <v-col cols="12" sm="12" md="6" offset-md="3">
            <center><v-label v-if="!isUpload">{{ $t('label.not_yet_upload_file') }}</v-label></center>
            <center><v-label v-if="isUpload">{{ selectedFileName }}</v-label></center>
            <input
              ref="uploader"
              type="file"
              class="d-none"
              accept=".pdf, .jpg, .jpeg, .png"
              @change="onFileChanged"
            >
            <center>
              <v-btn
                v-if="!isUpload"
                color="#2E7D32"
                outlined
                @click="onButtonClick"
              >
                {{ $t('label.upload') }}
              </v-btn>
              <v-btn
                v-if="isUpload"
                color="#2E7D32"
                class="margin-10"
                depressed
                :outlined="true"
                :loading="isSelecting"
                @click="onButtonClick"
              >
                {{ $t('label.reupload') }}
              </v-btn>
              <v-alert
                v-if="uploadAlert"
                type="error"
              >
                {{ $t('label.upload_error_message') }}
              </v-alert>
            </center>
            <ValidationProvider
              rules="required"
            >
              <v-text-field
                v-model="selectedFileName"
                disabled
                class="d-none"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <div class="btn-desktop">
            <v-col cols="6" sm="6" md="6" class="float-right">
              <v-btn
                class="margin-positive"
                color="primary"
                @click="onNext"
              >{{ $t('label.next') }}</v-btn>
              <v-btn
                class="margin-positive"
                outlined
                text
                @click="onPrev"
              >{{ $t('label.cancel') }}</v-btn>
            </v-col>
          </div>
          <div class="btn-mobile">
            <v-col cols="12" sm="12" md="6" class="float-right">
              <v-btn
                class="margin-positive"
                color="primary"
                @click="onNext"
              >{{ $t('label.next') }}</v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="6" class="float-right">
              <v-btn
                class="margin-positive"
                outlined
                text
                @click="onPrev"
              >{{ $t('label.cancel') }}</v-btn>
            </v-col>
          </div>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'SuratPermohonan',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    applicantLetter: {
      type: File,
      default: null
    }
  },
  data() {
    return {
      step: 4,
      isUpload: false,
      selectedFile: null,
      selectedFileName: '',
      uploadAlert: false
    }
  },
  methods: {
    onButtonClick() {
      this.isSelecting = false
      this.isUpload = true
      this.uploadAlert = false
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      this.selectedFileName = this.selectedFile.name
      this.isUpload = true
      this.applicantLetter = e.target.files[0]
      return this.applicantLetter
    },
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        this.uploadAlert = true
        return
      }
      EventBus.$emit('confirmStep', this.applicantLetter)
    },
    onPrev() {
      this.isAddAPD = false
      EventBus.$emit('prevStep', this.step)
    }
  }
}
</script>
<style>
.text-class {
  font-weight: bold;
  font-size: 10px;
}
.btn-desktop {
  display: block;
}
.btn-mobile {
  display: none;
}
@media (max-width: 1199px) and (min-width: 960px) {
}
@media (max-width: 768px) and (min-width: 320px) {
}

@media (max-width: 588px) and (min-width: 320px) {
  .main-card {
    display: none;
  }
  .main-card-mobile {
    display: block;
  }
  .btn-desktop {
    display: none;
  }
  .btn-mobile {
    display: block;
  }
}
</style>
