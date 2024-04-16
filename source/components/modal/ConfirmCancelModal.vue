<template>
  <div id="confirmCancelModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content box-modal">
        <div class="modal-header border-0">
          <img
            ref="closeConfirmCancelModal"
            class="close-modal"
            data-bs-dismiss="modal"
            aria-label="Close"
            src="../../assets/images/ic_exit.svg"
            alt=""
          >
        </div>
        <div class="modal-body">
          <h3 class="text-center modal-body-text">{{ content }}</h3>
        </div>
        <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
          <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">{{$t("general.no")}}</button>
          <button type="button" class="btn btn-danger rounded-pill w-20" @click.prevent="onClickYes(form)">{{$t("general.yes")}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelConfirmModal",

  props: {
    content: {
      type: String,
      default: ''
    },
    form: {
      type: String,
      default: ''
    },
  },

  methods: {
    onClickYes(form) {
      this.$emit('onClickYesEvent', form)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/components/modal/_confirm_cancel_modal.scss';
</style>
