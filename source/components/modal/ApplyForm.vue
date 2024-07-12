<template>
  <main>
    <button
      v-if="userJobPoint === null"
      class="applied-button"
      disabled
    >
      Chưa tạo profile
    </button>
    <button
      v-else-if="isApplied === false && $moment().isSameOrBefore(isExpired, 'day') && jobStatus === JOB_STATUS_SHOW"
      class="recruitment"
      data-bs-toggle="modal"
      data-bs-target="#applyForm"
    >
      Ứng tuyển
    </button>
    <div v-if="isApplied === true && jobStatus === JOB_STATUS_SHOW" class="applied-button">
      Đã ứng tuyển
    </div>
    <form
      id="applyForm"
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @submit.prevent="submit"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg"
      >
        <div class="modal-content box-modal">
          <div class="delete">
            <img
              src="../../assets/images/users/ic_delete.svg"
              alt=""
              width="13px"
              height="13px"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div class="title">
            <h3>{{ $t('job_detail.apply_job_form')}}</h3>
            <p :class="{ 'font-vi': $i18n.locale === 'vi' }">{{ $i18n.locale === 'ja' ? title : titleVi }}</p>
          </div>
          <div class="px-4 px-lg-5">
          <div class="get-name row form-group">
            <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
              <h5 class="fw-bold">
                {{ $t('job_detail.candidate_name')}}
                <span class="text-danger">*</span>
              </h5>
            </div>
            <input
              v-model="loggedInUser.name"
              type="text"
              placeholder="Nhập tên đầy đủ của bạn"
              class="col-sm-8 col-lg-8 col-xl-9 input-name"
              disabled
            />
          </div>
          <div class="CV row form-group">
            <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
              <h5 class="fw-bold label-form-cv">
                Hình thức ứng tuyển
                <span class="text-danger">*</span>
              </h5>
            </div>
            <div class="col-sm-8 col-lg-8 col-xl-9 p-0 form-cv">
              <div class="d-flex align-items-start form-cvInSystem">
                <input
                  id="cvInSystem"
                  v-model="apply.education_applied"
                  type="radio"
                  class="createCV"
                  name="drone"
                  value="0"
                />
                <label for="cvInSystem">Ứng tuyển trực tiếp</label>
              </div>

              <div v-if="educationReady" style="margin-top: 22px" class="d-flex align-items-center form-cvUpload">
                <input
                  id="cvUpload"
                  v-model="apply.education_applied"
                  type="radio"
                  class="upload"
                  value="1"
                  name="drone"
                  :disabled="!acceptEducation"
                />
                <label for="cvUpload">Đăng kí đào tạo - {{ matchingPoint }} điểm phù hợp <span v-if="acceptEducation && matchingPoint < 75">(Hệ thống đề xuất)</span></label>
              </div>

              <div v-if="$v.apply.cv_type.$error">
                <div
                  v-if="!$v.apply.cv_type.required"
                  class="invalid-feedback error"
                >
                  {{ $t('error_text.required') }}
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="get-message row form-group d-none">
            <div class="col-12">
              <h5 class="fw-bold">{{ $t('job_detail.message_to_recruiter')}}</h5>
            </div>
            <div class="col-12 col-sm-12">
              <textarea
                v-model="apply.message"
                type="text"
                class="col-12 col-sm-12 max-width-95-percent"
                rows="4"
                @input="$v.apply.message.$touch()"
                @blur="$v.apply.message.$touch()"
              >
              </textarea>
            </div>
            <div class="col-12 col-sm-12 row max-width-95-percent">
              <div class="col-7">
                <div v-if="$v.apply.message.$error">
                  <div
                    v-if="!$v.apply.message.maxLength"
                    class="invalid-feedback error"
                  >
                    Vui lòng nhập ít hơn 500 ký tự cho trường này
                  </div>
                </div>
              </div>
              <div v-if="apply.message.length < 500" class="col-5 text-right">{{ $t('general.characters_left_part_1') }}{{ 500 - apply.message.length }}{{$t('general.characters_left_part_2') }}</div>
              <div v-else class="col-5 text-right">{{ $t('general.characters_left_part_1') + 0 + $t('general.characters_left_part_2') }}</div>
            </div>
          </div>
          <div class="d-grid gap-2 col-11 mx-auto apply">
            <button
              class="btn btn-primary fw-bold"
              type="submit"
              :disabled="isDisabledBtnSubmitApplyJob"
            >
              {{ $t('job_detail.apply') }}
            </button>
            <button
              ref="showPopUpAlertBtn"
              class="btn btn-primary fw-bold d-none"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#popUpAlert"
            />
          </div>
        </div>
      </div>
    </form>

    <ApplyJobAlertModal
      :status-alert="status_alert"
    />

  </main>
</template>

<script>
import {mapGetters} from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import {
  required,
  maxLength
} from 'vuelidate/lib/validators'
import ApplyJobAlertModal from "~/components/modal/ApplyJobAlertModal"
import {JOB_STATUS_SHOW} from "~/constants/main"

const NOT_HAVE_CV_IN_SYSTEM = 1
const NOT_HAVE_CV_UPLOAD = 2
const APPLY_JOB_DONE = 3

export default {
  name: 'ApplyForm',
  components: {ApplyJobAlertModal},

  props: {
    title: {
      type: String,
      default: ''
    },
    titleVi: {
      type: String,
      default: ''
    },
    isExpired: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    jobStatus: {
      type: Number,
      default: 0
    },
    checkApply: {
      type: Boolean,
      default: false
    },
    matchingPoint: {
      type: Number,
      default: 0,
    },
    acceptEducation: {
      type: Boolean,
      default: true,
    },
    educationCourses: {
      type: Array,
      default: () => [],
    },
    isApplied: {
      type: Boolean,
      default: false,
    },
    educationReady: {
      type: Boolean,
      default: false,
    },
    userJobPoint: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      status_alert: 0,
      user: {
        name: '',
        candidate: {}
      },

      apply: {
        job: this.id,
        cv_type: 1,
        message: '',
        education_applied: 0,
      },
      checkApp: false,
      isDisabledBtnSubmitApplyJob: false,
      JOB_STATUS_SHOW
    }
  },

  validations: {
    apply: {
      cv_type: {
        required,
      },
      message: {
        maxLength: maxLength(500)
      },
    },
  },

  computed: {
    ...mapGetters(['loggedInUser'])
  },

  watch: {
    'apply.message': {
      handler(val) {
        this.apply.message = val.slice(0, 500)
      },
      deep: true
    }
  },

  created() {
    // this.checkApplied()
    this.getUserProfile()
  },

  methods: {
    async getUserProfile() {
      const { data } = await this.$repositories.users.getUserProfile()
      this.user = Object.assign({}, data)
    },

    async submit() {
      this.$v.apply.$touch()
      if (!this.$v.apply.$invalid) {
        this.isDisabledBtnSubmitApplyJob = true
        const body = this.apply;
        body.matching_point = this.matchingPoint;
        if (this.apply.education_applied) {
          body.education_courses = this.educationCourses;
        }
        return await this.$repositories.candidatesApply.applyAJob(body).then((res) => {
          if (res.status === 200) {
            this.status_alert = APPLY_JOB_DONE
            this.$refs.showPopUpAlertBtn.click()
            this.apply = Object.assign({}, {
              job: this.id,
              cv_type: '',
              message: '',
              education_applied: 0,
            })
            this.$v.apply.$reset()
            this.$emit('applySuccess')
            this.checkApp = true
          }
          if (res.response) {
            if (res.response.status === 422) {
              if (parseInt(this.apply.cv_type) === 1) {
                // not have cv in site
                this.status_alert = NOT_HAVE_CV_IN_SYSTEM
                this.$refs.showPopUpAlertBtn.click()
              }
              if (parseInt(this.apply.cv_type) === 2) {
                // not have cv upload
                this.status_alert = NOT_HAVE_CV_UPLOAD
                this.$refs.showPopUpAlertBtn.click()
              }
            } else {
              this.$toast.error(res.response.data.message)
            }
          }
          this.isDisabledBtnSubmitApplyJob = false
        })
      }
    },

  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/apply-form.scss';
@import '../../styles/pages/users/pop-up.scss';
</style>
