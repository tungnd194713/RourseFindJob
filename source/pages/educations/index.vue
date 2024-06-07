<template>
  <main class="container-maintain education-index">
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
                    Yêu cầu hoàn thành-  <span class="fw-bold"> 16/07/2024</span>
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
                      <button v-if="data.is_unlocked" class="btn btn-primary" type="button" data-bs-toggle="collapse"
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
                                {{ data.course.title }}
                                <span>
                                  <img v-if="data.is_finished" src="../../assets/images/users/draft/checked-icon.png" alt="" width="18" height="18">
                                </span>
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
                      <button v-else class="btn btn-primary" type="button"
                        :class="{'font-vi': $i18n.locale === 'vi', 'font-ja': $i18n.locale === 'ja'}"
                        style="color: gray !important"
                        @click="showUnlockModal(data)">
                        <div class="row">
                            <div
                                    class="col-10 button-title fw-bold"
                                    style="text-align: start; padding-left: 30px"
                            >
                                {{ data.course.title }}
                            </div>
                            <div
                                    class="col-2 mid"
                                    style="text-align: end; padding-right: 30px"
                            >
                                <img
                                        src="../../assets/images/users/ic_lock.svg"
                                        alt=""
                                />
                            </div>
                        </div>
                      </button>
                    </p>
                    <div :id="data.class" class="collapse">
                      <div class="card card-body text-start">
                        <ul class="course-module">
                          <div v-if="data.mentor_shifts.length">
                            <li v-for="(shift, index) in data.mentor_shifts" :key="shift.id" class="d-flex justify-content-around" style="background: white; border-bottom: 1px solid gray" @click="showMentor(shift)">
                              <div>
                                {{ index + 1 }}
                              </div>
                              <div>
                                {{ shift.mentor.mentor_name }}
                              </div>
                              <div>
                                {{ shift.shift_days ? convertDayOfWeekEnglishToVietnamese(Object.keys(shift.shift_days)[0]) : '' }}
                              </div>
                              <div v-if="shift.shift_days">
                                {{ decimalToHourMinute(shift.shift_days[Object.keys(shift.shift_days)[0]].start_hour) }} ~ {{ decimalToHourMinute(shift.shift_days[Object.keys(shift.shift_days)[0]].end_hour) }}
                              </div>
                              <div style="min-width: 120px">
                                {{ mentorShiftStatus[shift.status - 1] }}
                              </div>
                            </li>
                          </div>

                          <li v-if="!data.is_finished" class="text-center" style="background: white" @click="openRequestMentorModal(data)">
                            + Yêu cầu mentor
                          </li>
                          <li v-for="(content, index) in data.course.modules" :key="index" class="d-flex justify-content-between" @click="$router.push(localePath(`/educations/courses/${data.course.id || data.course._id}/modules/${content.id || content._id}`, $i18n.locale))">
                            <span>{{ content.name }}</span>
                            <span>
                              <img v-if="isModuleFinish(content.id || content._id, data)" src="../../assets/images/users/draft/checked-icon.png" alt="" width="18" height="18">
                            </span>
                          </li>
                          <li v-for="(test, index) in data.tests" :key="index" class="d-flex justify-content-between align-items-center" @click="$router.push(localePath(`/educations/courses/${data.course.id || data.course._id}/tests/${test.test.id || test.test._id}`, $i18n.locale))">
                            <div>
                              <div>Bài test {{ index + 1 }}: {{ test.test.name }} ({{ test.test.questions.length }} câu hỏi)</div>
                              <div v-if="test.isFinished">Hoàn thành lúc: {{ test.answerSheet.finishedAt.split('T')[0] }} {{ test.answerSheet.finishedAt.split('T')[1].substring(0, test.answerSheet.finishedAt.split('T')[1].length - 1)  }}</div>
                              <div v-if="test.isFinished">Điểm số: {{ test.answerSheet.mark / test.answerSheet.choices.length * 100 }}% - {{ test.answerSheet.mark }} / {{ test.answerSheet.choices.length }} câu trả lời đúng</div>
                            </div>
                            <span>
                              <img v-if="test.isFinished" src="../../assets/images/users/draft/checked-icon.png" alt="" width="18" height="18">
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
    <button
      ref="showUnlockModalBtn"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#unlockModal"
    />
    <button
      ref="showRequestMentorModal"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#requestMentorModal"
    />
    <button
      ref="showMentorModal"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#mentorModal"
    />
    <div id="mentorModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <div></div>
            <img
              ref="closeUnlockCancelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            >
          </div>
          <div class="modal-body">
            <h1 class="text-center modal-body-text">
              Thông tin mentor
            </h1>
            <div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Tên mentor:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ showingMentor.mentor_name }}
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Số zalo:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ showingMentor.zalo_number }}
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Link facebook:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <a>
                    {{ showingMentor.facebook_link }}
                  </a>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Link X:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <a>
                    {{ showingMentor.twitter_link }}
                  </a>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Giới thiệu bản thân:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ showingMentor.biography }}
                  </h5>
                </div>
              </div>
            </div>
            <!-- <h3 class="text-center modal-body-text">
              Để mở khóa khóa học này cần <span class="fw-bold">{{ unlockingCourse.point_cost }}</span> point!
            </h3>
            <h3 class="text-center modal-body-text">
              Bạn có chắc muốn mở khóa?
            </h3> -->
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <!-- <button type="button" class="btn btn-danger rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">Hủy</button> -->
            <button v-if="!checkUserRating(showingMentor.ratings, showingMentorShift.course)" type="button" class="btn btn-success rounded-pill w-20 btn-p" @click="openRatingDialog">Đánh giá</button>
            <button v-else type="button" class="btn btn-secondary rounded-pill w-20 btn-p" @click="openRatingDialog">Đã đánh giá</button>
          </div>
        </div>
      </div>
      <el-dialog title="Đánh giá mentor" :modal-append-to-body="false" :visible.sync="ratingDialog" width="30%" class="rating-mentor">
        <div class="d-flex justify-content-center">
          <h1>
            <b>{{ showingMentor.mentor_name }}</b>
          </h1>
        </div>
        <div class="d-flex justify-content-center mb-5">
          <el-rate
            v-model="rating.rating_star">
          </el-rate>
        </div>
        <el-input v-model="rating.rating_content" type="textarea" placeholder="Viết đánh giá"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ratingDialog = false">Hủy bỏ</el-button>
          <el-button v-if="checkUserRating(showingMentor.ratings, showingMentorShift.course)" type="danger" @click="removeRating">Xóa đánh giá</el-button>
          <el-button type="primary" @click="submitRating">{{ checkUserRating(showingMentor.ratings, showingMentorShift.course) ? 'Cập nhật đánh giá' : 'Đánh giá' }}</el-button>
        </div>
      </el-dialog>
    </div>
    <div id="unlockModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <div></div>
            <img
              ref="closeUnlockCancelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            >
          </div>
          <div class="modal-body">
            <h1 class="text-center modal-body-text">
              Mở khóa khóa học
            </h1>
            <div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Tên khóa học:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ unlockingCourse.title }}
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Hỗ trợ học bổng:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ jobEducation.scholarship }}%
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Point tiêu tốn:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    <span v-if="jobEducation.scholarship" style="text-decoration: line-through; color: gray">{{ unlockingCourse.point_cost }}</span>
                    <span>{{ Math.round(unlockingCourse.point_cost * (100 - jobEducation.scholarship) / 100) }}</span>
                    <span>point</span>
                  </h5>
                </div>
              </div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold label-form-cv">
                    Yêu cầu hỗ trợ từ mentor:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 form-cv text-left label-form-group">
                  <div class="d-flex align-items-start">
                    <input
                      id="cvInSystem"
                      v-model="unlockData.request_mentor"
                      type="radio"
                      class="createCV"
                      name="drone"
                      value="0"
                    />
                    <label for="cvInSystem">Không</label>
                  </div>

                  <div style="margin-top: 12px" class="d-flex align-items-center form-cvUpload">
                    <input
                      id="cvUpload"
                      v-model="unlockData.request_mentor"
                      type="radio"
                      class="upload"
                      value="1"
                      name="drone"
                    />
                    <label for="cvUpload">Có</label>
                  </div>
                </div>
              </div>
              <div v-if="unlockData.request_mentor == 1" class="row form-group">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Mentors:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9">
                  <div v-for="mentor in shownMentors" :key="mentor.id || mentor._id" class="mb-2 d-flex align-items-center">
                    <div style="margin-right: 12px">
                      {{ mentor.mentor_name }} | {{ mentor.day }} {{ mentor.start_hour }} ~ {{ mentor.end_hour }}
                    </div>
                    <el-button class="py-2 px-2" type="warning" @click="removeMentor(mentor)">Xóa</el-button>
                  </div>
                  <el-button type="primary" @click="mentorDialog = true">
                    Thêm
                  </el-button>
                </div>
              </div>
            </div>
            <!-- <h3 class="text-center modal-body-text">
              Để mở khóa khóa học này cần <span class="fw-bold">{{ unlockingCourse.point_cost }}</span> point!
            </h3>
            <h3 class="text-center modal-body-text">
              Bạn có chắc muốn mở khóa?
            </h3> -->
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-danger rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-success rounded-pill w-20 btn-p" data-bs-dismiss="modal" @click="unlockCourse()">Mở khóa</button>
          </div>
        </div>
      </div>
      <el-dialog title="Tìm mentor" :modal-append-to-body="false" :visible.sync="mentorDialog" width="80%">
        <div style="padding: 16px">
          <h3>Tìm theo ca làm việc: </h3>
          <div class="d-flex">
            <el-select v-model="findMentorData.day" style="margin-right: 20px" placeholder="Chọn ngày trong tuần">
              <el-option v-for="day in daysOfWeek" :key="day.value" :label="day.label" :value="day.value"> </el-option>
            </el-select>
            <el-time-select
              v-model="findMentorData.start_hour"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: findMentorData.end_hour ? findMentorData.end_hour : '23:30'
              }"
              style="margin-right: 20px"
              placeholder="Chọn giờ bắt đầu">
            </el-time-select>
            <el-time-select
              v-model="findMentorData.end_hour"
              :picker-options="{
                start: findMentorData.start_hour ? findMentorData.start_hour : '00:00',
                step: '00:30',
                end: '23:30'
              }"
              style="margin-right: 20px"
              placeholder="Chọn giờ kết thúc">
            </el-time-select>
            <el-select v-model="searchStar" style="margin-right: 20px" placeholder="Chọn đánh giá tối thiểu">
              <el-option v-for="star in [0, 1, 2, 3, 4, 5]" :key="star" :label="star + ' sao'" :value="star"> </el-option>
            </el-select>
            <el-button type="primary" @click="findMentor()">
              Tìm
            </el-button>
          </div>
          <el-table :data="mentorList" stripe style="width: 100%;">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column prop="mentor_name" label="Tên mentor"></el-table-column>
            <el-table-column prop="facebook_link" width="200px" label="Kênh liên lạc chính"></el-table-column>
            <el-table-column prop="numModules" label="Đánh giá">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.ratings" class="d-flex">
                    {{ scope.row.avgRating }}
                    <i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"></i>
                    ({{ scope.row.ratings.length }} lượt đánh giá)
                  </div>
                  <div v-else>Chưa có đánh giá</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="point_cost" label="Số khóa học đã nhận">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.shifts ? scope.row.shifts.length : 0 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column>
            <template slot-scope="scope">
              <div>
                <el-button type="primary" @click="openRequestMentorDialog(scope.row)">
                  Thêm
                </el-button>
              </div>
            </template>
            </el-table-column>
          </el-table>
              <!-- <el-pagination
                  style="margin: 8px 0"
        background
        layout="prev, pager, next"
        @current-change="getCourseData"
        :current-page.sync="coursePage"
        :page-size="10"
        :total="courseTotalResults">
      </el-pagination> -->
        </div>
        <el-dialog
          width="50%"
          title="Yêu cầu mentor"
          :visible.sync="requestHourDialog"
          append-to-body>
          <div v-if="requestingMentor.weekdays">
            <el-row :gutter="4" class="mb-4">
              <el-col :span="6">Mentor: </el-col>
              <el-col :span="18"><b>{{ requestingMentor.mentor_name }}</b></el-col>
            </el-row>
            <el-row :gutter="4" class="mb-4">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  Ngày trong tuần
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <el-select v-model="mentorData.day" style="margin-right: 20px" placeholder="Chọn ngày trong tuần">
                    <el-option v-for="day in filteredDays(Object.keys(requestingMentor.weekdays))" :key="day.value" :label="day.label" :value="day.value"> </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="mentorData.day" :gutter="4" class="mb-4">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  Giờ bắt đầu
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <el-time-select
                    v-model="mentorData.start_hour"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30',
                      minTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].start_hour),
                      maxTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].end_hour),
                    }"
                    style="margin-right: 20px"
                    placeholder="Chọn giờ bắt đầu">
                  </el-time-select>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="mentorData.day" :gutter="4" class="mb-4">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  Giờ kết thúc
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <el-time-select
                    v-model="mentorData.end_hour"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30',
                      minTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].start_hour),
                      maxTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].end_hour),
                    }"
                    style="margin-right: 20px"
                    placeholder="Chọn giờ kết thúc">
                  </el-time-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addMentor(requestingMentor)">Yêu cầu mentor</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
    <div id="requestMentorModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <div></div>
            <img
              ref="closeUnlockCancelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            >
          </div>
          <div class="modal-body">
            <h1 class="text-center modal-body-text">
              Yêu cầu mentor
            </h1>
            <div>
              <div class="row form-group mb-3">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Tên khóa học:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9 text-left label-form-group">
                  <h5>
                    {{ unlockingCourse.title }}
                  </h5>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-sm-4 col-lg-4 col-xl-3 text-left label-form-group">
                  <h5 class="fw-bold">
                    Mentors:
                  </h5>
                </div>
                <div class="col-sm-8 col-lg-8 col-xl-9">
                  <div v-for="mentor in shownMentors" :key="mentor.id || mentor._id" class="mb-2 d-flex align-items-center">
                    <div style="margin-right: 12px">
                      {{ mentor.mentor_name }} | {{ mentor.day }} {{ mentor.start_hour }} ~ {{ mentor.end_hour }}
                    </div>
                    <el-button class="py-2 px-2" type="warning" @click="removeMentor(mentor)">Xóa</el-button>
                  </div>
                  <el-button type="primary" @click="requestMentorDialog = true">
                    Thêm
                  </el-button>
                </div>
              </div>
            </div>
            <!-- <h3 class="text-center modal-body-text">
              Để mở khóa khóa học này cần <span class="fw-bold">{{ unlockingCourse.point_cost }}</span> point!
            </h3>
            <h3 class="text-center modal-body-text">
              Bạn có chắc muốn mở khóa?
            </h3> -->
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-danger rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-success rounded-pill w-20 btn-p" data-bs-dismiss="modal" @click="requestMentor">Yêu cầu</button>
          </div>
        </div>
      </div>
      <el-dialog title="Tìm mentor" :modal-append-to-body="false" :visible.sync="requestMentorDialog" width="80%">
        <div style="padding: 16px">
          <h3>Tìm theo ca làm việc: </h3>
          <div class="d-flex">
            <el-select v-model="findMentorData.day" style="margin-right: 20px" placeholder="Chọn ngày trong tuần">
              <el-option v-for="day in daysOfWeek" :key="day.value" :label="day.label" :value="day.value"> </el-option>
            </el-select>
            <el-time-select
              v-model="findMentorData.start_hour"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: findMentorData.end_hour ? findMentorData.end_hour : '23:30'
              }"
              style="margin-right: 20px"
              placeholder="Chọn giờ bắt đầu">
            </el-time-select>
            <el-time-select
              v-model="findMentorData.end_hour"
              :picker-options="{
                start: findMentorData.start_hour ? findMentorData.start_hour : '00:00',
                step: '00:30',
                end: '23:30'
              }"
              style="margin-right: 20px"
              placeholder="Chọn giờ kết thúc">
            </el-time-select>
            <el-select v-model="searchStar" style="margin-right: 20px" placeholder="Chọn đánh giá tối thiểu">
              <el-option v-for="star in [0, 1, 2, 3, 4, 5]" :key="star" :label="star + ' sao'" :value="star"> </el-option>
            </el-select>
            <el-button type="primary" @click="findMentor()">
              Tìm
            </el-button>
          </div>
          <el-table :data="mentorList" stripe style="width: 100%;">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column prop="mentor_name" label="Tên mentor"></el-table-column>
            <el-table-column prop="facebook_link" label="Kênh liên lạc chính"></el-table-column>
            <el-table-column prop="numModules" label="Đánh giá">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.ratings" class="d-flex">
                    {{ scope.row.avgRating }}
                    <i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"></i>
                    ({{ scope.row.ratings.length }} lượt đánh giá)
                  </div>
                  <div v-else>Chưa có đánh giá</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="point_cost" label="Số khóa học đã nhận">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.shifts ? scope.row.shifts.length : 0 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column>
            <template slot-scope="scope">
              <div>
                <el-button type="primary" @click="openRequestMentorDialog(scope.row)">
                  Thêm
                </el-button>
              </div>
            </template>
            </el-table-column>
          </el-table>
              <!-- <el-pagination
                  style="margin: 8px 0"
        background
        layout="prev, pager, next"
        @current-change="getCourseData"
        :current-page.sync="coursePage"
        :page-size="10"
        :total="courseTotalResults">
      </el-pagination> -->
        </div>
        <el-dialog
          width="50%"
          title="Yêu cầu mentor"
          :visible.sync="requestHourDialog"
          append-to-body>
          <div v-if="requestingMentor.weekdays">
            <el-row :gutter="4" class="mb-4">
              <el-col :span="6">Mentor: </el-col>
              <el-col :span="18"><b>{{ requestingMentor.mentor_name }}</b></el-col>
            </el-row>
            <el-row :gutter="4" class="mb-4">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  Ngày trong tuần
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <el-select v-model="mentorData.day" style="margin-right: 20px" placeholder="Chọn ngày trong tuần">
                    <el-option v-for="day in filteredDays(Object.keys(requestingMentor.weekdays))" :key="day.value" :label="day.label" :value="day.value"> </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="mentorData.day" :gutter="4" class="mb-4">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  Giờ bắt đầu
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <el-time-select
                    v-model="mentorData.start_hour"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30',
                      minTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].start_hour),
                      maxTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].end_hour),
                    }"
                    style="margin-right: 20px"
                    placeholder="Chọn giờ bắt đầu">
                  </el-time-select>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="mentorData.day" :gutter="4" class="mb-4">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  Giờ kết thúc
                </div>
              </el-col>
              <el-col :span="18">
                <div class="grid-content bg-purple">
                  <el-time-select
                    v-model="mentorData.end_hour"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '23:30',
                      minTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].start_hour),
                      maxTime: decimalToHourMinute(requestingMentor.weekdays[mentorData.day].end_hour),
                    }"
                    style="margin-right: 20px"
                    placeholder="Chọn giờ kết thúc">
                  </el-time-select>
                </div>
              </el-col>
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addMentor(requestingMentor)">Yêu cầu mentor</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import theHomeCareers from '~/constants/homeCareers'
import mentorShiftStatus from '~/constants/mentorShiftStatus'

export default {
  name: 'JobDetail',
  layout: 'authUnrequired',
  data() {
    return {
      mentorShiftStatus,
      datas: [{
        course: {
          modules: [],
        },
        mentor_shifts: [],
        done_modules: [],
      }],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      rating: {
        rating_content: '',
        rating_star: 0,
      },
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
      unlockingCourse: {},
      unlockData: {
        request_mentor: 0,
        mentor_data: [],
      },
      mentorData: {
        day: '',
        start_hour: '',
        end_hour: '',
      },
      findMentorData: {
        day: '',
        start_hour: '',
        end_hour: '',
      },
      mentorDialog: false,
      requestMentorDialog: false,
      daysOfWeek: [
        {
          label: 'Thứ Hai',
          value: 'monday',
        },
        {
          label: 'Thứ Ba',
          value: 'tuesday',
        },
        {
          label: 'Thứ Tư',
          value: 'wednesday',
        },
        {
          label: 'Thứ Năm',
          value: 'thursday',
        },
        {
          label: 'Thứ Sáu',
          value: 'friday',
        },
        {
          label: 'Thứ Bảy',
          value: 'saturday',
        },
        {
          label: 'Chủ Nhật',
          value: 'sunday',
        },
      ],
      mentorList: [],
      shownMentors: [],
      showingMentor: {},
      showingMentorShift: {},
      ratingDialog: false,
      searchStar: '',
      requestingMentor: {},
      requestHourDialog: false,
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
    'unlockData.request_mentor'(newVal, oldVal) {
      if (newVal === '0') {
        this.unlockData.mentor_data = [];
        this.mentorData = {
          day: '',
          start_hour: '',
          end_hour: '',
        }
        this.findMentorData = {
          day: '',
          start_hour: '',
          end_hour: '',
        }
        this.searchStar = ''
      }
    }
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
          if (this.userRoadmap.roadmap_milestone && this.userRoadmap.roadmap_milestone.length) {
            this.userRoadmap.roadmap_milestone.forEach((milestone) => {
              const mentorShifts = [];
              data.mentorShifts.forEach((shift) => {
                if (shift.course === milestone.course._id) {
                  mentorShifts.push(shift)
                }
              })
              milestone.mentor_shifts = [...mentorShifts]
            })
          }
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

    showUnlockModal(data) {
      this.$refs.showUnlockModalBtn.click();
      this.unlockingCourse = data.course
    },

    openRequestMentorModal(data) {
      this.$refs.showRequestMentorModal.click();
      this.unlockingCourse = data.course
    },
    checkUserRating(ratings, course) {
      if (ratings && ratings.length) {
        const rating = ratings.find((item) => item.course === course && (item.user === this.loggedInUser._id || item.user === this.loggedInUser.id));
        if (rating) {
          return rating;
        }
      }
      return false;
    },
    openRatingDialog() {
      this.rating.mentor = this.showingMentor._id || this.showingMentor.id
      this.rating.mentorShift = this.showingMentorShift._id || this.showingMentorShift.id
      this.rating.course = this.showingMentorShift.course
      this.ratingDialog = true
      if (this.showingMentor.ratings && this.showingMentor.ratings.length) {
        const rating = this.checkUserRating(this.showingMentor.ratings, this.showingMentorShift.course);
        if (rating) {
          this.rating.rating_star = rating.rating_star
          this.rating.rating_content = rating.rating_content
        }
      }
    },
    async submitRating() {
      const { data } = await this.$repositories.candidatesApply.addMentorRating(this.rating);
      if (data) {
        this.ratingDialog = false
        this.rating = {
          rating_content: '',
          rating_star: 0,
        }
        const index = this.showingMentor.ratings.findIndex((item) => item.course === this.showingMentorShift.course && (item.user === this.loggedInUser._id || item.user === this.loggedInUser.id));
        if (index !== -1) {
          this.showingMentor.ratings[index].rating_star = data.rating_star
          this.showingMentor.ratings[index].rating_content = data.rating_content
        } else {
          this.showingMentor.ratings.push({
            ...data,
          })
        }
        this.$toast.success('Đã đánh giá mentor!');
      }
    },
    async removeRating() {
      const { data } = await this.$repositories.candidatesApply.addMentorRating({
        ...this.rating,
        is_remove: true,
      });
      if (data) {
        this.ratingDialog = false
        this.rating = {
          rating_content: '',
          rating_star: 0,
        }
        this.getDetailJob()
        const index = this.showingMentor.ratings.findIndex((item) => item.course === this.showingMentorShift.course && (item.user === this.loggedInUser._id || item.user === this.loggedInUser.id));
        if (index !== -1) {
          this.showingMentor.ratings.splice(index, 1);
        }
        this.$toast.success('Đã xoá đánh giá mentor!');
      }
    },
    async unlockCourse() {
      const unlockParams = {
        request_mentor: this.unlockData.request_mentor,
        mentor_data: JSON.stringify(this.unlockData.mentor_data)
      }
      const { data } = await this.$repositories.candidatesApply.unlockCourse(this.unlockingCourse._id || this.unlockingCourse.id, unlockParams);
      if (data) {
        this.getDetailJob();
        this.$toast.success('Đã mở khóa khóa học ' + this.unlockingCourse.title)
        this.$refs.closeUnlockCancelModal.click();
        this.unlockingCourse = {}
      }
    },

    async findMentor() {
      const params = {
        subject: this.unlockingCourse.skill_tags[0]?.skill,
        level: this.convertLevel(this.unlockingCourse.skill_tags[0]?.level),
        ...this.findMentorData,
        avgRating: this.searchStar,
      }
      const { data } = await this.$repositories.mentors.findMentor(params);
      if (data) {
        this.mentorList = [...data]
      }
    },

    async requestMentor() {
      const { data } = await this.$repositories.candidatesApply.requestMentor(this.unlockingCourse._id || this.unlockingCourse.id, { mentor_data: JSON.stringify(this.unlockData.mentor_data) });
      if (data) {
        this.$toast.success('Đã yêu cầu mentors!')
        this.unlockData = {
          request_mentor: 0,
          mentor_data: [],
        }
        this.shownMentors = []
      }
    },

    convertLevel(level) {
      if (level === 'Beginner') {
        return 1;
      }
      if (level === 'Intermediate') {
        return 2;
      }
      if (level === 'Advanced') {
        return 3;
      }
    },

    openRequestMentorDialog(mentor) {
      this.requestingMentor = mentor
      this.requestHourDialog = true
    },

    filteredDays(days) {
      return this.daysOfWeek.filter((item) => days.includes(item.value))
    },

    addMentor(mentor) {
      this.unlockData.mentor_data.push({
        mentorId: mentor.id || mentor._id,
        weekday: {...this.mentorData}
      })
      this.shownMentors.push({
        ...mentor,
        day: this.daysOfWeek.find((item) => item.value === this.mentorData.day)?.label,
        start_hour: this.mentorData.start_hour,
        end_hour: this.mentorData.end_hour,
      })
      this.mentorData = {
        day: '',
        start_hour: '',
        end_hour: '',
      };
      this.findMentorData = {
        day: '',
        start_hour: '',
        end_hour: '',
      }
      this.requestingMentor = {}
      this.searchStar = ''
      this.mentorList = []
      this.mentorDialog = false;
      this.requestHourDialog = false;
      this.requestMentorDialog = false;
    },

    removeMentor(mentor) {
      const index1 = this.unlockData.mentor_data.findIndex((item) => item.mentorId === mentor.id || item.mentorId === mentor._id);
      if (index1 !== -1) {
        this.unlockData.mentor_data.splice(index1, 1);
      }
      const index2 = this.shownMentors.findIndex((item) => item.id === mentor.id || item._id === mentor._id);
      if (index2 !== -1) {
        this.shownMentors.splice(index1, 1);
      }
    },

    showMentor(shift) {
      this.showingMentor = { ...shift.mentor }
      this.showingMentorShift = { ...shift }
      this.$refs.showMentorModal.click()
    },

    decimalToHourMinute(decimalHour) {
      const hour = Math.floor(decimalHour);
      const minute = Math.round((decimalHour - hour) * 60);
      const hourString = String(hour).padStart(2, '0');
      const minuteString = String(minute).padStart(2, '0');
      return `${hourString}:${minuteString}`;
    },

    convertDayOfWeekEnglishToVietnamese(dayOfWeekEnglish) {
      const daysOfWeekMapping = {
        "monday": "Thứ Hai",
        "tuesday": "Thứ Ba",
        "wednesday": "Thứ Tư",
        "thursday": "Thứ Năm",
        "friday": "Thứ Sáu",
        "saturday": "Thứ Bảy",
        "sunday": "Chủ Nhật"
      };

      const lowercaseDay = dayOfWeekEnglish.toLowerCase();

      return daysOfWeekMapping[lowercaseDay] || dayOfWeekEnglish;
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
.modal-header {
  justify-content: space-between;
}
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
#unlockModal .modal-dialog, #requestMentorModal .modal-dialog, #mentorModal .modal-dialog {
  max-width: 800px;
  .modal-body {
    padding-top: 0 !important;
  }
  a {
    color: #0d6efd;
    text-decoration: underline;
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
.rating-mentor {
  .el-rate__icon {
    font-size: 50px !important;
  }
}
</style>
