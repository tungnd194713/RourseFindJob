<template>
  <div id="popUpBlert" class="modal fade"
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
              v-if="statusBlert === defaultApplyJobDoneStatus"
              src="~/assets/images/users/ic_done.svg" alt=""
            >
            <img
              v-if="
                statusBlert === defaultNotHaveCvInSystemStatus
                || statusBlert === defaultNotHaveCvUploadStatus
                || statusBlert === defaultNotLoggedInStatus
                || statusBlert === defaultAddJobToFavoriteListButNotLoggedInStatus
              "
              src="~/assets/images/icon_question_image.svg" alt=""
            >
          </h3>
          <br>
          <br>
          <div v-if="statusBlert === defaultApplyJobDoneStatus">
            <h3 class="text-center modal-body-text">Cảm ơn bạn đã ứng tuyển</h3>
            <h6 class="text-center">Chúng tôi sẽ gửi CV của bạn tới nhà tuyển dụng .</h6>
            <h6 class="text-center">Hãy chờ liên lạc từ nhà tuyển dụng nhé !</h6>
          </div>
          <div v-if="statusBlert === defaultNotHaveCvInSystemStatus">
            <h3 class="text-center modal-body-text">Bạn chưa tạo CV trên hệ thống</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToProfilePage">Click vào đây để tạo CV</h6>
          </div>
          <div v-if="statusBlert === defaultNotHaveCvUploadStatus">
            <h3 class="text-center modal-body-text">Bạn chưa tải CV lên hệ thống</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToProfilePage">Click vào đây để tải CV lên</h6>
          </div>
          <div v-if="statusBlert === defaultNotLoggedInStatus">
            <h3 class="text-center modal-body-text">{{ $t('general.must_login_to_active') }}</h3>
            <h6 class="text-center link-to-profile-page" @click="routeToLogInPage">{{ $t('general.login') }}</h6>
          </div>
          <div v-if="statusBlert === defaultAddJobToFavoriteListButNotLoggedInStatus">
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
  name: "LoginRedirection",

  props: {
    statusBlert: {
      type: Number,
      default: 0
    },
    returnTo: {
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
      this.$router.push(this.localePath(`/login?return_to=${this.returnTo}`, this.$i18n.locale))
    },

    routeToSignUpPage() {
      this.$refs.closePopUpAlertBtn.click()
      this.$router.push(this.localePath('/signup', this.$i18n.locale))
    },

  },

}
</script>

<style lang="scss" scoped>
@import "../../styles/components/modal/_login_redirection.scss";
</style>
