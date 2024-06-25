<template>
  <div class="body">
    <div v-show="openMap" class="map-con">
      <div v-if="windowWidth > 576" id="my-map" ref="myMap" class="map-container fix"></div>
      <div v-if="windowWidth <= 576" id="my-mobile-map" ref="myMap" class="map-container fix"></div>
      <div id="tooltip"></div>
      <div class="map" :class="{ 'small-map': mapCalled === 0, 'extended': windowWidth > 576 && regionId != 0 }">
        <div class="delete" @click="hidePopUpMap()">
            <!--<img src="../assets/images/users/ic_delete.svg" alt="" width="7px" height="7px">-->
            <img src="~/assets/images/ic_exit.svg" alt="" width="20px" height="20px">
        </div>

        <div v-if="provinceId != ''" class="information">
            <div class="province">
                {{ $t(regionsList[regionId]) }}
            </div>
            <div v-for="job in mapJobs" :key="job.id" class="box-infor d-flex">
                <a @click.prevent="routeToJobDetailPage(job)">
                  <img v-if="job.image_job" class="image-contentt" :src="url_api_file + job.image_job" alt="" width="111" height="80">
                  <img v-else-if="job.default_image" :src="require(`@/assets/images/users/draft/career/` + job.default_image)" alt="" class="image-contentt" width="111" height="80">
                  <img v-else :src="require(`@/assets/images/users/draft` + careerList[(job.career - 1)].image)" alt="" class="image-contentt" width="111" height="80">
                </a>
                <div>
                      <div class="title">
                        <a
                          :href="localePath(`/jobs/detail/${job.id}`, $nuxt.$i18n.locale)"
                          data-bs-toggle="tooltip"
                          :title="$nuxt.$i18n.locale === 'ja' ? job.title : job.title_vi"
                          class="line-frame"
                          @click.prevent="routeToJobDetailPage(job)"
                        >
                          {{ $nuxt.$i18n.locale === 'ja' ? job.title : job.title_vi }}
                        </a>
                      </div>
                    <div class="currency d-flex">
                    <img src="../assets/images/users/icon_money_jp_red.svg" alt="" width="14" height="14">
                    <span v-if="job.salary_min != 0">{{ formatPrice(Math.ceil(job.salary_min)) }} - {{ formatPrice(Math.ceil(job.salary_max)) }}</span>
                    <span v-if="job.salary_min == 0">Upto {{ formatPrice(Math.ceil(job.salary_max)) }}</span>
                    </div>

                    <div v-if="$i18n.locale === 'vi'" class="time d-flex">
                        <img src="../assets/images/users/draft/red_calendar.svg" alt="" width="14" height="14">
                        <span>{{ $moment(job.date_start).format('DD/MM/YYYY') }} - {{ $moment(job.date_end).format('DD/MM/YYYY') }}</span>
                    </div>
                    <div v-else class="time d-flex">
                        <img src="../assets/images/users/draft/red_calendar.svg" alt="" width="14" height="14">
                        <span>{{ job.date_start.replaceAll('-', '/') }} - {{ job.date_end.replaceAll('-', '/') }}</span>
                    </div>
                </div>
            </div>
            <div >
              <div v-if="mapJobs.length === 0 && spinner" class="d-flex justify-content-center mt-2">
                <div class="spinner-border">
                  <div class="sr-only"></div>
                </div>
              </div>
              <div v-if="mapJobs.length === 0 && !spinner" class="text-center fw-bold ]-data">{{ $t('general.no_data') }}</div>
            </div>
            <div class="d-flex flex-column">
              <NuxtLink v-if="mapJobs.length !== 0" class="more more-jobs d-flex fw-bold" :to="localePath({path: '/jobs', query: { province_id: provinceId, region_id: regionId }}, $i18n.locale)">
                {{ $t('general.more') }}
                <img src="../assets/images/users/ic_right_red.svg" alt="" width="12" height="12">
              </NuxtLink>
              <div class="d-flex justify-content-center" :class="{ noMaTop: mapJobs.length === 0 }">
                <button v-if="windowWidth <= 950" class="confirm" @click.prevent="saveProvince">OK</button>
              </div>
            </div>
        </div>
        <div class="holder" :class="{ 'small-holder': mapCalled === 0 }"></div>
        <div v-if="provinceId == '' || windowWidth > 950" class="d-flex justify-content-center" :class="{ veryMaTop: windowWidth < 576 }">
            <button class="confirm" @click.prevent="saveProvince">Ok</button>
        </div>
      </div>
    </div>
    <div class="box-find text-center mb-4 mb-lg-5">
    <!-- <h3 class="text-white">{{ $t('general.news') + jobCount + $t('general.newsNum') }}</h3> -->
     <h3 class="text-white">{{ $t('general.slogan') }}</h3>
    <div class="d-flex justify-content-center">
      <button class="d-flex justify-content-center align-items-center mid-list">
        <NuxtLink :to="localePath('/jobs', $i18n.locale)">{{ $t('general.listJob') }}</NuxtLink>
      </button>
    </div>
    <div class="row box-home-search mt-3 pt-2 pb-2 rounded-pill" :class="{ wider: $i18n.locale == 'vi' }">
        <!-- <div class="col-12 col-custom inner-search">
            <div class="input-group input-group-icon box-search-element">
                            <span class="input-group-text input-group-text-pre">
                                <img src="../assets/images/users/icon_money_jp.svg" alt="">
                            </span>
                <select id="inputGroupSelect01" v-model="salaryLevel" class="form-select" :class="{ 'bl-text': salaryLevel !== 0}">
                    <option v-for="option in salaryOptions" :key="option.value" :value="option.value" class="gray-text">
                      {{ $t(option.text) }}
                    </option>
                </select>
            </div>
        </div>
        <div class="col-12 col-custom inner-search">
            <div class="input-group input-group-icon pointer box-search-element">
                <span class="input-group-text input-group-text-pre">
                    <img src="../assets/images/users/icon_map.svg" alt="">
                </span>
                <span id="exampleInput9"
                      ref="province"
                      class="form-control text-left span-text-map-contain h-100"
                      @click="openMap = true"
                >
                  <span
                    class="span-text-map"
                    :class="{ 'bl-text': realProvinceId !== 0}"
                  >
                    {{ $t(regionsList[realProvinceId]) }}
                  </span>
                </span>
            </div>
        </div>
        <div class="col-12 col-custom inner-search">
            <div class="input-group input-group-icon box-search-element">
                            <span class="input-group-text input-group-text-pre">
                                <img src="../assets/images/users/icon_stay.svg" alt="">
                            </span>
                <select id="inputGroupSelect02" v-model="statusStay" class="form-select" :class="{ 'bl-text': statusStay !== 0}">
                    <option v-for="option in statusOptions" :key="option.value" :value="option.value" class="gray-text">
                      {{ $t(option.text) }}
                    </option>
                </select>
            </div>
        </div>
        <div class="col-12 col-lg-auto" style="flex-grow: 1">
            <button
              type="button"
              class="btn rounded-pill float-end btn-home-search-job box-search-element"
              @click="findJobs()"
            >
                <span class="icon-search">
                  <img src="../assets/images/users/icon_search.svg" alt="">
                </span>
                <span class="px-2 text-find">{{ $t('general.find') }}</span>
            </button>
        </div> -->
      </div>
    </div>
    <main class="container my-4 my-lg-5">
      <div class="text-center box-home-title">
        <h2>{{ $t('general.recommendedJob') }}</h2>
      </div>
      <div class="row">
        <div v-for="(job, dex) in jobList" :key="dex" class="col-12 col-sm-6 col-lg-4 box-home-content-contain">
            <div v-if="job.status == 1" class="box-home-content">
                <div :key="key" class="img-content">
                    <img
                      v-if="favoriteList[dex] === 0 || !isAuthenticated"
                      class="item-heart"
                      src="../assets/images/users/icon_heart.svg"
                      alt="heart"
                      @click="likeJob(job, dex)"
                    />
                    <img
                      v-if="favoriteList[dex] !== 0 && isAuthenticated"
                      class="item-heart"
                      src="../assets/images/users/icon_heart_active.svg"
                      alt="heart"
                      @click="unlikeJob(job, dex)"
                    />
                    <a @click.prevent="routeToJobDetailPage(job)">
                      <img v-if="job.image_job" :src="url_api_file + job.image_job" class="item-img"/>
                      <img
                        v-else-if="job.default_image"
                        :src="require(`@/assets/images/users/draft/career/` + job.default_image)"
                        alt=""
                        class="item-img"
                      >
                      <img v-else :src="require(`@/assets/images/users/draft` + careerList[(job.career - 1)].image)" alt="" class="item-img">
                    </a>
                </div>
                <div class="bt-content">
                      <div class="title-content">
                        <h4>
                          <a
                            :href="localePath(`/jobs/detail/${job.slug}`, $nuxt.$i18n.locale)"
                            :class="{'line-frame': isHoveringHome[dex]}"
                            data-bs-toggle="tooltip"
                            :title="$nuxt.$i18n.locale === 'ja' ? job.title : job.title_vi"
                            @click.prevent="routeToJobDetailPage(job)"
                          >
                            {{ $nuxt.$i18n.locale === 'ja' ? job.title : job.title_vi }}
                          </a>
                        </h4>
                      </div>
                    <div class="item-content mt-4">
                        <div>
                            <img
                              src="../assets/images/users/icon_money_jp_red.svg"
                              height="19px"
                            />
                            <span class="text-item money">
                              <span v-if="job.salary_min != 0" class="vertical-align-middle">{{ formatPrice(Math.ceil(job.salary_min)) }} - {{ formatPrice(Math.ceil(job.salary_max)) }}</span>
                              <span v-if="job.salary_min == 0" class="vertical-align-middle">{{$t('general.upto')}} {{ formatPrice(Math.ceil(job.salary_max)) }}{{ $t('general.yen') }}</span>
                            </span>
                        </div>
                        <div>
                            <img
                              src="../assets/images/users/icon_map_red.svg"
                              height="19px"
                            />
                            <span class="text-item vertical-align-middle">{{ $t(provinceList[job.province_id]) }}</span>
                        </div>
                        <div class="row mt-1">
                            <div class="d-block">
                                <span v-if="$i18n.locale === 'vi' && job.form_recruitment !== 5" class="badge">
                                  {{ formRecruitMent[job.form_recruitment].vi }}
                                </span>
                                <span v-if="$i18n.locale === 'ja' && job.form_recruitment !== 5" class="badge">
                                  {{  formRecruitMent[job.form_recruitment].ja }}
                                </span>
                                <span
                                  v-if="job.career !== careers.length"
                                  class="badge"
                                  :style="job.form_recruitment !== 5 ? 'margin-left: -5px' : ''"
                                >
                                      {{ $t(careers[job.career - 1]) }}
                                    </span>
                            </div>
                            <div>
                              <div :key="key" class="d-block">
                                <span v-for="(item, index) in toArray(job.status_stay)" :key="index" class="badge">
                                  <span v-if="index < statusNumber[dex]">{{ $t(statusList[item]) }}</span>
                                </span>
                                <span
                                  v-if="
                                    statusNumber[dex] <= DISPLAY_STATUS_STAY_NUMBER
                                    && toArray(job.status_stay).length > DISPLAY_STATUS_STAY_NUMBER
                                  "
                                  class="mini-text"
                                  @click="showStatus(dex, toArray(job.status_stay).length)"
                                >
                                  {{ $t('general.more') }}
                                  <img src="../assets/images/users/icon_more.svg" alt="">
                                </span>
                                <span
                                  v-if="statusNumber[dex] > DISPLAY_STATUS_STAY_NUMBER"
                                  class="mini-text"
                                  @click="hideStatus(dex)"
                                >
                                  {{ $t('general.collapse') }}
                                  <img src="../assets/images/users/icon_collapse.svg" alt="">
                                </span>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!-- <div class="text-center box-home-title mt-4 mt-lg-5">
        <h2>{{ $t('general.allCareers') }}</h2>
        <swiper ref="swiper" class="swiper" :options="swiperOption">
          <swiper-slide v-for="(career, index) in careerList" :key="index" class="swiper-slide">
            <nuxt-link :to="localePath({ path: '/jobs', query: {career: index + 1} }, $nuxt.$i18n.locale)">
              <img :src="require(`@/assets/images/users/draft` + career.image_square)" alt="">
              <span class="text-white">{{ $t(career.name) }}</span>
            </nuxt-link>
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev" @click="prev()"></div>
          <div slot="button-next" class="swiper-button-next" @click="next()"></div>
        </swiper>
      </div> -->
    </main>
    <div v-if="openMap == 1" class="dark-temp" @click="hideMap()"></div>
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
  </div>
</template>
<script>
import Vue from 'vue'
import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import 'swiper/swiper-bundle.css'
import { mapGetters } from 'vuex'
import 'swiper/swiper-bundle.min.css'
import careerList from '~/constants/homeCareers'
import careers from '~/constants/careers'
import statusList from '~/constants/statusStay'
import provinces from '~/constants/provinces'
import regions from '~/constants/regions'
import PageView from '~/components/PageView'
import ApplyJobAlertModal from "~/components/modal/ApplyJobAlertModal"

SwiperClass.use([Pagination, Mousewheel, Autoplay])
Vue.use(getAwesomeSwiper(SwiperClass))
// const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

const DISPLAY_STATUS_STAY_NUMBER = 1

const NOT_LOGGED_IN = 4
const ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN = 5

export default {
  name: 'Home',
  components: {
    // Swiper,
    // SwiperSlide,
    PageView,
    ApplyJobAlertModal
  },
  layout: 'authUnrequired',
  data() {
    return {
      routeRedirectAfterLogin: '',
      DISPLAY_STATUS_STAY_NUMBER,
      status_alert: 0,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 10,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            stopOnLastSlide: false,
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            375: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            995: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
            1325: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
            1400: {
                slidesPerView: 6,
                spaceBetween: 10,
            },
        }
      },
      url_api_file: process.env.URL_FILE,
      salaryLevel: 0,
      salaryOptions: [
        {text: 'salary_option.salary_0', value: 0},
        {text: 'salary_option.salary_1', value: 1},
        {text: 'salary_option.salary_2', value: 2},
        {text: 'salary_option.salary_3', value: 3},
        {text: 'salary_option.salary_4', value: 4}
      ],
      statusStay: 0,
      statusOptions: [
        {text: 'status_stay.status_0', value: 0},
        {text: 'status_stay.status_1', value: 1},
        {text: 'status_stay.status_2', value: 2},
        {text: 'status_stay.status_3', value: 3},
        {text: 'status_stay.status_4', value: 4},
        {text: 'status_stay.status_5', value: 5},
        {text: 'status_stay.status_6', value: 6},
        {text: 'status_stay.status_7', value: 7},
        {text: 'status_stay.status_8', value: 8}
      ],
      provinceList: provinces,
      regionsList: regions,
      provincesName: '',
      provinceId: '',
      regionId: 0,
      jobList: [],
      jobCount: 0,
      careerList,
      careers,
      statusList,
      formRecruitMent: [
        '',
        {
          vi: 'Nhân viên chính thức',
          ja: '正社員 '
        },
        {
          vi: 'Nhân viên hợp đồng',
          ja: '契約社員'
        },
        {
          vi: 'Nhân viên bán thời gian',
          ja: 'パート・アルバイト'
        },
        {
          vi: 'Nhân viên do các công ty phái cử',
          ja: '派遣社員'
        },
        {
          vi: 'Khác',
          ja: '他'
        }
      ],
      openMap: false,
      mapJobs: [],
      spinner: false,
      accountShow: false,
      statusNumber: [],
      key: 0,
      windowWidth: 0,
      windowHeight: 0,
      mapCalled: 0,
      areas: [
              { code:1, name: "Hokkaido", color: "#8886d9", hoverColor: "#8886d9b3", prefectures: [1] },
              { code:2, name: "Tohoku", color: "#619feb", hoverColor: "#619feb94", prefectures: [2, 3, 4, 5, 6, 7] },
              { code:3, name: "Kanto", color: "#3da942", hoverColor: "#3da9429c", prefectures: [8, 9, 10, 11, 12, 13, 14], },
              { code:4, name: "Chubu", color: "#99cc33", hoverColor: "#99cc3385", prefectures: [15, 16, 17, 18, 19, 20, 21, 22, 23] },
              { code:5, name: "Kansai", color: "#f2c100", hoverColor: "#f2c1008a", prefectures: [24, 25, 26, 27, 28, 29, 30] },
              { code:6, name: "Chugoku", color: "#ff9b05", hoverColor: "#ff9b058c", prefectures: [31, 32, 33, 34, 35] },
              { code:7, name: "Shikoku", color: "#fd9fab", hoverColor: "#fd9fab8a", prefectures: [36, 37, 38, 39] },
              { code:8, name: "Kyushu ", color: "#ff6561", hoverColor: "#ff656187", prefectures: [40, 41, 42, 43, 44, 45, 46, 47] }
      ],
      favoriteList: [],
      isEnableLikeOrUnlikeList: [],
      isHoveringHome: [],
      realProvinceId: 0,
      realProvinceName: '',
    }
  },
  head() {
    return {
      title: `${ this.$t('general.homepage') }`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Shuu Navi(Shuuナビ) là trang web hỗ trợ việc làm cho người Việt đang sống tại Nhật Bản. Tại Shuu Navi, bạn có thể tạo CV và ứng tuyển công việc mong muốn. Shuuナビはベトナム人就職支援サイトです。'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: '在日ベトナム人, 仕事, 就職支援,, 就職活動, Shuuナビ, 就職, 転職, 日本仕事, Shuunavi, Shuu Navi, tìm việc, chuyển việc, việc tại nhật, hỗ trợ tìm việc, hoạt động tìm kiếm việc làm, công việc, Shuu, Shuushoku, hỗ trợ việc làm, tìm việc tại nhật bản, tìm việc tại japan'
        }
      ],
      script: [
            {
                src: "/jquery.japan-map.min.js",
                ssr: true
            }
        ],
    };
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },
  created() {
    this.getJobs()
    this.getJobCounts()
  },
  mounted() {
    this.$nextTick(function () {
      this.onResize();
    })
    window.addEventListener('resize', this.onResize)
  },
  updated() {
        this.windowWidth = window.innerWidth
        // eslint-disable-next-line no-undef
        // eslint-disable-next-line prefer-const
        let self = this
        // 三重の扱いって難しいよね・・・
        // eslint-disable-next-line no-undef
        $("#my-map").japanMap({
            width: 704,
//            selection: "prefecture",
            selection: "area",
            areas: this.areas,
            backgroundColor : "#fff",
            borderLineColor: "#f2fcff",
            borderLineWidth : 0.25,
            lineColor : "#a0a0a0",
            lineWidth: 1,
            drawsBoxLine: true,
            showsPrefectureName: false,
            showsAreaName: true,
            prefectureNameType: "english",
            movesIslands : true,
            fontSize : 11,
            fontColor: "#4D4D4D",
            onSelect(data){
                self.mapCalled += 1
                self.regionId = data.code;
                self.provinceId = data.area.prefectures.toString();
//                console.log(data.area.prefectures.toString());
//                self.provinceId = data.code;
                self.provincesName = data.area.name;
                self.areas[0].color = "#8886d9"
                for (let i = 1; i < 8; ++i) {
                  if (i === 1) {
                    self.areas[i].color = "#619feb"
                  }
                  else if (i === 2) {
                    self.areas[i].color = "#3da942"
                  }
                  else if (i === 3) {
                    self.areas[i].color = "#99cc33"
                  }
                  else if (i === 4) {
                    self.areas[i].color = "#f2c100"
                  }
                  else if (i === 5) {
                    self.areas[i].color = "#ff9b05"
                  }
                  else if (i === 6) {
                    self.areas[i].color = "#fd9fab"
                  }
                  else {
                    self.areas[i].color = "#ff6561"
                  }
                }
                self.areas[data.code - 1].color = '#BC282D';
                self.getMapJobs()
                this.key += 1
            },
        });
          // eslint-disable-next-line no-undef
          $("#my-mobile-map").japanMap({
            width: 350,
//            selection: "prefecture",
              selection: "area",
            areas: this.areas,
            backgroundColor : "#fff",
            borderLineColor: "#f2fcff",
            borderLineWidth : 0.25,
            lineColor : "#a0a0a0",
            lineWidth: 1,
            drawsBoxLine: true,
              showsPrefectureName: false,
              showsAreaName: true,
            prefectureNameType: "english",
            movesIslands : true,
            fontSize : 7,
            fontColor: "#4D4D4D",
            onSelect(data){
                self.mapCalled += 1
                self.regionId = data.code;
                self.provinceId = data.area.prefectures.toString();
                self.provincesName = data.name;
                self.areas[0].color = "#8886d9"
                for (let i = 1; i < 8; ++i) {
                  if (i === 1) {
                    self.areas[i].color = "#619feb"
                  }
                  else if (i === 2) {
                    self.areas[i].color = "#3da942"
                  }
                  else if (i === 3) {
                    self.areas[i].color = "#99cc33"
                  }
                  else if (i === 4) {
                    self.areas[i].color = "#f2c100"
                  }
                  else if (i === 5) {
                    self.areas[i].color = "#ff9b05"
                  }
                  else if (i === 6) {
                    self.areas[i].color = "#fd9fab"
                  }
                  else {
                    self.areas[i].color = "#ff6561"
                  }
                }
                self.areas[data.code - 1].color = '#BC282D';
                self.getMapJobs()
                this.key += 1
            }
          });
  },
  destroyed() {
    window.removeEventListener('resize', this.$forceUpdate)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 576) {
        // eslint-disable-next-line no-undef
        $("#my-map > canvas").hide()
      }
      else {
        // eslint-disable-next-line no-undef
        $("#my-mobile-map > canvas").hide()
      }
    },
    toArray: (str) => {
      str = str + ''
      return str.split(',').map((val) => {
        return parseInt(val, 10)
      })
    },
    prev() {
      this.$refs.swiper.$swiper.slidePrev()
    },
    next() {
      this.$refs.swiper.$swiper.slideNext()
    },
    async getJobs() {
      const { data } = await this.$repositories.jobs.getHomeJobs()
      this.jobList = [...data]
      for (let i = 0; i < data.length; ++i) {
        this.statusNumber[i] = DISPLAY_STATUS_STAY_NUMBER
        this.isHoveringHome[i] = true
      }
      data.forEach((job, index) => {
        this.isEnableLikeOrUnlikeList[index] = true
        if (job.favorites.length === 0) {
          this.favoriteList[index] = 0;
        }
        else {
          this.favoriteList[index] = 1;
        }
      })
    },
    async getJobCounts() {
      const { data } = await this.$repositories.jobs.getJobCount()
      this.jobCount = data
    },
    formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    findJobs() {
      const q = {}
      if (this.salaryLevel !== 0) {
        q.salary = this.salaryLevel
      }
      if (this.statusStay !== 0) {
        q.status_stay = this.statusStay
      }
      if (this.regionId !== 0) {
        q.province_id = this.provinceId
        q.region_id = this.regionId
      }
      // this.$router.push({ path: '/jobs', query: q })
      this.$router.push(this.localePath({ path: '/jobs', query: q }, this.$nuxt.$i18n.locale))
    },
    async getMapJobs() {
      this.mapJobs = [];
      this.spinner = true;
      const { data } = await this.$repositories.jobs.getJobByProvince({province_id: this.provinceId})
      this.spinner = false;
      this.mapJobs = data
    },
    async likeJob(job, index) {
      if (this.isAuthenticated) {
        if (this.isEnableLikeOrUnlikeList[index]) {
          this.isEnableLikeOrUnlikeList[index] = false
          await this.$repositories.jobs.favoriteAJob({ job_id: job.id }).then(res => {
            if (res.status === 201) {
              this.$toast.success(this.$t('general.addJobToFavoriteListSuccess'))
              this.favoriteList[index] = 1
              this.key += 1
              // this.getJobs()
              job.favorites.push(res.data)
            }
            this.isEnableLikeOrUnlikeList[index] = true
          })
        }

      } else {
        this.status_alert = ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN
        this.routeRedirectAfterLogin = this.$route.path
        this.$refs.showPopUpAlertBtn.click()
      }
    },
    async unlikeJob(job, index) {
      if (this.isAuthenticated) {
        if (this.isEnableLikeOrUnlikeList[index]) {
          this.isEnableLikeOrUnlikeList[index] = false
          await this.$repositories.jobs.unfavoriteAJob(job.favorites[0].id).then(res => {
            if (res.status === 204) {
              this.$toast.success(this.$t('general.removeJobFromFavoriteListSuccess'))
              this.favoriteList[index] = 0
              this.key += 1
              // this.getJobs()
              job.favorites.length = 0
            }
            this.isEnableLikeOrUnlikeList[index] = true
          })
        }
      } else {
        this.status_alert = ADD_JOB_TO_FAVORITE_LIST_BUT_NOT_LOGGED_IN
        this.routeRedirectAfterLogin = this.$route.path
        this.$refs.showPopUpAlertBtn.click()
      }
    },

    routeToJobDetailPage(job) {
      this.$repositories.jobs.increaseCountClick({
        path: `/jobs/detail/${job.slug}`,
        job_id: job.id
      })
      if (this.isAuthenticated) {
        this.$router.push(this.$nuxt.localePath(`/jobs/detail/${job.slug}`, this.$nuxt.$i18n.locale))
      } else {
        this.status_alert = NOT_LOGGED_IN
        this.routeRedirectAfterLogin = this.$nuxt.localePath(`/jobs/detail/${job.slug}`, this.$nuxt.$i18n.locale)
        this.$refs.showPopUpAlertBtn.click()
      }
    },

    showStatus(dex, len) {
      this.statusNumber[dex] = len;
      this.key += 1
    },
    hideStatus(dex) {
      this.statusNumber[dex] = DISPLAY_STATUS_STAY_NUMBER
      this.key += 1
    },
    hideMap() {
      this.openMap = false
    },
    toggleTitle(hovering, dex) {
      this.$set(hovering, dex, !hovering[dex])
    },
    saveProvince() {
      this.realProvinceId = this.regionId
      this.realProvinceName = this.provincesName
      this.openMap = false
    },
      hidePopUpMap() {
          this.openMap = false
          this.regionId = 0;
          this.provinceId = '';
          this.provincesName = '';
          this.realProvinceId = this.regionId
          this.realProvinceName = this.provincesName
          this.mapJobs = [];
          this.spinner = false;
          this.areas[0].color = "#8886d9"
          for (let i = 1; i < 8; ++i) {
              if (i === 1) {
                  this.areas[i].color = "#619feb"
              }
              else if (i === 2) {
                  this.areas[i].color = "#3da942"
              }
              else if (i === 3) {
                  this.areas[i].color = "#99cc33"
              }
              else if (i === 4) {
                  this.areas[i].color = "#f2c100"
              }
              else if (i === 5) {
                  this.areas[i].color = "#ff9b05"
              }
              else if (i === 6) {
                  this.areas[i].color = "#fd9fab"
              }
              else {
                  this.areas[i].color = "#ff6561"
              }
          }
      },
  }
}
</script>
<style lang='scss' scoped>
  @import "../styles/layout/main.scss";
  @import '../styles/pages/_home.scss';
  @import '../styles/components/modal/_mapInfor.scss';
</style>
