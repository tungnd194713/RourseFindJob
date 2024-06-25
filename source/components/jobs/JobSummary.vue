<template>
  <div v-if="$moment().isSameOrBefore(job.date_end, 'day')" class="box-content">
    <div class="image-content">
      <img
        v-if="job.image_job"
        :src="url_file + job.image_job"
        alt=""
        width="330px"
        height="220px"
        class="rounded-img cursor-pointer"
        @click="routeToJobDetailPage()"
      >
      <img
        v-else-if="job.default_image"
        :src="require(`@/assets/images/users/draft/career/` + job.default_image)"
        alt=""
        width="330px"
        height="220px"
        class="rounded-img cursor-pointer"
        @click="routeToJobDetailPage()"
      >
      <img
        v-else
        :src="require(`@/assets/images/users/draft` + homeCareers[job.career - 1].image)"
        alt=""
        width="330px"
        height="220px"
        class="rounded-img cursor-pointer"
        @click="routeToJobDetailPage()"
      >
    </div>
    <div class="main-content">
      <h4
        class="title-job mb-2"
        data-bs-toggle="tooltip"
        :title="job.title"
      >
        <a
          :href="localePath(`/jobs/detail/${job.id}`, $i18n.locale)"
          style="text-decoration: none; color: inherit"
          @click.prevent="routeToJobDetailPage()"
        >
          <span>{{ job.title }}</span> <span v-if="job.job_point" :style="{ color: userPointColor(job) }">({{ Math.round(job.user_job_point / job.job_point * 100) / 100 * 100 }}% phù hợp)</span>
        </a>
<!--        <span v-if="$i18n.locale === 'ja'">{{ job.title }}</span>-->
<!--        <span v-if="$i18n.locale === 'vi'">{{ job.title_vi }}</span>-->
      </h4>
      <div v-if="job.educationReady" class="d-flex mb-2">
        <span style="color: #bc282d"><b>Có thể đào tạo trong {{ job.max_education_month }} tháng <span v-if="job.scholarship > 0">với học bổng {{ job.scholarship }}%</span></b></span>
      </div>
      <div class="moneys d-flex align-items-center">
        <img src="../../assets/images/users/icon_money_jp_red.svg" alt="" width="18px" height="18px">
        {{ job.salary_min > 0 ? formatPrice(Math.ceil(job.salary_min)) + ' - ' : 'Upto ' }}
        {{ formatPrice(Math.ceil(job.salary_max)) }}
      </div>
      <div class="maps d-flex align-items-center">
        <img src="../../assets/images/users/icon_map_red.svg" alt="" width="18px" height="18px">
        {{ $t(provinceList[job.province_id]) }}
      </div>
      <div v-if="$i18n.locale === 'vi'" class="time d-flex align-items-center">
        <img src="../../assets/images/users/draft/red_calendar.svg" alt="" width="18px" height="18px">
        {{ $moment(job.date_start).format('DD/MM/YYYY') }} - {{ $moment(job.date_end).format('DD/MM/YYYY') }}
      </div>
      <div v-else class="time d-flex align-items-center">
        <img src="../../assets/images/users/draft/red_calendar.svg" alt="" width="18px" height="18px">
        {{ job.date_start.replaceAll('-', '/') }} - {{ job.date_end.replaceAll('-', '/') }}
      </div>
      <div class="workplace d-flex flex-wrap mt-0">
        <div
          v-for="(item, index) in statusStayToDisplay"
          :key="index"
          class="skill"
        >
          {{ item }}
        </div>
        <div
          v-if="skillTag.length > 3"
          class="mini-text"
          @click="showHideStatusStay"
        >
          {{ statusStayToDisplay.length === skillTag.length ? $t('general.collapse') : $t('general.more') }}
          <img v-if="statusStayToDisplay.length === skillTag.length" src="../../assets/images/users/icon_collapse.svg" alt="">
          <img v-else src="../../assets/images/users/icon_more.svg" alt="">
        </div>
      </div>
    </div>

    <StatusStayInfoModal />

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import StatusStayInfoModal from "../modal/StatusStayInfoModal"
import theProvinces from '~/constants/provinces'
import theCareers from '~/constants/careers'
import theStatusStay from '~/constants/statusStay'
import theFormRecruitment from '~/constants/formRecruitment'
import theHomeCareers from '~/constants/homeCareers'

export default {
  name: "JobSummary",
  components: {
    StatusStayInfoModal,
  },

  props: {
    job: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      url_file: process.env.URL_FILE,
      provinceList: theProvinces,
      careersList: theCareers,
      statusStayList: theStatusStay,
      formRecruitmentList: theFormRecruitment,
      status_alert: 0,
      skillTag: [],
      statusStayToDisplay: [],
      homeCareers: theHomeCareers,
      isEnableLikeOrUnlikeClick: true
    }
  },

  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated'])
  },

  created() {
    this.initData()
  },
  methods: {
    userPointColor(job) {
      const point = job.user_job_point / job.job_point;
      if (point >= 0.75) {
        return 'green'
      } else if (point >= 0.5) {
        return '#67c8ed'
      } else if (point >= 0.25) {
        return 'color: rgb(188, 40, 45)'
      } else {
        return 'gray'
      }
    },
    initData() {
      this.skillTag = this.job.previewSkills?.flat().map((item) => item.name);
      this.statusStayToDisplay = this.skillTag.filter(function (item, index) {
        return index < 3
      })
    },

    showHideStatusStay() {
      if (this.statusStayToDisplay.length === this.skillTag.length) {
        this.statusStayToDisplay = this.skillTag.filter(function (item, index) {
          return index < 3
        })
      } else {
        this.statusStayToDisplay = this.skillTag
      }
    },

    routeToJobDetailPage() {
      this.$emit('routeToJobDetailPage', this.job)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/jobs/list.scss';
</style>
