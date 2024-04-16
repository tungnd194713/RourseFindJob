<template>
  <div class="row box-pagination">
    <div class="col-12 col-lg-6">
      <slot>
      </slot>
    </div>
    <div class="col-12 col-lg-6">
      <nav v-if="totalItems > perPage" aria-label="Page navigation example">
        <ul class="pagination justify-content-end mb-0">
          <li class="page-item">
            <a
              :class="
                'page-link previous rounded-circle bg-white fw-bold ' +
                isPreviousButtonDisabled
              "
              aria-label="Previous"
              @click="previousPage"
              ><img class="" src="../assets/images/icon_laquo.svg"
            /></a>
          </li>
          <li v-for="i in pageCount" :key="i" class="page-item">
            <a
              :class="
                'btn page-link page-link-num rounded-circle me-1 me-lg-1 fw-bold ' +
                (currentPage === i ? 'active' : '')
              "
              @click="customPage(i)"
              >{{ i }}</a
            >
          </li>
          <li class="page-item">
            <a
              :class="
                'page-link next rounded-circle fw-bold bg-white ' +
                isNextButtonDisabled
              "
              aria-label="Next"
              @click="nextPage"
              ><img class="" src="../assets/images/icon_raquo.svg"
            /></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1 ? 'd-none' : ''
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pageCount ? 'd-none' : ''
    },
  },

  methods: {
    nextPage() {
      this.$emit('nextPage')
    },
    previousPage() {
      this.$emit('previousPage')
    },
    customPage(value) {
      this.$emit('customPage', value)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/components/_pagination.scss';
</style>
