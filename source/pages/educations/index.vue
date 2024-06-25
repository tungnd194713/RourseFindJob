<template>
  <main class="container-maintain">
    <div class="container">
      <div class="card">
        <div class="job-list">
          <div class="job-text">Lộ trình học</div>
          <div class="more"></div>
          <!-- <label class="green-check-box mt-3 d-flex align-items-center">
            <input
              ref="monthInputFirst"
              value=""
              type="checkbox"
              name="month"
              @change="getFullData()"
            />
            <span class="display_all_jobs">{{ $t('general.display_all') }}</span>
          </label> -->
        </div>
        <div v-if="items.length === 0 && hidePage" class="text-center fw-bold no-fav">{{ $t('general.not_apply_any_jobs') }}</div>
        <div v-for="(item, i) in items"
             :key="item.id"
             class="card-body basic px-0 item-con"
             style="padding-bottom: 30px; padding-top: 0"
             :class="{ 'gray-border': i !== 0, 'gray-padding': i !== 0, 'gray-bborder': i === items.length - 1 }">
          <div class="d-md-flex">
            <div class="align-items-center job-img-contain">
              <div class="job-img mb-3 mb-md-0">
                <div class="tag-img">
                  Đang đào tạo
                </div>
                <img v-if="item.job.image_job"
                     :src="url_api_file + item.job.image_job"
                     :alt="'image-' + item.job.id"
                     class="the-img" :class="{ 'opacity-25': ($moment().isAfter(item.job.date_end, 'day') || item.job.status == 0)}"
                     @click="routeToJobDetailPage(item)"
                />
                <img
                  v-else-if="item.job.default_image"
                  :src="require(`@/assets/images/users/draft/career/` + item.job.default_image)"
                  alt="" class="the-img"
                  :class="{ 'opacity-25': ($moment().isAfter(item.job.date_end, 'day') || item.job.status == 0) }"
                  @click="routeToJobDetailPage(item)"
                >
                <img
                  v-else
                  :src="require(`@/assets/images/users/draft` + careerList[item.job.career - 1].image)"
                  alt="" class="the-img"
                  :class="{ 'opacity-25': ($moment().isAfter(item.job.date_end, 'day') || item.job.status == 0) }"
                  @click="routeToJobDetailPage(item)"
                >
              </div>
            </div>
            <div class="flex-grow-1 ps-md-3 ps-lg-5 job-content-contain" :class="{ 'opacity-25': ($moment().isAfter(item.job.date_end, 'day') || item.job.status == 0) }" style="padding-top: 20px">
              <div
                class="frame"
                :class="{ 'line-frame': isHovering[i] }"
                data-bs-toggle="tooltip"
                :title="item.job.title"
              >
                <h2 id="sub">
                  <a
                    :href="localePath(`/educations/${item.id || item._id}`, $i18n.locale)"
                    style="text-decoration: none; color: inherit; font-size: 26px"
                  >
                    {{ item.job.title }}
                  </a>
                </h2>
              </div>
              <div>
                <div>
                  <div class="d-flex align-items-center jd" style="font-size: 16px">
                    <!--<span class="me-2"
                      ><img src="../../assets/images/users/draft/red_yen.svg"
                    /></span>-->
                    Bắt đầu đào tạo: {{ item.applied_date ? item.applied_date.split('T')[0] : '' }}
                  </div>
                  <div class="d-flex align-items-center jd" style="font-size: 16px">
                    <!--<span class="me-2"
                      ><img src="../../assets/images/users/draft/red_locate.svg"
                    /></span>-->
                    Yêu cầu hoàn thành: {{ endDate(item.applied_date, item.jobEducation.max_education_month) }}
                  </div>
                  <div v-if="item.currentLearning" class="d-flex align-items-center jd" style="font-size: 16px">
                    <span>
                      Module đang học:
                    </span>
                    <router-link v-if="item.currentLearning" class="current-module" :to="localePath(`/educations/${item.id || item._id}/courses/${item.currentLearning.course.id}/modules/${item.currentLearning.module.id}`, $i18n.locale)">{{ item.currentLearning.module.name }} | {{ item.currentLearning.course.name }}</router-link>
                  </div>
                  <div class="d-flex align-items-center jd" style="font-size: 16px">
                    <span>
                      Tiến độ hiện tại:
                    </span>
                  </div>
                  <div class="jd">
                    <div>
                      <el-progress :percentage="item.overallProgress"></el-progress>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="jr-con">
                  <span v-if="item.job.form_recruitment !== 5" class="jr">
                    {{ getFormRecruitment(item.job.form_recruitment) }}
                  </span>
                <span
                  v-if="item.job.career !== theCareers.length"
                  class="jr"
                >{{ $t(careers[item.job.career - 1]) }}</span>
                <span class="break"></span>
                <span
                  v-for="(stay_status, index) in item.job.status_stay.split(',')"
                  v-show="index == 0 || index == 1 || index == 2 || showByIndex.includes(i)"
                  :key="index"
                  class="jr"
                >
                    {{ $t(status_stay[parseInt(stay_status)]) }}
                  </span>
                <span v-if="!showByIndex.includes(i) && item.job.status_stay.split(',').length > 3" class="more-show" @click="showByIndex.push(i)">
                    {{ $t('general.more') }}
                    <img src="../../assets/images/users/icon_more.svg" alt="">
                  </span>
                <span v-if="showByIndex.includes(i) && item.job.status_stay.split(',').length > 3" class="more-show" @click="removeVal(i)">
                    {{ $t('general.collapse') }}
                    <img src="../../assets/images/users/icon_collapse.svg" alt="">
                  </span>
              </div> -->
            </div>
          </div>
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
import theCareers from '~/constants/careers'
import careerList from '~/constants/homeCareers'
import jobStatus from '~/constants/jobStatus'

export default {
  name: 'JobApplied',
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
      showByIndex: [],
      isHovering: [],
      careerList,
      hidePage: false,
      month: 2,
      theCareers,
      jobStatus
    }
  },

  head() {
    return { title: `${ this.$t('general.appliedJobs') }` }
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
    this.getUserRoadmapList()
  },

  methods: {
    endDate(startDate, months) {
      if (startDate && months) {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + months);
        const newDateString = date.toISOString();
        return newDateString.split("T")[0];
      }
    },
    async getUserRoadmapList() {
      const { data } = await this.$repositories.candidatesApply.getUserRoadmapList()
      this.items = data
      this.hidePage = true
      for (let i = 0; i < data.total; ++i) {
        this.isHovering[i] = true
      }
      this.totalItems = data.length
    },
    // async getAppliedJobs(currentPage) {
    //   const { data } = await this.$repositories.jobs.getAppliedJobs(currentPage, {month: this.month})

    //   this.items = data.results
    //   this.hidePage = true
    //   this.provinces = theProvinces
    //   this.careers = theCareers
    //   this.status_stay = theStatusStay
    //   this.currentPage = data.page
    //   this.perPage = data.limit
    //   this.pageCount = data.totalPages

    // },
    toggleTitle(hovering, dex) {
      this.$set(hovering, dex, !hovering[dex])
    },
    removeVal(val) {
      const index = this.showByIndex.indexOf(val)
      if (index !== -1) {
        this.showByIndex.splice(index, 1)
      }
    },

    getFormRecruitment(value) {
      switch(value) {
        case 1:
          return this.$t('form_recruitment.form_recruitment_1');
        case 2:
          return this.$t('form_recruitment.form_recruitment_2');
        case 3:
          return this.$t('form_recruitment.form_recruitment_3');
        case 4:
          return this.$t('form_recruitment.form_recruitment_4');
        default:
          return '';
      }
    },

    routeToJobDetailPage(job) {
      const jobDetailRoute = `/educations/${job.id || job._id}`
      this.$router.push(this.localePath(jobDetailRoute, this.$i18n.locale))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/applied-job.scss';
</style>
