<template>
  <main class="container-maintain">
    <div class="container">
      <div class="row">
        <!-- left -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-3">
          <div class="search">
            <div class="monthly-salary mb-3">
              <h4>Vị trí tuyển dụng</h4>
              <div class="input-group input-group-icon">
              <span class="input-group-text input-group-text-pre">
                  <img
                    src="../assets/images/users/icon_stay.svg"
                    alt=""
                    height="20px"
                  >
              </span>
              <input v-model="condition.title" type="text" class="form-input" placeholder="Nhập vị trí tuyển dụng">
              </div>
            </div>

            <div class="monthly-salary mb-3">
              <h4>Lương tối thiểu</h4>
              <div class="input-group input-group-icon">
              <span class="input-group-text input-group-text-pre">
                  <img
                    src="../assets/images/users/icon_money_jp.svg"
                    alt=""
                    height="20px"
                  >
              </span>
              <input v-model="condition.salary_min" type="number" class="form-input" placeholder="Nhập mức lương tối thiểu">
              </div>
            </div>

            <div class="monthly-salary mb-3">
              <h4>Lương tối đa</h4>
              <div class="input-group input-group-icon">
              <span class="input-group-text input-group-text-pre">
                  <img
                    src="../assets/images/users/icon_money_jp.svg"
                    alt=""
                    height="20px"
                  >
              </span>
              <input v-model="condition.salary_max" type="number" class="form-input" placeholder="Nhập mức lương tối đa">
              </div>
            </div>

            <div class="map-icon" style="margin-top:13px">
              <h4>{{ $t('general.place') }}</h4>
              <div class="input-group input-group-icon">
            <span class="input-group-text input-group-text-pre">
                <img
                  src="../assets/images/users/icon_map.svg"
                  alt=""
                  height="20px"
                >
            </span>
                <select
                  id="inputGroupSelect03"
                  v-model="condition.province_id"
                  class="form-select"
                  :class="{ 'bl-text': condition.province_id !== 0 }"
                >
                  <option
                    v-for="(item, index) in regionsList"
                    :key="index"
                    :value="index"
                    class="gray-text"
                  >
                    {{ $t(item) }}
                  </option>
                </select>
              </div>
            </div>

            <div ref="find" class="search-button" @click="search">
              <img src="../assets/images/users/icon_search.svg" alt="" width="20px" height="20px">
              {{ $t('general.find') }}
            </div>

          </div>
        </div>

        <!-- right -->
        <div class="col-12 col-sm-12 col-md-12 col-lg-9">
          <div class="content-wrapper">
            <div class="list-job w-100">
              <div class="title-list-job">
                {{ $t('general.listJob') }} {{ $t(careerList[condition.career - 1]) }}
              </div>
              <div class="line"></div>
            </div>

            <div
              v-if="totalItems == 0 && !loadingJobList"
              class="text-center mt-4 no-result"
            >
              {{ $t('general.noResult') }}
            </div>

            <JobSummary
              v-for="(job, index) in jobsList"
              :key="index"
              :job="job"
              @addOrRemoveToFavoriteListEvent="handleAddOrRemoveToFavoriteListEvent"
              @addOrRemoveToFavoriteListButNotLoggedIn="handleAddOrRemoveToFavoriteListButNotLoggedInEvent"
              @routeToJobDetailPage="handleRouteToJobDetailPageEvent"
            />

            <Pagination
              :current-page="currentPage"
              :per-page="perPage"
              :total-items="totalItems"
              :page-count="pageCount"
              @nextPage="pageChangeHandle('next')"
              @previousPage="pageChangeHandle('previous')"
              @customPage="pageChangeHandle"
            />
          </div>
        </div>

      </div>
    </div>
    <PageView :path-page="$nuxt.$route.path"></PageView>

    <button
      ref="showPopUpAlertBtn"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#popUpAlert"
      class="d-none"
    />
    <ApplyJobAlertModal
      :status-alert="status_alert"
      :route-redirect-after-login="routeRedirectAfterLogin"
    />

  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import JobSummary from "../components/jobs/JobSummary"
import ApplyJobAlertModal from "~/components/modal/ApplyJobAlertModal"
import Pagination from "~/components/Pagination"
import theProvinces from '~/constants/provinces'
import theStatusStay from '~/constants/statusStay'
import theSalary from '~/constants/salaryOptions'
import theCareers from '~/constants/careers'
import PageView from '~/components/PageView'

const NOT_LOGGED_IN = 4
const ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN = 5

export default {
  name: "JobsIndex",
  components: {
    JobSummary,
    Pagination,
    PageView,
    ApplyJobAlertModal
  },
  layout: 'authUnrequired',

  data() {
    return {
      routeRedirectAfterLogin: '',
      status_alert: 0,
      salaryList: theSalary,
      statusStayList: theStatusStay,
      regionsList: theProvinces,
      careerList: theCareers,
      jobsList: [],
      currentPage: 1,
      perPage: 20,
      totalItems: 0,
      pageCount: 1,
      condition: {
        salary: 0,
        salary_min: 0,
        salary_max: 0,
        status_stay: 0,
        province_id: 0,
        career: 0
      },
      loadingJobList: true,
      key: 0,
    }
  },

  head() {
    return { title: `${ this.$t('general.listJob') }` }
  },

  computed: {
    ...mapGetters ({
      stateCareer: 'detail-job/getCareer',
      stateProvinceId: 'detail-job/getProvinceId',
      loggedInUser: 'loggedInUser',
      isAuthenticated: 'isAuthenticated'
    }),
    next() {
      return this.currentPage < this.pageCount
        ? this.currentPage + 1
        : this.pageCount
    },
    previous() {
      return this.currentPage > 0 ? this.currentPage - 1 : this.currentPage
    },
  },

  watch: {
    $route() {
      this.initData()
      this.getJobsListFromApi(this.currentPage)
    }
  },

  created() {
    if (this.isAuthenticated) {
      this.$router.push(this.localePath('/jobs', this.$i18n.locale))
    }
    this.initData()
    this.getJobsListFromApi(this.currentPage)
  },

  methods: {
    initData() {
      this.statusStayList[0] = 'status_stay.status_0'
      this.condition.salary_min = this.$route.query.salary_min ? this.$route.query.salary_min : 0
      this.condition.salary_max = this.$route.query.salary_max ? this.$route.query.salary_max : 0
      this.condition.status_stay = this.$route.query.status_stay ? this.$route.query.status_stay : 0
      this.condition.province_id = this.$route.query.province_id ? this.$route.query.province_id : 0
      this.condition.province_id = this.$route.query.province_id ? this.$route.query.province_id : 0
      this.condition.career = this.$route.query.career ? this.$route.query.career : ''
    },

    async getJobsListFromApi(currentPage) {
      const condition = { ...this.condition, currentPage }
      this.loadingJobList = true
      const { data } = await this.$repositories.jobs.getJobsFind(condition)
      this.loadingJobList = false

      this.jobsList = data.data
      this.totalItems = data.total
      this.currentPage = data.current_page
      this.perPage = data.per_page
      this.pageCount = this.totalItems > 0 ? parseInt(data.total / data.per_page, 10) + 1 : 1
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
      this.getJobsListFromApi(this.currentPage)
      window.scrollTo(0,0);
    },

    search() {
      this.currentPage = 1
      // if (this.condition.career) q.career = this.condition.career
      this.getJobsListFromApi(this.currentPage)

//      this.getJobsListFromApi(this.currentPage)
//       this.$refs.find.click()
    },

    handleAddOrRemoveToFavoriteListEvent() {
      this.getJobsListFromApi(this.currentPage)
    },

    handleRouteToJobDetailPageEvent(job) {
      this.$repositories.jobs.increaseCountClick({
        path: `/jobs/detail/${job.id}`,
        job_id: job.id
      })
      const jobDetailRoute = this.localePath(`/jobs/detail/${job.id}`, this.$i18n.locale)
      if (this.isAuthenticated) {
        this.$router.push(jobDetailRoute)
      } else {
        this.status_alert = NOT_LOGGED_IN
        this.routeRedirectAfterLogin = jobDetailRoute
        this.$refs.showPopUpAlertBtn.click()
      }
    },

    handleAddOrRemoveToFavoriteListButNotLoggedInEvent(e) {
      this.status_alert = ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN
      this.$refs.showPopUpAlertBtn.click()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/users/jobs/list.scss';
</style>
