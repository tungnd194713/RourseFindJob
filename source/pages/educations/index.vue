<template>
  <main class="container-maintain">
    <div v-if="hidePage && error == ''" class="maintain row" style="height: 80vh">
      <div class="loader"></div>
    </div>
    <div
      v-else-if="!isAuthenticated && isShowAlertLogin"
      class="pop-up-alert"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">

          </div>
          <div class="modal-body">
            <h3 class="text-center">
              <img src="~/assets/images/icon_question_image.svg" alt="">
            </h3>
            <br>
            <br>
            <div>
              <h3 class="text-center modal-body-text">{{ $t('general.must_login_to_active') }}</h3>
              <h6 class="text-center link-to-profile-page" @click="$nuxt.$router.push(localePath(`/login?return_to=${$nuxt.$route.path}`, $i18n.locale))">{{ $t('general.login') }}</h6>
            </div>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-column mb-4">

          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="container"
    >
      <div
        class="row"
        :class="'lang-vn'"
      >
        <!-- left -->
        <div class="col-12 col-sm-12 col-md-4">
          <div class="preview">
            <div class="name-company">Tiến độ</div>
            <div
              class="logo-company"
            >
              <el-progress type="circle" :percentage="totalProgress || 0"></el-progress>
            </div>

            <div class="infor-one">
              <div class="location">
                Module đang học: <span class="fw-bold">{{ userRoadmap.current_module.name }} - {{ userRoadmap.current_course.title }}</span>
              </div>
            </div>
            <div
              class="detail-company"
            >
              Tiếp tục học >>
            </div>
          </div>
        </div>

        <!-- right -->
        <div class="col-12 col-sm-12 col-md-8">
          <div class="content-wrapper">
            <div class="title-job">
              <h3>{{ userRoadmap.title || 'Tên lộ trình học' }}</h3>
            </div>
            <div class="line"></div>

            <div class="box-content row">
              <div class="col-sm-12 col-md-12 pb-md-3 col-lg-6">
                <div class="image-content">
                  <div
                    v-if="items.image_job"
                    :src="url_api_file + items.image_job"
                    alt=""
                    width="100%"
                    height="220px"
                    class="job-ima"
                    :style="{
                      width: '100%',
                      height: '220px',
                      backgroundImage: `url(${url_api_file + items.image_job})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }"
                  ></div>
                  <img
                    v-else-if="items.default_image"
                    :src="require(`@/assets/images/users/draft/career/` + items.default_image)"
                    alt=""
                    width="330px"
                    height="220px"
                    class="job-ima"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/images/users/draft` + homeCareers[(items.career ? items.career : 1 - 1)].image)"
                    alt=""
                    width="330px"
                    height="220px"
                    class="job-ima"
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6">
                <div class="main-content">
                  <div v-if="items.accept_education" class="d-flex mb-2">
                    <span style="color: #bc282d"><b>Có thể đào tạo trong {{ items.max_education_month }} tháng <span v-if="items.scholarship > 0">với học bổng {{ items.scholarship }}%</span></b></span>
                  </div>
                  <div class="fw-bold mb-4" style="font-size: 24px">{{ job.title }}</div>
                  <div class="moneys mb-4 d-flex align-items-center">
                    <img
                      src="../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="24px"
                      height="24px"
                    />
                    Bắt đầu-  <span class="fw-bold"> 16/04/2024</span>
                  </div>
                  <div class="maps d-flex align-items-center">
                    <img
                      src="../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="24px"
                      height="24px"
                    />
                    Dự kiến hoàn thành-  <span class="fw-bold"> 16/07/2024</span>
                  </div>
                  <!-- <div v-if="language == 'vn'" class="time d-flex align-items-center">
                    <img
                      src="../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ $moment(items.date_start).format('DD/MM/YYYY') }} - {{
                    $moment(items.date_end).format('DD/MM/YYYY') }}
                  </div>
                  <div v-else class="time d-flex align-items-center">
                    <img
                      src="../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ items.date_start.replaceAll('-', '/') }} - {{ items.date_end.replaceAll('-', '/') }}
                  </div> -->
                  <div class="d-flex flex-wrap align-items-center">
                    <div
                      v-for="(skill, index) in items.previewSkills"
                      :key="index"
                      class="skill skill-primary"
                    >
                      {{ skill }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="mb-2 mt-4 fw-bold">Lộ trình của bạn: </h3>
            <div class="learning-route">
              <div class="container text-center faq-con">
                <div
                  v-for="data in datas"
                  :key="data.value"
                  class="row m-4 question-button"
                >
                  <div class="p-con">
                    <p>
                      <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#' + data.class"
                        aria-expanded="false"
                        :aria-controls="data.class"
                        :class="{'shown': data.isShown, 'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja'}"
                        @click="shownClass(data)">
                        <div class="row">
                            <div
                                    class="col-10 button-title fw-bold"
                                    style="text-align: start; padding-left: 30px"
                            >
                                {{ data.course.title }} ({{data.done_modules.length / data.course.modules.length * 100}}%)
                            </div>
                            <div
                                    class="col-2 mid"
                                    style="text-align: end; padding-right: 30px"
                            >
                                <img
                                        src="../../assets/images/users/draft/plus.svg"
                                        alt=""
                                        :class="{ rotated: data.isShown }"
                                />
                            </div>
                        </div>
                      </button>
                    </p>
                    <div :id="data.class" class="collapse">
                      <div class="card card-body text-start">
                        <ul class="course-module">
                          <li v-for="(content, index) in data.course.modules" :key="index" class="d-flex justify-content-between" @click="$router.push(localePath(`/educations/courses/${data.course.id || data.course._id}/modules/${content.id || content._id}`, $i18n.locale))">
                            <span>{{ content.name }}</span>
                            <span>
                              <img v-if="isModuleFinish(content.id || content._id, data)" src="../../assets/images/users/draft/checked-icon.png" alt="" width="18" height="18">
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import theHomeCareers from '~/constants/homeCareers'

export default {
  name: 'JobDetail',
  layout: 'authUnrequired',
  data() {
    return {
      datas: [{
        course: {
          modules: [],
        },
        done_modules: [],
      }],
      isShowAlertLogin: true,
      url_api_file: process.env.URL_FILE,
      items: {},
      job: {},
      userRoadmap: {
        current_module: {},
        current_course: {},
      },
      jobEducation: {},
      career: '',
      careers: [],
      homeCareers: theHomeCareers,
      defaultCareerImageName: '',
      pageId: '',
      hidePage: true,
      error: '',
      showPrimaryJobStatusStay: false,
      showByIndex: [],
      indexCon: [0, 1, 2],
      isEnableLikeOrUnlikeClick: true,
      regionId: 0,
      totalProgress: 0,
    }
  },

    head() {
        return {
            title: `${ this.$t('general.job_detail') }`,
            meta: [
                {name: "app_id", property: "fb:app_id", content: this.pageId}
            ],
        }
    },

  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },

  mounted() {
    if (this.$nuxt.context.from) {
      window.location.reload();
    }
  },

  created() {
    if (this.isAuthenticated) {
      this.getDetailJob()
      this.hidePage = false
    }
    else {
      this.hidePage = false
    }
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
    async getDetailJob() {
      this.isShowAlertLogin = false
      const { data } = await this.$repositories.candidatesApply.getCurrentEducation()

      if (data) {
        this.job = data.job
        this.jobEducation = data.jobEducation
        this.userRoadmap = data.userRoadmap
        this.totalProgress = data.roadmapProgress
        if (this.userRoadmap) {
          this.datas = this.userRoadmap.roadmap_milestone.map((item, index) => {
            return {
              ...item,
              isShown: false,
              class: 'about-' + index,
            }
          })
        }
      } else {
        this.hidePage = true
        this.error = 'Bạn phải tạo CV để xem chi tiết job!'
      }
    },

    isModuleFinish(moduleId, course) {
      if(course.done_modules && course.done_modules.length !== 0) {
        if (course.done_modules.includes(moduleId)) {
          return true;
        }
      }
      return false
    },

    ...mapActions({
      dispatchSetCareer: 'detail-job/setCareer',
//      dispatchSetProvinceId: 'detail-job/setProvinceId',
    }),

    routeToJobDetailPage(job) {
      const jobDetailRoute = `/jobs/detail/${job.id}`
      this.$repositories.jobs.increaseCountClick({
        path: jobDetailRoute,
        job_id: job.id
      })
      this.$router.push(this.localePath(jobDetailRoute, this.$i18n.locale))
    },

    shownClass(data) {
      data.isShown = !data.isShown
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/detail-roadmap.scss';
@import "../../styles/components/modal/_apply_job_done_modal.scss";
.jobRequirement.requirements {
  ul {
    margin-bottom: 0 !important;
  }
}
.learning-route {
  .course-module {
    list-style-type: none;
    padding-left: 0;
    li {
      padding: 16px;
      cursor: pointer;
    }
    li:hover {
      background: #bababa;
    }
  }
  p {
    margin-bottom: 0;
  }
  button {
      background-color: white !important;
      color: #00756A !important;
      font-size: 20px !important;
      border-color: #B2B2B2 !important;
      width: 100%;
      border: none !important;
      border-top: 2px solid rgba(0, 0, 0, 0.125) !important;
  }

  .card-body {
      background-color: #F1F1F1;
      padding: 0 !important;
      color: #606060;
      font-size: 16px;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      border: none !important
  }

  button:hover {
    box-shadow: none !important;
  }

  .about-visa {
      padding-bottom: 50px;
  }

  .row {
    margin: 0 !important;
  }
  .mid {
    display: flex;
    justify-content: flex-end;
  }
  .mid img {
    width: 18px;
    transition: 0.2s;
  }

  .rotated {
    transform: rotate(45deg);
  }

  .p-con {
    margin: 0 auto;
    margin-top: 1.5rem;
    border: 2px solid rgba(0, 0, 0, 0.125);
    padding: 0 !important;
    border-top: none;
    background-color: #F1F1F1;
  }
  .shown {
    border-bottom: 2px solid rgba(0, 0, 0, 0.125) !important;
  }
}
</style>
<style lang="scss">
.el-tabs__item.is-active {
  color: #BC282D;
}
.el-tabs__item:hover {
  color: #BC282D;
}
.el-tabs__active-bar {
  background-color: #BC282D;
}
.el-table .cell {
  word-break: keep-all;
}
</style>
