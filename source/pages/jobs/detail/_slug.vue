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
    <div v-else-if="hidePage && error" class="maintain row" style="height: 80vh">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content box-modal">
          <div class="modal-body">
            <h3 class="text-center">
              <img src="~/assets/images/users/ic_user_cv_green.svg" alt=""/>
            </h3>
            <br/>
            <br/>
            <h3 class="text-center modal-body-text">
              {{ $t('apply_job_alert_modal.must_create_cv_to_see_job_detail') }}
            </h3>
          </div>
          <div class="modal-footer mb-4">
            <button
              class="btn btn-secondary fw-bold"
              @click="$nuxt.$router.push(localePath('/jobs', $i18n.locale))"
            >
              {{ $t('general.back') }}
            </button>
            <button
              class="btn btn-primary fw-bold"
              @click="$nuxt.$router.push(localePath('/users/user-profile', $i18n.locale))"
            >
              {{ $t('apply_job_alert_modal.create_cv') }}
            </button>
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
        :class="language == 'jp' ? 'lang-jp' : 'lang-vn'"
      >
        <!-- left -->
        <div class="col-12 col-sm-12 col-md-4">
          <div class="preview">
            <div
              class="logo-company"
              :style="{
            backgroundImage: logo ? `url(${url_api_file + logo})` : ''
          }"
            >
              <img v-if="!logo" class="logo" src="~/assets/images/default-logo-company.svg" alt=""/>
            </div>
            <div class="name-company">{{ company_name }}</div>

            <div class="row infor-one">
              <div class="col-6 location d-flex align-items-start">
                <img src="../../../assets/images/users/ic_user_red.svg" alt="" style="margin-right: 10px"/>
                <span>{{ manager_name }}</span>
              </div>
              <div class="col-6 quantity">
                <div v-if="link_website" class="website mb-4 justify-content-start d-flex">
                  <img src="../../../assets/images/users/ic_website_red.svg" alt=""/>
                  <a :href="link_website" class="website-link text-decoration-none" target="_blank">{{
                    $t('job_detail.website') }}</a>
                </div>
              </div>
            </div>
            <div
              class="detail-company"
              @click="$nuxt.$router.push(localePath('/companies/detail/' + company_id, $i18n.locale))"
            >
              {{ $t('job_detail.company_detail') }}
            </div>
          </div>
        </div>

        <!-- right -->
        <div class="col-12 col-sm-12 col-md-8">
          <div class="content-wrapper">
            <div class="title-job">
              <h3>{{ items.title }}</h3>
              <span v-if="items.job_point" :style="{ color: userPointColor(items), 'font-size': '20px' }">({{ Math.round(items.user_job_point / items.job_point * 100) / 100 * 100 }} điểm phù hợp)</span>
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
                    :src="require(`@/assets/images/users/draft` + homeCareers[(items.career - 1)].image)"
                    alt=""
                    width="330px"
                    height="220px"
                    class="job-ima"
                  />
                  <img
                    v-if="isFav"
                    class="heart"
                    src="../../../assets/images/users/draft/red-heart.svg"
                    alt="heart"
                    @click="deleteFavoriteJobs(items.favorites[0].id)"
                  />
                  <img
                    v-else
                    class="heart"
                    src="../../../assets/images/users/draft/heart.svg"
                    alt="heart"
                    @click="postFavoriteJobs(items.id)"
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-6">
                <div class="main-content">
                  <ApplyForm :id="items.id" :title="items.title" :title-vi="items.title_vi"
                             :is-expired="items.date_end" :job-status="items.status" :check-apply="checkApply"
                             :accept-education="items.accept_education" :matching-point="Math.round(items.user_job_point / items.job_point * 100) / 100 * 100"
                             :education-courses="datas.map((item) => item._id)" :is-applied="items.isApplied"
                             @applySuccess="handleApplySuccessEvent()" />
                  <div v-if="items.accept_education" class="d-flex mb-2">
                    <span style="color: #bc282d"><b>Có thể đào tạo trong {{ items.max_education_month }} tháng <span v-if="items.scholarship > 0">với học bổng {{ items.scholarship }}%</span></b></span>
                  </div>
                  <div class="moneys d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/icon_money_jp_red.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{
                    items.salary_min != 0
                    ? Math.ceil(items.salary_min)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' -'
                    : $t('general.upto')
                    }}
                    {{
                    Math.ceil(items.salary_max)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }}
                  </div>
                  <div class="maps d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/icon_map_red.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ $t(provinces[items.province_id]) }}
                  </div>
                  <div v-if="language == 'vn'" class="time d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ $moment(items.date_start).format('DD/MM/YYYY') }} - {{
                    $moment(items.date_end).format('DD/MM/YYYY') }}
                  </div>
                  <div v-else class="time d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ items.date_start.replaceAll('-', '/') }} - {{ items.date_end.replaceAll('-', '/') }}
                  </div>
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
            <el-tabs v-model="tabModel" stretch>
              <el-tab-pane label="Nội dung công việc" name="first">
                <div class="work-content">
                  <!--<div class="equa">-->
                    <!--<div class="etem">-->
                      <!--・ {{ $t('general.hourly') }} x {{ $t('general.actual_work') }} + {{ $t('general.OT') }} = {{-->
                      <!--$t('general.pay_sum') }}-->
                    <!--</div>-->
                    <!--<div class="etem">-->
                      <!--・ {{ $t('general.monthly') }} + {{ $t('general.OT_pay') }} = {{ $t('general.pay_sum') }}-->
                    <!--</div>-->
                  <!--</div>-->
                  <h3>Nội dung công việc</h3>
                  <!-- <p class="white-space-pre-line word-break-break-all"> -->
                  <p>
                    <v-runtime-template :template="`<div>${items.content_work}</div>`"></v-runtime-template>
                  </p>
                </div>
                <table class="table-recruitment w-100">
                  <tr>
                    <th class="numbers">Số lượng tuyển dụng</th>
                    <td class="white-space-pre-line word-break-break-all">
                      {{ items.number_recruitments }} người
                    </td>
                  </tr>

                  <tr>
                    <th class="numbers">Yêu cầu kỹ thuật</th>
                    <td class="requirements">
                      <ul v-if="items.majorColleges.length">
                        <li v-for="(major, index) in items.majorColleges" :key="index">
                          Tốt nghiệp đại học
                          <span v-if="major.colleges.length">
                            <span v-for="(college, cindex) in major.colleges" :key="cindex">
                              {{ college.name }}
                              <span v-if="cindex !== major.colleges.length - 1" class="fw-bold">hoặc</span>
                            </span>
                          </span>
                            chuyên ngành
                          <span v-for="(iitem, iindex) in major.majors" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== major.majors.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="items.beginnerSkills.length">
                        <li v-for="(skill, index) in items.beginnerSkills" :key="index">
                          Đã có kinh nghiệm
                          <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="items.intermediateSkills.length">
                        <li v-for="(skill, index) in items.intermediateSkills" :key="index">
                          Hiểu rõ về
                          <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="items.advancedSkills.length">
                        <li v-for="(skill, index) in items.advancedSkills" :key="index">
                          Thành thạo
                          <span v-for="(iitem, iindex) in skill" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== skill.length - 1">hoặc</span>
                          </span>
                        </li>
                      </ul>
                      <ul v-if="items.certificates.length">
                        <li v-for="(certificate, index) in items.certificates" :key="index">
                          Đạt được chứng chỉ
                          <span v-for="(iitem, iindex) in certificate" :key="iindex">
                            {{ iitem.name }}
                            <span v-if="iindex !== certificate.length - 1">hoặc</span>
                          </span>
                            hoặc tương đương
                        </li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <th class="conditions">Điều kiện khác</th>
                    <td>
                      <v-runtime-template :template="`<div>${items.conditions_apply}</div>`"></v-runtime-template>
                    </td>
                  </tr>

                  <tr>
                    <th class="numbers">Địa điểm làm việc</th>
                    <td class="white-space-pre-line word-break-break-all">
                      {{ items.address_work }}
                    </td>
                  </tr>

                  <tr>
                    <th class="time-work">Thời gian làm việc</th>
                    <td>
                      <v-runtime-template :template="`<div>${items.time_work}</div>`"></v-runtime-template>
                    </td>
                  </tr>

                  <tr>
                    <th class="welfare-regime">
                      Phúc lợi
                    </th>
                    <td>
                      <v-runtime-template :template="`<div>${items.welfare_regime}</div>`"></v-runtime-template>
                    </td>
                  </tr>

                  <!--<tr>
                    <th class="expected">
                      {{ $t('job_detail.overtime') }}
                    </th>
                    <td class="white-space-pre-line">
                      {{ items.overtime }}
                    </td>
                  </tr>-->
                </table>
              </el-tab-pane>
              <el-tab-pane label="Lộ trình của bạn" name="second">
                <h3 class="fw-bold mt-4 mb-4">Đánh giá độ phù hợp:</h3>
                <el-table :data="matchingPointData" style="width: 100%">
                  <el-table-column prop="jobRequirement" label="Yêu cầu" :min-width="40">
                    <template v-if="scope.row" slot-scope="scope">
                      <span v-if="scope.row.jobRequirement.type === 'Certificate'">
                        Đạt chứng chỉ
                        <span v-for="(iitem, iindex) in scope.row.jobRequirement.requirements" :key="iindex">
                          {{ iitem.name }}
                        <span v-if="iindex !== scope.row.jobRequirement.requirements.length - 1">hoặc</span>
                        </span>
                          hoặc tương đương
                      </span>
                      <span v-else-if="scope.row.jobRequirement.type === 'Major'">
                        Tốt nghiệp đại học
                        <!-- <span v-if="scope.row.jobRequirement.requirements.length">
                          <span v-for="(college, cindex) in scope.row.jobRequirement.requirements" :key="cindex">
                            {{ college.name }}
                            <span v-if="cindex !== scope.row.jobRequirement.requirements.length - 1" class="fw-bold">hoặc</span>
                          </span>
                        </span> -->
                          chuyên ngành
                        <span v-for="(iitem, iindex) in scope.row.jobRequirement.requirements" :key="iindex">
                          {{ iitem.name }}
                          <span v-if="iindex !== scope.row.jobRequirement.requirements.length - 1">hoặc</span>
                        </span>
                      </span>
                      <span v-else>
                        <span v-if="scope.row.jobRequirement.level === 'Beginner'">
                          Đã có kinh nghiệm
                        </span>
                        <span v-if="scope.row.jobRequirement.level === 'Intermediate'">
                          Hiểu rõ về
                        </span>
                        <span v-if="scope.row.jobRequirement.level === 'Advanced'">
                          Thành thạo
                        </span>
                        <span v-for="(iitem, iindex) in scope.row.jobRequirement.requirements" :key="iindex">
                          {{ iitem.name }}
                          <span v-if="iindex !== scope.row.jobRequirement.requirements.length - 1">hoặc</span>
                        </span>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="userProfile" label="Profile của bạn" :min-width="40">
                    <template v-if="scope.row" slot-scope="scope">
                      <div v-if="scope.row.userProfile.length">
                        <div v-for="(profile, index) in scope.row.userProfile" :key="index">
                          <span v-if="profile.type === 'Certificate'">
                            Đạt chứng chỉ {{ scope.row.userProfile.certificate.name }}
                          </span>
                          <span v-if="profile.type === 'Major'">
                            Tốt nghiệp đại học chuyên ngành {{ profile.name }}
                          </span>
                          <span v-else>
                            <span v-if="profile.level === 'Beginner'">
                              Đã có kinh nghiệm
                            </span>
                            <span v-if="profile.level === 'Intermediate'">
                              Hiểu rõ về
                            </span>
                            <span v-if="profile.level === 'Advanced'">
                              Thành thạo
                            </span>
                            <span>{{ profile.name }}</span>
                          </span>
                        </div>
                      </div>
                      <div v-else>
                        Không
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="matchingPoint" label="Điểm đánh giá" :min-width="20">
                    <template v-if="scope.row" slot-scope="scope">
                      {{ Math.round(scope.row.matchingPoint / items.job_point * 100) }}
                    </template>
                  </el-table-column>
                </el-table>
                <h3 class="mb-2 mt-4 fw-bold">Lộ trình đề xuất bởi hệ thống để bạn đạt 100 điểm phù hợp: </h3>
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
                                    {{ data.title }} ({{ data.timeCost }} tiếng)
                                </div>
                                <div
                                        class="col-2 mid"
                                        style="text-align: end; padding-right: 30px"
                                >
                                    <img
                                            src="../../../assets/images/users/draft/plus.svg"
                                            alt=""
                                            :class="{ rotated: data.isShown }"
                                    />
                                </div>
                            </div>
                          </button>
                        </p>
                        <div :id="data.class" class="collapse">
                          <div class="card card-body text-start">
                            <ul>
                              <li v-for="(content, index) in data.modules" :key="index">{{ content.name }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="mb-2 mt-4"><span class="fw-bold">Thời gian đào tạo dự kiến: </span><span>2 tháng / ~ 2 tiếng / ngày</span></h3>
                  <h3 class="mb-2 mt-4"><span class="fw-bold">Thời gian đào tạo tối đa: </span><span>3 tháng</span></h3>
                </div>
              </el-tab-pane>
            </el-tabs>

          </div>
        </div>
        <div class="col-sm-12 col-md-8 offset-md-4">
          <div class="propose">

            <div class="propose-job">
              <h4>{{ $t('job_detail.proposed_work') }}</h4>
              <div class="see-more" @click="seeMore">
                {{ $t('job_detail.more') }}
                <img src="../../../assets/images/users/ic_arrow-right.svg" alt=""/>
                <img
                  src="../../../assets/images/users/ic_arrow-right.svg"
                  alt=""
                  style="margin-left: -6px"
                />
              </div>
            </div>
            <h4
              v-if="proposed_job.length === 0"
              class="text-center mt-4"
            >
              {{ $t('general.noResult') }}
            </h4>
            <div v-for="(job, i) in proposed_job" :key="job.id">
              <div
                v-if="$moment().isSameOrBefore(job.date_end, 'day')"
                class="box-content-propose"
                :class="{
                  'box-content-propose-last-item': i === proposed_job.length - 1
                }"
              >
                <div class="image-content">
                  <img
                    v-if="job.image_job"
                    :src="url_api_file + job.image_job"
                    alt=""
                    width="330px"
                    height="220px"
                    class="cursor-pointer job-ima"
                    @click="routeToJobDetailPage(job)"
                  />
                  <img
                    v-else-if="job.default_image"
                    :src="require(`@/assets/images/users/draft/career/` + job.default_image)"
                    alt="" width="330px"
                    height="220px"
                    class="cursor-pointer job-ima"
                    @click="routeToJobDetailPage(job)"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/images/users/draft` + homeCareers[(job.career - 1)].image)"
                    alt=""
                    width="330px"
                    height="220px"
                    class="cursor-pointer job-ima"
                    @click="routeToJobDetailPage(job)"
                  />
                  <img
                    v-if="job.favorites.length != 0"
                    class="heart"
                    src="../../../assets/images/users/draft/red-heart.svg"
                    alt="heart"
                    @click="deleteFavoriteJobs(job.favorites[0].id)"
                  />
                  <img
                    v-else
                    class="heart"
                    src="../../../assets/images/users/draft/heart.svg"
                    alt="heart"
                    @click="postFavoriteJobs(job.id)"
                  />
                </div>
                <div class="main-content">
                  <h4 data-bs-toggle="tooltip"
                      :title="language == 'jp' ? job.title : job.title_vi"
                  >
                    <a
                      :href="localePath(`/jobs/detail/${job.slug}`, $i18n.locale)"
                      style="text-decoration: none; color: inherit"
                      @click.prevent="routeToJobDetailPage(job)"
                    >
                      {{ language == 'jp' ? job.title : job.title_vi }}
                    </a>
                  </h4>
                  <div class="moneys d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/icon_money_jp_red.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{
                    job.salary_min != 0
                    ? Math.ceil(job.salary_min)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' -'
                    : $t('general.upto')
                    }}
                    {{
                    Math.ceil(job.salary_max)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }}
                  </div>
                  <div class="maps d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/icon_map_red.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ $t(provinces[job.province_id]) }}
                  </div>
                  <div v-if="language == 'vn'" class="time d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ $moment(items.date_start).format('DD/MM/YYYY') }} - {{
                    $moment(items.date_end).format('DD/MM/YYYY') }}
                  </div>
                  <div v-else class="time d-flex align-items-center">
                    <img
                      src="../../../assets/images/users/draft/red_calendar.svg"
                      alt=""
                      width="18px"
                      height="18px"
                    />
                    {{ job.date_start.replaceAll('-', '/') }} - {{ job.date_end.replaceAll('-', '/') }}
                  </div>
                  <div class="workplace d-flex flex-wrap">
                    <div v-if="job.form_recruitment !== 5" class="staff">
                      {{ getFormRecruitment(job.form_recruitment) }}
                    </div>
                    <div
                      v-if="job.career !== careers.length"
                      class="nursing"
                    >
                      {{ $t(careers[job.career - 1]) }}
                    </div>
                  </div>
                  <!-- <div class="d-flex flex-wrap">
                    <div
                      v-for="(stay_status, index) in job.status_stay.split(',')"
                      v-show="indexCon.includes(index) || showByIndex.includes(i)"
                      :key="index"
                      class="skill m-skill"
                    >
                      {{ $t(status_stay[parseInt(stay_status)]) }}
                    </div>
                    <div v-if="job.status_stay.split(',').length > 3 && !showByIndex.includes(i)"
                         class="toggleStatusMini" @click="toggleStatus(i)">
                      {{ more }}
                      <img src="../../../assets/images/users/icon_more.svg" alt="">
                    </div>
                    <div v-if="job.status_stay.split(',').length > 3 && showByIndex.includes(i)"
                         class="toggleStatusMini" @click="toggleStatus(i)">
                      {{ collapse }}
                      <img src="../../../assets/images/users/icon_collapse.svg" alt="">
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <StatusStayInfoModal/>
        <FbCustomerChat
          :page-id="pageId"
        />
        <PageView :path-page="$nuxt.$route.path"></PageView>
      </div>
    </div>


  </main>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import { mapActions, mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import theProvinces from '~/constants/provinces'
import theCareers from '~/constants/careers'
import theHomeCareers from '~/constants/homeCareers'
import ApplyForm from '~/components/modal/ApplyForm'
import StatusStayInfoModal from '~/components/modal/StatusStayInfoModal'
import FbCustomerChat from '~/components/FbCustomerChat'
import PageView from '~/components/PageView'

export default {
  name: 'JobDetail',
  components: {
    ApplyForm,
    StatusStayInfoModal,
    FbCustomerChat,
    PageView,
    VRuntimeTemplate
  },
  layout: 'authUnrequired',
  data() {
    return {
      datas: [
          {
              value: 1,
              title: '1. Sử dụng "Shuu Navi" có mất phí gì không?',
              class: 'about-company',
              isShown: false,
              content: [
                  'Bạn sẽ không mất bất kì chi phí nào cả. Bạn có thể tìm kiếm công việc miễn phí trên Shuu Navi.'
              ],
          },
          {
              value: 2,
              title: '2. Tôi có thể thay đổi tư cách lưu trú của mình từ kỹ năng thực tập sang kỹ năng đặc định được không?',
              class: 'about-cv',
              isShown: false,
              content: [
                  'Nếu bạn đã hoàn thành chương trình thực tập sinh kỹ năng số 2 hoặc số 3 thì bạn có thể chuyển sang kỹ năng đặc định.',
                  'Ngoài ra cũng có một lộ trình để bạn đổi tư cách lưu trú đó là sau khi được tạm thời cấp phép hoạt động đặc định 4 tháng thì có thể chuyển đổi sang tư cách lưu trú kỹ năng đặc định.'
              ]
          },
          {
              value: 3,
              title: '3. Tôi muốn làm việc trong một lĩnh vực khác với lĩnh vực đào tạo thực tập sinh kỹ năng. Tôi có phải làm bài kiểm tra kỹ năng không?',
              class: 'about-ai-match',
              isShown: false,
              content: [
                  'Bạn có thể làm việc sau khi được cho phép hoạt động đặc định (1 năm). Tuy nhiên, bạn phải vượt 	qua kỳ thi kỹ năng đặc định của nghề nghiệp mà bạn làm việc trong 1 năm đó. Sau khi vượt qua kỳ thi, bạn có thể chuyển sang kỹ năng đặc định.',
                  'Nếu bạn đỗ kỳ thi kỹ năng đặc định, bạn có thể đổi sang kỹ năng đặc định ngay lập tức.'
              ]
          },
          {
              value: 4,
              title: '4. Tôi đang làm việc với tư cách lưu trú kỹ năng đặc định. Vậy tôi có thể làm việc cho một công ty khác không?',
              class: 'about-vietnam-companies',
              isShown: false,
              content: [
                  'Trong trường hợp bạn muốn chuyển việc với tư cách lưu trú kỹ năng đặc định, bạn cần phải làm đơn xin chuyển đổi kỹ năng đặc định. Bạn có thể làm việc sau khi được cấp phép.'
              ]
          },
          {
              value: 5,
              title: '5. Tôi có tư cách lưu trú ngành nghề Kỹ thuật - Nhân văn - Quốc tế. Vậy tôi có thể làm những công việc gì?',
              class: 'about-visa',
              isShown: false,
              content: [
                  'Bạn có thể làm các công việc như lập trình viên, thông dịch viên, kỹ sư cơ khí,...'
              ]
          },
          {
              value: 6,
              title: '6. Tư cách lưu trú của tôi có cần trùng khớp với tư cách lưu trú được nêu trong yêu cầu tuyển dụng hay không?',
              class: 'about-what',
              isShown: false,
              content: [
                  'Nếu tư cách lưu trú của bạn không trùng với tư cách lưu trú được nêu trong yêu cầu tuyển dụng thì bạn cần làm đơn xin chuyển đổi tư cách lưu trú.'
              ]
          },
          {
              value: 7,
              title: '7. Tôi không nhận được phản hồi từ phía nhà tuyển dụng. Vậy tôi nên làm gì?',
              class: 'about-which',
              isShown: false,
              content: [
                  'Chúng tôi thành thật xin lỗi tuy nhiên chúng tôi không thể nắm bắt được tình hình tuyển chọn của các công ty. Vì vậy xin vui lòng chủ động liên hệ với phía nhà tuyển dụng.'
              ]
          },
          {
              value: 8,
              title: '8. Có thể hủy đơn đăng ký xin việc không?',
              class: 'about-none',
              isShown: false,
              content: [
                  'Chúng tôi không thể hủy đơn đăng ký xin việc của bạn.',
                  'Nếu bạn muốn hủy đơn đăng ký xin việc, vui lòng liên hệ trực tiếp với nhà tuyển dụng.'
              ]
          },
      ],
      tabModel: 'first',
      checkApply: true,
      isShowAlertLogin: true,
      url_api_file: process.env.URL_FILE,
      items: {},
      company_name: '',
      manager_name: '',
      number_members: '',
      founded_year: '',
      career: '',
      link_website: '',
      link_facebook: '',
      logo: '',
      provinces: [],
      careers: [],
      homeCareers: theHomeCareers,
      defaultCareerImageName: '',
      proposed: {},
      language: 'jp',
      status_stay: [],
      proposed_job: [],
      pageId: '',
      hidePage: true,
      error: '',
      showPrimaryJobStatusStay: false,
      showByIndex: [],
      isFav: false,
      indexCon: [0, 1, 2],
      more: 'もっと見る',
      collapse: '元に戻す',
      isEnableLikeOrUnlikeClick: true,
      regionId: 0,
      company_id: 0,
      matchingPointData: [],
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

  watch: {
    '$i18n.locale': {
      handler(newVal, oldVal) {
        if (newVal === 'vi') {
          this.language = 'vn'
        } else if (newVal === 'ja') {
          this.language = 'jp'
        }
        if (this.isAuthenticated) {
          this.getTranslateJobDetail(newVal)
        }
      },
      deep: true
    }
  },

  mounted() {
    if (this.$nuxt.context.from) {
      window.location.reload();
    }
  },

  created() {
    if (this.isAuthenticated) {
      this.getTranslateJobDetail(this.$i18n.locale)
    }
    else {
      this.hidePage = false
    }
  },

  methods: {
    // defaultCareerImageName() {
    //   return this.homeCareers.filter(item => item.name === this.careers[this.career - 1])[0].image
    // },

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

    onChangeLocaleInContentJob(languageOrLocale) {
      if (languageOrLocale === 'jp' || languageOrLocale === 'ja') {
        this.$i18n.locale = 'ja'
        this.language = 'jp'
      }

      if (languageOrLocale === 'vn' || languageOrLocale === 'vi') {
        this.$i18n.locale = 'vi'
        this.language = 'vn'
      }

      history.replaceState({}, null, this.localePath(this.$route.path, this.$i18n.locale))
    },

    getTranslateJobDetail(languageOrLocale) {
      this.getDetailJob()
    },

    async getDetailJob() {
      this.isShowAlertLogin = false
      const { data } = await this.$repositories.jobs.getJobs(
        this.$route.params.slug
      )

      if (!data.errors) {
        this.checkApply = data.checkApply
        this.items = data
        this.datas = data.needToLearnCourses.map((item, index) => {
          return {
            ...item,
            isShown: false,
            class: 'about-' + index,
          }
        })
        this.matchingPointData = data?.job_matching_data
        // this.company_id = data.company.id
        // this.company_name = data.company.company_name
        // this.manager_name = data.company.manager_name
        // this.number_members = data.company.number_members
        // this.founded_year = data.company.founded_year
        // this.career = data.career
        // this.link_website = data.company.link_website
        // this.link_facebook = data.company.link_facebook
        // this.pageId = data.company.page_id
        // this.logo = data.company.logo
        this.provinces = theProvinces
        this.careers = theCareers
        this.more = 'もっと見る'
        this.collapse = '元に戻す'
        this.hidePage = false
        this.proposed = {
          id: data.id,
          career: data.career,
//          province_id: data.province_id,
          salary_min: data.salary_min,
          salary_max: data.salary_max,
          limit: 3,
        }
        if (this.items.favorites && this.items.favorites.length !== 0) {
          this.isFav = true
        }
        else {
          this.isFav = false
        }
        this.getProposedJobs(this.proposed)
      } else {
        this.hidePage = true
        this.error = 'Bạn phải tạo CV để xem chi tiết job!'
      }
    },

    async getProposedJobs(proposed) {
      // const { data } = await this.$repositories.jobs.getProposedJobs(proposed)
      // this.proposed_job = data
    },
    async postFavoriteJobs(payload) {
      if (this.isEnableLikeOrUnlikeClick) {
        this.isEnableLikeOrUnlikeClick = false
        try {
          await this.$repositories.jobs
            .postFavoriteJobs({
              job_id: payload,
            })
            .then((res) => {
              if (res.status === 201) {
                this.$toast.success(this.$t('general.addJobToFavoriteListSuccess'))
                this.isFav = true
                this.items.favorites.push(res.data)
              } else {
                this.$toast.error(this.$t('general.inactive'))
              }
              this.isEnableLikeOrUnlikeClick = true
            })
        } catch (e) {
          this.errors = e.response.data.errors
          this.isEnableLikeOrUnlikeClick = true
        }
        this.getProposedJobs(this.proposed)
      }
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
                this.isFav = false
                this.items.favorites.length = 0
              } else {
                this.$toast.error(this.$t('general.inactive'))
              }
              this.isEnableLikeOrUnlikeClick = true
            })
        } catch (e) {
          this.errors = e.response.data.errors
          this.isEnableLikeOrUnlikeClick = true
        }
        this.getProposedJobs(this.proposed)
      }
    },
    ...mapActions({
      dispatchSetCareer: 'detail-job/setCareer',
//      dispatchSetProvinceId: 'detail-job/setProvinceId',
    }),
    seeMore() {
      this.dispatchSetCareer(this.career ? this.career : null)
//      this.dispatchSetProvinceId(
//        this.items.province_id ? this.items.province_id : null
//      )
//        this.getRegionId(this.items.province_id);
      const q = {
        career: this.career ? this.career : null,
          salary_min: this.items.salary_min ? this.items.salary_min : null,
          salary_max: this.items.salary_max ? this.items.salary_max : null,
//        province_id: this.items.province_id ? this.items.province_id : null,
//        region_id: this.regionId ? this.regionId : null
      }

      this.$nuxt.$router.push(this.localePath({path: '/jobs', query: q}, this.$i18n.locale))
    },
    removeVal(val) {
      const index = this.showByIndex.indexOf(val)
      if (index !== -1) {
        this.showByIndex.splice(index, 1)
      }
    },
    toggleStatus(index) {
      if (this.showByIndex.includes(index)) {
        this.removeVal(index)
      }
      else {
        this.showByIndex.push(index)
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
      const jobDetailRoute = `/jobs/detail/${job.id}`
      this.$repositories.jobs.increaseCountClick({
        path: jobDetailRoute,
        job_id: job.id
      })
      this.$router.push(this.localePath(jobDetailRoute, this.$i18n.locale))
    },

    handleApplySuccessEvent() {
      this.checkApply = true
    },

    shownClass(data) {
      data.isShown = !data.isShown
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../styles/pages/users/detail-jobs.scss';
@import "../../../styles/components/modal/_apply_job_done_modal.scss";
.jobRequirement.requirements {
  ul {
    margin-bottom: 0 !important;
  }
}
.learning-route {
  p {
    margin-bottom: 0;
  }
  button {
      border-radius: 20px !important;
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
      color: #606060;
      font-size: 16px;
      border-radius: 20px;
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
    border-radius: 20px;
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
