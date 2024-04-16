<template>
  <div id="popUpAlert" class="modal fade pop-up-alert"
       tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content box-modal">
        <div class="modal-header border-0">
          <img
            ref="closePopUpAlertBtn"
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            src="~/assets/images/ic_exit.svg"
            alt=""
          >
        </div>
        <div class="modal-body">
          <h3 class="text-center">
            <img
              v-if="statusAlert === defaultApplyJobDoneStatus"
              src="~/assets/images/users/ic_done.svg" alt=""
            >
            <img
              v-if="
                statusAlert === defaultNotHaveCvInSystemStatus
                || statusAlert === defaultNotHaveCvUploadStatus
                || statusAlert === defaultNotLoggedInStatus
                || statusAlert === defaultAddJobToFavoriteListButNotLoggedInStatus
              "
              src="~/assets/images/icon_question_image.svg" alt=""
            >
          </h3>
          <br>
          <br>
          <div v-if="statusAlert === defaultApplyJobDoneStatus">
            <h3 class="text-center modal-body-text modal-body-text-title">{{ $t('apply_job_alert_modal.thank_to_apply_job') }}</h3>
            <h6 class="text-center modal-body-text-content">{{ $t('apply_job_alert_modal.apply_job_done_content_1') }}</h6>
            <h6 class="text-center modal-body-text-content">{{ $t('apply_job_alert_modal.apply_job_done_content_2') }}</h6>
          </div>
          <div v-if="statusAlert === defaultNotHaveCvInSystemStatus">
            <h3 class="text-center modal-body-text">{{ $t('apply_job_alert_modal.not_have_cv_in_system') }}</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToProfilePage">{{ $t('apply_job_alert_modal.click_here_to_create_cv') }}</h6>
          </div>
          <div v-if="statusAlert === defaultNotHaveCvUploadStatus">
            <h3 class="text-center modal-body-text">{{ $t('apply_job_alert_modal.not_have_cv_upload') }}</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToProfilePage">{{ $t('apply_job_alert_modal.click_here_to_upload_cv') }}</h6>
          </div>
          <div v-if="statusAlert === defaultNotLoggedInStatus">
            <h3 class="text-center modal-body-text">{{ $t('general.must_login_to_active') }}</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToLogInPage">{{ $t('general.login') }}</h6>
          </div>
          <div v-if="statusAlert === defaultAddJobToFavoriteListButNotLoggedInStatus">
            <h3 class="text-center modal-body-text">{{ $t('general.must_login_to_active') }}</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToSignUpPage">{{ $t('general.not_have_account') }}</h6>
          </div>
        </div>
        <div class="modal-footer align-items-center d-flex justify-content-center flex-column mb-4">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const NOT_HAVE_CV_IN_SYSTEM = 1
const NOT_HAVE_CV_UPLOAD = 2
const APPLY_JOB_DONE = 3
const NOT_LOGGED_IN = 4
const ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN = 5

export default {
  name: "ApplyJobAlertModal",

  props: {
    statusAlert: {
      type: Number,
      required: true
    },
    routeRedirectAfterLogin: {
      type: String,
      default: '/'
    }
  },

  data() {
    return {
      defaultNotHaveCvUploadStatus: NOT_HAVE_CV_UPLOAD,
      defaultNotHaveCvInSystemStatus: NOT_HAVE_CV_IN_SYSTEM,
      defaultApplyJobDoneStatus: APPLY_JOB_DONE,
      defaultNotLoggedInStatus: NOT_LOGGED_IN,
      defaultAddJobToFavoriteListButNotLoggedInStatus: ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN
    }
  },

  methods: {
    routeToProfilePage() {
      this.$refs.closePopUpAlertBtn.click()
      this.$router.push(this.localePath('/users/user-profile', this.$i18n.locale))
    },

    routeToLogInPage() {
      this.$refs.closePopUpAlertBtn.click()
      this.$router.push(this.localePath(`/login?return_to=${this.routeRedirectAfterLogin}`, this.$i18n.locale))
    },

    routeToSignUpPage() {
      this.$refs.closePopUpAlertBtn.click()
      this.$router.push(this.localePath('/signup', this.$i18n.locale))
    },

  },

}
</script>

<style lang="scss" scoped>
@import "../../styles/components/modal/_apply_job_done_modal.scss";
</style>
