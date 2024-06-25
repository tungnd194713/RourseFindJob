<template>
  <main class="container-maintain">
    <div class="container">
      <div class="card">
        <div class="job-list">
          <div class="job-text">{{ $t('general.appliedJobs') }}</div>
          <div class="more"></div>
          <label class="green-check-box mt-3 d-flex align-items-center">
            <input
              ref="monthInputFirst"
              value=""
              type="checkbox"
              name="month"
              @change="getFullData()"
            />
            <span class="display_all_jobs">{{ $t('general.display_all') }}</span>
          </label>
        </div>
        <div v-if="items.length === 0 && hidePage" class="text-center fw-bold no-fav">{{ $t('general.not_apply_any_jobs') }}</div>
        <div v-for="(item, i) in items"
             :key="item.job.id"
             class="card-body basic px-0 item-con"
             :class="{ 'gray-border': i !== 0, 'gray-padding': i !== 0, 'gray-bborder': i === items.length - 1 }">
          <span v-if="$moment().isAfter(item.job.date_end, 'day') || item.job.status == 0" class="non-exist">{{ $t('general.expired') }}</span>
          <div class="d-md-flex">
            <div class="align-items-center job-img-contain">
              <div class="job-img mb-3 mb-md-0">
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
            <div class="flex-grow-1 ps-md-3 ps-lg-5 job-content-contain" :class="{ 'opacity-25': ($moment().isAfter(item.job.date_end, 'day') || item.job.status == 0) }">
              <div
                class="frame"
                :class="{ 'line-frame': isHovering[i] }"
                data-bs-toggle="tooltip"
                :title="item.job.title"
              >
                <h2 id="sub">
                  <a
                    :href="localePath(`/jobs/detail/${item.job.id}`, $i18n.locale)"
                    style="text-decoration: none; color: inherit"
                    @click.prevent="routeToJobDetailPage(item)"
                  >
                    {{ item.job.title }}
                  </a>
                </h2>
              </div>
              <div v-if="item.education_applied">Đăng kí đào tạo</div>
              <div>
                <div>
                  <div class="d-flex align-items-center jd">
                    <!--<span class="me-2"
                      ><img src="../../assets/images/users/draft/red_yen.svg"
                    /></span>-->
                    <img class="me-2" src="../../assets/images/users/draft/red_yen.svg"/>
                    <span class="moneys">
                        {{
                          item.job.salary_min != 0
                            ? Math.ceil(item.job.salary_min)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' -'
                            : 'Up to '
                        }}
                        {{
                          Math.ceil(item.job.salary_max)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }}
                      </span>
                  </div>
                  <div class="d-flex align-items-center jd">
                    <!--<span class="me-2"
                      ><img src="../../assets/images/users/draft/red_locate.svg"
                    /></span>-->
                    <img class="me-2" src="../../assets/images/users/draft/red_locate.svg"/>
                    <span class="maps">{{ $t(provinces[item.job.province_id]) }}</span
                    >
                  </div>
                  <div v-if="$i18n.locale === 'vi'" class="d-flex align-items-center jd">
                    <img class="me-2" src="../../assets/images/users/draft/red_calendar.svg" width="18px"/>
                    <span class="time" >{{ $moment(item.job.date_start).format('DD/MM/YYYY') }} - {{ $moment(item.job.date_end).format('DD/MM/YYYY') }}</span>
                  </div>
                  <div v-else class="d-flex align-items-center jd">
                    <img class="me-2" src="../../assets/images/users/draft/red_calendar.svg" width="18px"/>
                    <span class="time">{{ item.job.date_start.replaceAll('-', '/') }} - {{ item.job.date_end.replaceAll('-', '/') }}</span>
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
              <div class="mb-3">Trạng thái: {{ jobStatus[item.status - 1] }}</div>
              <div v-if="item.status === 3" class="d-flex">
                <el-button style="margin-right: 6px" type="primary" @click="startEducation(item)">Bắt đầu học</el-button>
                <el-button style="margin-left: 6px" type="danger" @click="refuseEducation(item)">Từ chối học</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          title="Cảnh báo"
          :visible.sync="warningDialog"
          width="55%"
          :before-close="handleClose"
        >
          <el-alert
            title="Đang học chương trình khác"
            type="warning"
            description="Bạn đang tham gia học một chương trình đào tạo cho vị trí khác, bạn có chắc muốn tham gia học chương trình đào tạo này?"
            show-icon
            :closable="false"
          >
          </el-alert>
          <span slot="footer" class="dialog-footer">
            <el-button @click="warningDialog = false">Hủy</el-button>
            <el-button type="warning" @click="confirmAction">Vẫn tham gia</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="Từ chối học"
          :visible.sync="warningRefuseDialog"
          width="50%"
          :before-close="handleClose"
        >
          <el-alert
            title="Từ chối tham gia học tập"
            type="error"
            description="Bạn có chắc muốn từ chối tham gia chương trình đào tạo này?"
            show-icon
          >
          </el-alert>
          <span slot="footer" class="dialog-footer">
            <el-button @click="warningRefuseDialog = false">Hủy</el-button>
            <el-button type="danger" @click="confirmRefuseAction">Từ chối tham gia</el-button>
          </span>
        </el-dialog>
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
      jobStatus,
      confirmItemId: null,
      warningDialog: false,
      warningRefuseDialog: false,
      confirmRefuseId: null,
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
    this.getAppliedJobs(this.currentPage)
  },

  methods: {
    async getAppliedJobs(currentPage) {
      const { data } = await this.$repositories.jobs.getAppliedJobs(currentPage, {month: this.month})

      this.items = data.results
      this.hidePage = true
      this.provinces = theProvinces
      this.careers = theCareers
      this.status_stay = theStatusStay
      this.totalItems = data.totalResults
      this.currentPage = data.page
      this.perPage = data.limit
      this.pageCount = data.totalPages
      for (let i = 0; i < data.total; ++i) {
        this.isHovering[i] = true
      }
    },
    async startEducation(item) {
      this.confirmItemId = item.id
      const { data } = await this.$repositories.candidatesApply.checkJobEducationExisted();
      if (data) {
        this.warningDialog = true
      }
    },
    async confirmAction() {
      const { data } = await this.$repositories.candidatesApply.startEducation(this.confirmItemId);
      if (data) {
        this.$router.push(this.localePath(`/educations/${data}`))
        this.$toast.success('Bắt đầu quá trình học tập!')
      }
    },
    refuseEducation(item) {
      this.confirmRefuseId = item.id
      this.warningRefuseDialog = true
    },
    async confirmRefuseAction() {
      const { data } = await this.$repositories.candidatesApply.refuseEducation(this.confirmRefuseId);
      if (data) {
        this.$toast.success('Đã từ chối tham gia học tập!')
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
      this.getAppliedJobs(this.currentPage)
    },
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

    getFullData() {
      if (this.month === 2) {
        this.month = ''
        this.getAppliedJobs(1)
      } else {
        this.month = 2
        this.getAppliedJobs(1)
      }
    },

    routeToJobDetailPage(job) {
      const jobDetailRoute = `/jobs/detail/${job.job.id}`
      this.$repositories.jobs.increaseCountClick({
        path: jobDetailRoute,
        job_id: job.job.id
      })
      this.$router.push(this.localePath(jobDetailRoute, this.$i18n.locale))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/applied-job.scss';
</style>
