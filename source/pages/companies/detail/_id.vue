<template>
  <main class="container-maintain">
    <div v-if="spinner">
      <div class="loader"></div>
    </div>
    <div class="container">
      <div v-if="hasCV" class="card position-relative">
        <div class="card-body basic px-0 py-0">
          <div class="d-md-flex">
            <div class="align-items-center">
              <div class="logo mb-3 mb-md-0">
                <img v-if="logo" :src="url_api_file + logo" alt="OJI PAPER" />
                <img v-if="!logo" class="logo" src="~/assets/images/default-logo-company.svg" alt="" />
              </div>
            </div>
            <div class="flex-grow-1 ps-md-5 pt-md-2">
              <h2 id="name">{{ $t('general.company') }} {{ company_name }}</h2>
              <div class="row">
                <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
                  <div class="d-flex item">
                  <span class="me-2"
                  ><img
                    src="../../../assets/images/users/ic_user_red.svg"
                  /></span>
                    <span>{{ manager_name }}</span>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
                  <div v-if="link_website" class="d-flex item align-items-center">
                  <span class="me-2"
                  ><img
                    src="../../../assets/images/users/draft/red_globe.svg"
                  /></span>
                    <a :href="link_website" target="_blank" class="website-link">{{ $t('job_detail.website') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasCV" :key="key" class="card job-list-contain">
        <div class="job-list">
          <div class="job-text">{{ $t('general.listJob') }}</div>
          <div class="more"></div>
        </div>
        <div v-for="(job, index) in jobs" v-show="index < jobNum" :key="index">
          <div
            class="card-body basic px-0 job-item"
            :class="{
              'job-item-first': index === 0
            }"
          >
            <div class="d-md-flex">
              <div class="align-items-center">
                <div class="job-img mb-3 mb-md-0">
                  <img
                    v-if="job.favorites.length != 0"
                    src="../../../assets/images/users/draft/red-heart.svg"
                    alt="heart"
                    @click="deleteFavoriteJobs(job.favorites[0].id)"
                  />
                  <img
                    v-else
                    src="../../../assets/images/users/draft/heart.svg"
                    alt="heart"
                    @click="postFavoriteJobs(job.id)"
                  />
                  <img
                    v-if="job.image_job"
                    :src="url_api_file + job.image_job"
                    alt=""
                    class="cursor-pointer"
                    @click="routeToJobDetailPage(job)"
                  />
                  <img
                    v-else-if="job.default_image"
                    :src="require(`@/assets/images/users/draft/career/` + job.default_image)"
                    alt=""
                    class="cursor-pointer"
                    @click="routeToJobDetailPage(job)"
                  >
                  <img
                    v-else
                    :src="require(`@/assets/images/users/draft` + careerList[job.career - 1].image)"
                    alt=""
                    class="cursor-pointer"
                    @click="routeToJobDetailPage(job)"
                  >
                </div>
              </div>
              <div class="flex-grow-1 ps-md-3 ps-lg-5">
                <h2 id="sub">
                  <a
                    :href="localePath(`/jobs/detail/${job.slug}`, $i18n.locale)"
                    @click.prevent="routeToJobDetailPage(job)"
                  >
                    {{ $i18n.locale === 'ja' ? job.title : job.title_vi }}
                  </a>
                </h2>
                <div class="row">
                  <div class="col-12 col-sm-12">
                    <div class="d-flex vertical-align-middle jd">
                      <!--                  <span class="me-2"-->
                      <!--                  ><img src="../../../assets/images/users/draft/red_yen.svg"-->
                      <!--                  /></span>-->
                      <img class="me-2" src="../../../assets/images/users/draft/red_yen.svg"/>
                      <span class="moneys">
                        {{ formatPrice(Math.ceil(job.salary_min)) }} -
                        {{ formatPrice(Math.ceil(job.salary_max)) }}
                      </span>
                    </div>
                    <div class="d-flex vertical-align-middle jd">
                      <img class="me-2" src="../../../assets/images/users/draft/red_locate.svg"/>
                      <span class="maps">
                        {{ $t(provinces[job.province_id]) }} -
                        {{ $t('job_detail.japan') }}
                      </span>
                    </div>
                    <div v-if="$i18n.locale === 'vi'" class="d-flex jd">
                      <img class="me-2" src="../../../assets/images/users/draft/red_calendar.svg"/>
                      <span class="time">
                        {{ $moment(job.date_start).format('DD/MM/YYYY') }} -
                        {{$moment(job.date_end).format('DD/MM/YYYY') }}
                      </span>
                    </div>
                    <div v-else class="d-flex jd">
                      <img class="me-2" src="../../../assets/images/users/draft/red_calendar.svg"/>
                      <span class="time">
                        {{ job.date_start.replaceAll('-', '/') }} -
                        {{ job.date_end.replaceAll('-', '/') }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="jr-con">
                  <span v-if="job.form_recruitment !== 5" class="jr">
                    {{ getFormRecruitment(job.form_recruitment) }}
                  </span>
                  <span
                    v-if="job.career !== careers.length"
                    class="jr"
                  >{{ $t(careers[job.career - 1]) }}</span>
                  <span class="break"></span>
                  <span
                    v-for="(stay_status, inindex) in job.status_stay.split(',')"
                    v-show="inindex == 0 || inindex == 1 || inindex == 2 || showByIndex.includes(index)"
                    :key="inindex"
                    class="jr"
                  >
                  {{ $t(status_stay[parseInt(stay_status)]) }}
                  </span>
                  <!--<span
                    v-if="!showByIndex.includes(index) && job.status_stay.split(',').length > 3"
                    class="statusToggle"
                    @click="showByIndex.push(index)"
                  >
                    ...Xem thêm
                  </span>
                  <span
                    v-if="showByIndex.includes(index) && job.status_stay.split(',').length > 3"
                    class="statusToggle"
                    @click="removeVal(index)"
                  >
                    Thu lại
                  </span>-->
                  <div
                    v-if="!showByIndex.includes(index) && job.status_stay.split(',').length > 3"
                    class="mini-text"
                    @click="showByIndex.push(index)"
                  >
                    {{ $t('general.more') }}
                    <img src="~/assets/images/users/icon_more.svg" alt="">
                  </div>
                  <div
                    v-if="showByIndex.includes(index) && job.status_stay.split(',').length > 3"
                    class="mini-text"
                    @click="removeVal(index)"
                  >
                    {{ $t('general.collapse') }}
                    <img src="~/assets/images/users/icon_collapse.svg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="jobNum < jobs.length" class="show-more" @click="showMore()">
          {{ $t('general.more') }} &#8921;
        </div>
      </div>

      <div v-if="hasCV" class="card">
        <div class="card-body px-0 py-0">
          <div class="row">
            <div class="col-12 col-lg-6">
              <h2 class="title">
                <span>{{ $t('general.about_company') }}</span>
              </h2>
              <!--<div class="d-block my-4 ps-0 ps-sm-3 ps-lg-4 fs-16">
                 <small>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit<br />
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit<br />
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                </small>
              </div>-->
              <div class="d-block fs-16 mt-3 white-space-pre-line word-break-break-all">
                {{ $i18n.locale === 'ja' ? description : description_vi }}
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <iframe
                v-if="video_link"
                class="img-fluid profile-img w-100"
                :src="
                video_link.includes('youtube')
                  ? video_link
                  : url_api_file + video_link
              "
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div v-if="hasCV" class="card">
        <div class="card-body px-0 py-0">
          <div class="row">
            <div class="col-12 col-lg-6">
              <h2 class="title">{{ $t('general.address') }}</h2>
              <div class="mt-4 fs-16">
                {{ postal_code ? '〒' + postal_code.slice(0, 3) + '-' + postal_code.slice(3) : '' }}
                {{ provincesList[province_id] }}
                {{ district }}
                {{ address }}
              </div>
            </div>
            <div class="col-12 col-lg-6 mt-3 mt-lg-0">
              <div class="map">
                <iframe
                  frameborder="0"
                  :src="
                  'https://maps.google.com/maps?output=embed&t=p&q=' +
                  address_map
                "
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <PageView :path-page="$nuxt.$route.path"></PageView>
      </div>

      <swiper v-if="hasCV" ref="swiper" class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="(image, index) in images"
          :key="index"
          class="swiper-slide"
        ><img :src="url_api_file + image.image_url" alt=""
        /></swiper-slide>
        <div slot="button-prev" class="swiper-button-prev" @click="prev()"></div>
        <div slot="button-next" class="swiper-button-next" @click="next()"></div>
      </swiper>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.min.css'
import theProvinces from '~/constants/provinces'
import theCareers from '~/constants/careers'
import theStatusStay from '~/constants/statusStay'
import PageView from '~/components/PageView'
import careerList from '~/constants/homeCareers'

export default {
  name: 'CompanyDetail',
  components: {
    Swiper,
    SwiperSlide,
    PageView
  },
  layout: 'auth',

  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        centerInsufficientSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: false,
        breakpoints: {
            375: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
      },
      url_api_file: process.env.URL_FILE,
      company_name: '',
      manager_name: '',
      number_members: '',
      founded_year: '',
      spinner: false,
      career: '',
      link_website: '',
      link_facebook: '',
      description: '',
      description_vi: '',
      logo: '',
      video_link: '',
      images: [],
      postal_code: '',
      province_id: '',
      district: '',
      address: '',
      address_map: '',
      provinces: [],
      careers: [],
      proposed: {},
      language: 'jp',
      status_stay: [],
      jobs: [],
      jobNum: 3,
      key: 0,
      showByIndex: [],
      provincesList: [
         "都道府県名",
         "北海道",
         "青森県",
         "岩手県",
         "宮城県",
         "秋田県",
         "山形県",
         "福島県",
         "茨城県",
         "栃木県",
         "群馬県",
         "埼玉県",
         "千葉県",
         "東京都",
         "神奈川県",
         "新潟県",
         "富山県",
         "石川県",
         "福井県",
         "山梨県",
         "長野県",
         "岐阜県",
         "静岡県",
         "愛知県",
         "三重県",
         "滋賀県",
         "京都府",
         "大阪府",
         "兵庫県",
         "奈良県",
         "和歌山県",
         "鳥取県",
         "島根県",
         "岡山県",
         "広島県",
         "山口県",
         "徳島県",
         "香川県",
         "愛媛県",
         "高知県",
         "福岡県",
         "佐賀県",
         "長崎県",
         "熊本県",
         "大分県",
         "宮崎県",
         "鹿児島県",
         "沖縄県"
      ],
      careerList,
      hasCV: false,
    }
  },

  head() {
    return { title: `${ this.$t('general.company_detail') }` }
  },

  computed: {},

  created() {
    this.checkCV()
    this.getCompanyWithJobs()
  },

  methods: {
    prev() {
      this.$refs.swiper.$swiper.slidePrev()
    },
    next() {
      this.$refs.swiper.$swiper.slideNext()
    },
    async checkCV() {
      this.spinner = true;
      const { data } = await this.$repositories.candidates.checkCV()
      if (!data.errors) {
        this.hasCV = true
      }
      else {
        this.hasCV = false
      }
      this.spinner = false;
    },
    async getCompanyWithJobs() {
      const { data } = await this.$repositories.companies.getCompanyWithJobs(
        this.$route.params.id
      )
      this.company_name = data.company.company_name
      this.manager_name = data.company.manager_name
      this.number_members = data.company.number_members
      this.founded_year = data.company.founded_year
      this.link_website = data.company.link_website
      this.link_facebook = data.company.link_facebook
      this.description = data.company.description
      this.description_vi = data.company.description_vi
      this.logo = data.company.logo
      this.district = data.company.district
      this.address = data.company.address
      this.video_link = data.company.video_link
      this.images = data.company.images
      this.postal_code = data.company.postal_code
      this.province_id = data.company.province_id
      this.provinces = theProvinces
      this.careers = theCareers
      this.status_stay = theStatusStay
      this.jobs = data.job
      if (this.postal_code)
        this.address_map = '〒' + this.postal_code.slice(0, 3) + '-' + this.postal_code.slice(3) + ' ' + this.$t(this.province) + ' ' + this.district + ' ' + this.address
      else
        this.address_map = this.$t(this.province) + ' ' + this.district + ' ' + this.address
    },
    async postFavoriteJobs(payload) {
      try {
        await this.$repositories.jobs
          .postFavoriteJobs({
            job_id: payload,
          })
          .then((res) => {
            if (res.status === 201) {
              this.$toast.success(this.$t('general.addJobToFavoriteListSuccess'))
            } else {
              this.$toast.success(this.$t('general.inactive'))
            }
          })
      } catch (e) {
        this.errors = e.response.data.errors
      }
      this.getCompanyWithJobs()
    },
    async deleteFavoriteJobs(payload) {
      try {
        await this.$repositories.jobs
          .deleteFavoriteJobs(payload)
          .then((res) => {
            if (res.status === 204) {
              this.$toast.success(this.$t('general.removeJobFromFavoriteListSuccess'))
            } else {
              this.$toast.success(this.$t('general.inactive'))
            }
          })
      } catch (e) {
        this.errors = e.response.data.errors
      }
      this.getCompanyWithJobs()
    },
    showMore() {
      this.jobNum += 5
      this.key += 1
    },
    removeVal(val) {
      const index = this.showByIndex.indexOf(val)
      if (index !== -1) {
        this.showByIndex.splice(index, 1)
      }
    },
    formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
@import '../../../styles/pages/users/detail-company.scss';
</style>
