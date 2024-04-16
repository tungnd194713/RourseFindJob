<template>
  <!-- Modal -->
  <div id="statusStayInfoModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content box-modal">
        <div class="modal-header border-0 pb-0">
          <img
            ref="closeStatusStayInfoModalBtn"
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            src="~/assets/images/ic_exit.svg"
            alt=""
          >
        </div>
        <div class="modal-body pt-0 px-4">
          <h3 class="text-center">
            <img src="~/assets/images/icon_question_image.svg" alt="">
          </h3>
          <br>
          <br>
          <h3 class="text-center modal-body-text modal-body-text-title mt-5">{{ $t('status_stay_info_modal.main_title') }}</h3>
          <h6 class="text-center modal-body-text-content">{{ $t('status_stay_info_modal.main_content') }}</h6>
        </div>
        <div class="modal-footer align-items-center d-flex justify-content-center flex-column mb-4">
          <p class="title-footer">{{ $t('status_stay_info_modal.title_footer') }}</p>
          <a
            :href="localePath('/faq', $i18n.locale)"
            class="red-text cursor-pointer text-decoration-none"
            @click.prevent="routeToFaqPage"
          >
            {{ $t('status_stay_info_modal.link_footer') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "StatusStayInfoModal",

        methods: {
          routeToFaqPage() {
            this.$refs.closeStatusStayInfoModalBtn.click()
            this.$router.push(this.localePath('/faq', this.$i18n.locale))
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../styles/components/modal/_status_stay_info_modal.scss";
</style>
