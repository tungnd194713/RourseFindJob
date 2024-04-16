<template>
  <main class="container-maintain">
    <div class="container">
      <div class="card">
        <div class="job-list">
          <div class="job-text">{{ $t('general.favoriteJobs') }}</div>
          <div class="more"></div>
        </div>
        <div class="container-fluid basic px-0 py-0" :class="{ 'gray-border': items.length !== 0 }">
          <div v-if="hidePage" class="row">
            <div
              v-for="(item, index) in items"
              :key="item.id"
              class=" col-md-12 col-lg-6"
            >
              <div
                class="d-md-flex item-con"
                :class="{
                  'last-job-item': (items.length % 2 !== 0 && index === items.length - 1)
                    || (items.length % 2 === 0 && (index === items.length - 1 || index === items.length - 2))
                }"
              >
                <span v-if="$moment().isAfter(item.date_end, 'day') || item.status == 0" class="non-exist">{{ $t('general.expired') }}</span>
                <div class="align-items-center">
                  <div class="job-img mb-3 mb-md-0">
                    <img
                      src="../../assets/images/users/draft/red-heart.svg"
                      alt="heart"
                      @click="deleteFavoriteJobs(item.favorites[0].id)"
                    />
                    <img
                      v-if="item.image_job"
                      :src="url_api_file + item.image_job"
                      :alt="'image-' + item.id"
                      class="the-img"
                      :class="{ 'opacity-25': ($moment().isAfter(item.date_end, 'day')  || item.status == 0)}"
                      @click="routeToJobDetailPage(item)"
                    />
                    <img
                      v-else-if="item.default_image"
                      :src="require(`@/assets/images/users/draft/career/` + item.default_image)"
                      alt=""
                      class="the-img"
                      :class="{ 'opacity-25': ($moment().isAfter(item.date_end, 'day') || item.status == 0)}"
                      @click="routeToJobDetailPage(item)"
                    >
                    <img
                      v-else
                      :src="require(`@/assets/images/users/draft` + careerList[item.career - 1].image)"
                      alt=""
                      class="the-img"
                      :class="{ 'opacity-25': ($moment().isAfter(item.date_end, 'day') || item.status == 0)}"
                      @click="routeToJobDetailPage(item)"
                    >
                  </div>
                </div>
                <div class="flex-grow-1 ps-md-3" :class="{ 'opacity-25': ($moment().isAfter(item.date_end, 'day') || item.status == 0)}">
                  <div
                    class="frame"
                    :class="{ 'line-frame': !isHovering[item.id] }"
                    data-bs-toggle="tooltip"
                    :title="$i18n.locale == 'ja' ? item.title : item.title_vi"
                  >
                    <h2 id="sub">
                      <a
                        :href="localePath(`/jobs/detail/${item.slug}`, $i18n.locale)"
                        style="text-decoration: none; color: inherit"
                        @click.prevent="routeToJobDetailPage(item)"
                      >
                        {{ $i18n.locale == 'ja' ? item.title : item.title_vi }}
                      </a>
                    </h2>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="d-flex align-items-center jd">
                        <!--<span class="me-2">
                          <img src="../../assets/images/users/draft/red_yen.svg"/>
                        </span>-->
                        <img class="me-2" src="../../assets/images/users/draft/red_yen.svg"/>
                        <span class="moneys">
                          {{
                            item.salary_min != 0
                              ? Math.ceil(item.salary_min)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' -'
                              : 'Upto '
                          }}
                          {{
                            Math.ceil(item.salary_max)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          }}
                        </span>
                      </div>
                      <div class="d-flex align-items-center jd">
                        <!--<span class="me-2">
                          <img src="../../assets/images/users/draft/red_locate.svg"/>
                        </span>-->
                        <img class="me-2" src="../../assets/images/users/draft/red_locate.svg"/>
                        <span class="maps">
                          {{ $t(provinces[item.province_id]) }}
                        </span>
                      </div>
                      <div v-if="$i18n.locale === 'vi'" class="d-flex align-items-center jd">
                        <img class="me-2" src="../../assets/images/users/draft/red_calendar.svg" width="18px"/>
                        <span class="time">{{ $moment(item.date_start).format('DD/MM/YYYY') }} - {{ $moment(item.date_end).format('DD/MM/YYYY') }}</span>
                      </div>
                      <div v-else class="d-flex align-items-center jd">
                        <img class="me-2" src="../../assets/images/users/draft/red_calendar.svg" width="18px"/>
                        <span class="time">{{ item.date_start.replaceAll('-', '/') }} - {{ item.date_end.replaceAll('-', '/') }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div v-if="items.length === 0 && hidePage" class="text-center fw-bold no-fav">{{ $t('general.not_like_any_jobs') }}</div>
          <!-- <div v-if="!hidePage" class="loader"></div> -->
        </div>
        <Pagination
          :current-page="currentPage"
          :per-page="perPage"
          :total-items="totalItems"
          :page-count="pageCount"
          @nextPage="pageChangeHandle('next')"
          @previousPage="pageChangeHandle('previous')"
          @customPage="pageChangeHandle"
        >
        </Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import Pagination from '../../components/Pagination'
import theProvinces from '~/constants/provinces'
import theCareers from '~/constants/careers'
import theStatusStay from '~/constants/statusStay'
import careerList from '~/constants/homeCareers'

export default {
  name: 'JobFavorite',
  components: {
    Pagination,
  },
  layout: 'auth',

  data() {
    return {
      url_api_file: process.env.URL_FILE,
      items: [],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
      pageCount: 1,
      isHovering: [],
      careerList,
      hidePage: false,
      isEnableLikeOrUnlikeClick: true
    }
  },

  head() {
    return { title: `${ this.$t('general.favoriteJobs') }` }
  },

  computed: {
    next() {
      return this.currentPage < this.pageCount
        ? this.currentPage + 1
        : this.pageCount
    },
    previous() {
      return this.currentPage > 0 ? this.currentPage - 1 : this.currentPage
    },
  },

  created() {
    this.getFavoriteJobs(this.currentPage)
  },

  methods: {
    async getFavoriteJobs(currentPage) {
      const { data } = await this.$repositories.jobs.getFavoriteJobs(
        currentPage
      )
      this.hidePage = true
      this.items = data.data
      this.provinces = theProvinces
      this.careers = theCareers
      this.status_stay = theStatusStay
      this.totalItems = data.total
      this.currentPage = data.current_page
      this.perPage = data.per_page
      this.pageCount =
        this.totalItems > 0 ? parseInt(data.total / data.per_page, 10) + 1 : 1
      for (const item of this.items) {
        this.isHovering[item.id] = false
      }
    },
    pageChangeHandle(value) {
      switch (value) {
        case 'next':
          this.currentPage = this.next
          break
        case 'previous':
          this.currentPage = this.previous
          break
        default:
          this.currentPage = value
      }
      this.hidePage = false
      this.getFavoriteJobs(this.currentPage)
      window.scrollTo(0,0);
    },
    async deleteFavoriteJobs(payload) {
      if (this.isEnableLikeOrUnlikeClick) {
        this.isEnableLikeOrUnlikeClick = false
        try {
          await this.$repositories.jobs
            .deleteFavoriteJobs(payload)
            .then((res) => {
              if (res.status === 204) {
                this.$toast.success(this.$t('general.removeJobFromFavoriteListSuccess'))
              } else {
                this.$toast.error(this.$t('general.inactive'))
              }
              this.isEnableLikeOrUnlikeClick = true
            })
        } catch (e) {
          this.errors = e.response.data.errors
          this.isEnableLikeOrUnlikeClick = true
        }
        this.getFavoriteJobs(this.currentPage)
      }
    },
    toggleTitle(hovering, dex) {
      this.$set(hovering, dex, !hovering[dex])
    },

    routeToJobDetailPage(job) {
      const jobDetailRoute = `/jobs/detail/${job.slug}`
      this.$repositories.jobs.increaseCountClick({
        path: jobDetailRoute,
        job_id: job.id
      })
      this.$router.push(this.localePath(jobDetailRoute, this.$i18n.locale))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/favorite-job.scss';
</style>
