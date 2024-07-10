<template>
  <main class="container-maintain">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-sm-12 cv-contain justify-content-center">
          <div class="avt-contain justify-content-center">
            <div
              class="avt justify-content-center profile-image-contain mb-0 align-items-center"
            >
              <div
                v-if="previewProfileImageUrl"
                class="background-profile-image"
                :style="{
                  backgroundImage: previewProfileImageUrl ? `url(${url_file + previewProfileImageUrl})` : ''
                }"
              ></div>
              <img
                v-else
                src="../../assets/images/users/draft/avt.svg"
                alt=""
                class="avt-img"
              />
            </div>
            <div class="name justify-content-center">
              <div class="inner-name">{{ loggedInUser.name }}</div>
            </div>
            <div class="img-input justify-content-center flex-column align-items-center">
              <div class="inner-input upload-avatar-btn">
                <img
                  src="../../assets/images/users/draft/avt-upload.svg"
                  alt=""
                />
                {{ $t('user_profile.upload_profile_image') }}
                <input
                  type="file"
                  name="avatar"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  :title="$t('user_profile.upload_profile_image')"
                  @change="onChangeProfileImage"
                />
              </div>
              <div class="error-text">{{ profileImageErrors[0] }}</div>
            </div>
          </div>
          <!-- <div class="cv-upload-contain">
            <div class="cv-tit">{{ $t('user_profile.upload_cv') }}</div>
            <div class="cv-input-contain">
              <div class="inner-cv">
                <img
                  src="../../assets/images/users/draft/big-avt-upload.svg"
                  alt=""
                />
                <div class="up-text">{{ $t('user_profile.select_file') }}</div>
                <input
                  type="file"
                  name="cv"
                  accept="application/pdf"
                  :title="$t('user_profile.select_file')"
                  @change="onChangeFileCvUpload"
                />
              </div>
            </div>
            <div class="error-text">{{ fileCvUploadErrors[0] }}</div>
            <div
              v-if="candidate.file_cv_upload"
              class="inner-input upload-avatar-btn mt-2 cursor-pointer text-center preview-cv-upload"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="previewCvUpload()"
            >
              {{ $t('user_profile.preview_cv_upload') }}
            </div>
          </div> -->
        </div>
        <div class="col-md-8 col-sm-12 profile-contain">
          <!-- <div class="progress-contain">
            <div class="inner-progress">
              <div class="progress-tit fw-bold">{{ $t('user_profile.complete_information') }}</div>
              <div class="progress-pro">
                <div class="d-flex align-items-center">
                  <div class="start-point"></div>
                </div>
                <div class="progress-group">
                  <div
                    v-for="(item, index) in completePointList"
                    :key="index"
                    class="re-progress"
                  >
                    <div
                      class="progress-point"
                      :class="{
                        'progress-point-complete': completePoint >= item.value
                      }"
                    >
                      <div class="num text-right">{{ item.value }}</div>
                      <div
                        class="point"
                        :class="{
                          'progress-point-complete': completePoint >= item.value
                        }"
                      ></div>
                      <div class="point-tit text-right">{{ $t(item.localeId) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <form class="basic-info-contain">
            <div class="inner-basic">
              <div class="basic-title">{{ $t('user_profile.basic_information') }}</div>
              <div class="container-fluid basic-info p-0">
                <div class="row">
                  <div class="input-item col-md-6 col-sm-12">
                    <label for="name"
                    >{{ $t('user_profile.first_name') }} <span class="text-danger">*</span></label
                    >
                    <input
                      ref="nameInput"
                      v-model="candidate.name"
                      type="text"
                      name="name"
                      @input="$v.candidate.name.$touch()"
                      @blur="$v.candidate.name.$touch()"
                    />
                    <div class="error-text">{{ nameErrors[0] }}</div>
                  </div>
                  <div id="birthdaySelect" class="input-item col-md-6 col-sm-12">
                    <label for="date-of-birth"
                    >{{ $t('user_profile.birthday') }}
                      <span class="text-danger">*</span></label
                    >
<!--                    <input-->
<!--                      ref="birthdayInput"-->
<!--                      v-model="candidate.birthday"-->
<!--                      type="date"-->
<!--                      name="date-of-birth"-->
<!--                      @input="$v.candidate.birthday.$touch()"-->
<!--                      @blur="$v.candidate.birthday.$touch()"-->
<!--                    />-->
                    <DateSelect
                      :date="candidate.birthday"
                      :can-select-date-in-future="false"
                      :can-select-date-in-past="true"
                      @changeDate="handleChangeBirthday($event)"
                    />
                    <div class="error-text">{{ birthdayErrors[0] }}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="input-item col-md-6 col-sm-12">
                    <label for="email"
                    >{{ $t('general.email') }} <span class="text-danger">*</span></label
                    >
                    <input
                      ref="emailInput"
                      v-model="candidate.email"
                      type="text"
                      name="email"
                      @input="$v.candidate.email.$touch()"
                      @blur="$v.candidate.email.$touch()"
                    />
                    <div class="error-text">{{ emailErrors[0] }}</div>
                  </div>
                  <div class="input-item col-md-6 col-sm-12">
                    <label for="phone-number">
                      {{ $t('user_profile.phone_number') }}
                      <!--<span class="text-danger">*</span>-->
                    </label>
                    <input
                      ref="phoneNumberInput"
                      v-model="candidate.phone_number"
                      type="text"
                      name="phone-number"
                      @input="$v.candidate.phone_number.$touch()"
                      @blur="$v.candidate.phone_number.$touch()"
                    />
                    <div class="error-text">{{ phoneNumberErrors[0] }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="submit-contain">
              <button
                type="button"
                class="all-cancel"
                @click.prevent="showConfirmCancelModal(defaultBasicFormText)"
              >
                {{ $t('general.cancel') }}
              </button>
              <button
                class="save-btn"
                type="submit"
                :disabled="isDisabledBtnSubmitBasicInfo"
                @click.prevent="submitBasicInfo()"
              >
                {{ $t('general.save') }}
              </button>
            </div>
          </form>
          <div class="basic-info-contain foreign-language-contain">
            <div class="learning-title">
              Kỹ năng
              <span class="text-danger">*</span>
            </div>
            <!-- <div v-if="!$v.foreignLanguagesOfCandidate.required" class="error-text">{{ $t('error_text.required_muc') }}</div> -->

            <el-form>
              <div class="l-input lt-input">
                <div class="row mb-3">
                  <div label="Skill Name" class="col-md-4">
                    <el-select v-model="skillForm.skill" placeholder="Chọn kỹ năng" filterable remote reserve-keyword :remote-method="remoteSkillMethod" :loading="loading">
                      <el-option v-for="skill in skillArr" :key="skill.id" :label="skill.name" :value="skill"></el-option>
                    </el-select>
                  </div>
                  <div label="Level Mastered" class="col-md-4">
                    <el-select v-model="skillForm.skillLevel" placeholder="Chọn mức độ">
                      <el-option label="Beginner" value="beginner"></el-option>
                      <el-option label="Intermediate" value="intermediate"></el-option>
                      <el-option label="Advanced" value="advanced"></el-option>
                    </el-select>
                  </div>
                  <div class="col-md-4">
                    <el-button type="primary" @click="addSkill">Thêm</el-button>
                  </div>
                </div>
                <div class="row">
                  <div v-for="(section, level) in skillSections" :key="level">
                    <h4 v-if="section.length > 0" class="fw-bold">{{ level }}</h4>
                    <div>
                      <el-tag v-for="skill in section" :key="skill" closable @close="removeSkill(level, skill)">{{ skill }}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
          <div class="basic-info-contain job-contain">
            <div class="learning-title">
              {{ $t('user_profile.work_experience') }}
              <span class="text-danger">*</span>
            </div>
            <div class="form-des">
              <span v-if="jobsOfCandidate.length === 0">
                {{ $t('user_profile.work_experience_description') }}
              </span>
            </div>
            <div class="extra ex-add vertical-align-middle" @click="addFormJob">
              <img src="../../assets/images/users/draft/icon_extra.svg" alt="" />
              <span>{{ $t('user_profile.add') }}</span>
            </div>
            <div
              v-for="(v, index) in $v.jobsOfCandidate.$each.$iter"
              :key="index"
              class="learning-item ex-info"
            >
              <form :id="`jobsOfCandidateForm_${index}`" @submit.prevent="saveJobItem(index)">
                <div class="l-extra">{{ $t('user_profile.add_work_experience') }}</div>
                <div class="l-input">
                  <div class="row">
                    <div class="input-item col-sm-12">
                      <label for="company">
                        {{ $t('user_profile.company_name') }}
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        :ref="'companyNameOfJobInput_' + index"
                        v-model="v.name.$model"
                        type="text"
                        name="company"
                        @blur="v.name.$touch()"
                        @input="v.name.$touch()"
                      />
                      <div v-if="v.name.$error && !v.name.required" class="error-text">{{ $t('error_text.required') }}</div>
                      <div v-else-if="v.name.$error && !v.name.maxLength" class="error-text">{{ $t('error_text.less_than_100_characters') }}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-item col-sm-12">
                      <label for="company">
                        {{ $t('user_profile.working_status') }}
                        <span class="text-danger">*</span>
                      </label>
                      <div class="check-box">
                        <label class="worked">
                          <input
                            v-model="v.status.$model"
                            type="radio"
                            name="work"
                            value="1"
                          />
                          <span>{{ $t('user_profile.working_status_value.1') }}</span>
                        </label>
                        <label class="working">
                          <input
                            v-model="v.status.$model"
                            type="radio"
                            name="work"
                            value="2"
                          />
                          <span>{{ $t('user_profile.working_status_value.2') }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row c_day">
                    <div class="input-item col-md-6 col-sm-12 c_start_day">
                      <label for="c_start_day">
                        {{ $t('user_profile.start_date') }}
                        <span class="text-danger">*</span>
                      </label>
<!--                      <input-->
<!--                        :ref="'jobStartAtInput_' + index"-->
<!--                        v-model="v.start_at.$model"-->
<!--                        type="date"-->
<!--                        name="c_start_day"-->
<!--                        @blur="v.start_at.$touch()"-->
<!--                        @input="v.start_at.$touch()"-->
<!--                      />-->
                      <DateSelect
                        :date="v.start_at.$model"
                        :can-select-date-in-past="true"
                        :can-select-date-in-future="false"
                        @changeDate="handleChangeStartAtOfJobsOfCandidate($event, index)"
                      />
                      <div v-if="v.start_at.$error && !v.start_at.required" class="error-text">{{ $t('error_text.required') }}</div>
                      <div
                        v-else-if="
                          v.start_at.$error
                          && (!v.start_at.isLessThanToday || !v.start_at.isLessThanEndAt)
                        "
                        class="error-text"
                      >
                        {{ $t('error_text.invalid_date') }}
                      </div>
                    </div>
                    <div
                      v-if="v.status.$model === 1 || v.status.$model === '1'"
                      class="input-item col-md-6 col-sm-12 c_end_day"
                    >
                      <label for="c_end_day">
                        {{ $t('user_profile.end_date') }}
                        <span class="text-danger">*</span>
                      </label>
<!--                      <input-->
<!--                        :ref="'jobEndAtInput_' + index"-->
<!--                        v-model="v.end_at.$model"-->
<!--                        type="date"-->
<!--                        name="c_end_day"-->
<!--                        @blur="v.end_at.$touch()"-->
<!--                        @input="v.end_at.$touch()"-->
<!--                      />-->
                      <DateSelect
                        :date="v.end_at.$model"
                        :can-select-date-in-past="true"
                        :can-select-date-in-future="false"
                        @changeDate="handleChangeEndAtOfJobsOfCandidate($event, index)"
                      />
                      <div v-if="v.end_at.$error && !v.end_at.required" class="error-text">{{ $t('error_text.required') }}</div>
                      <div
                        v-else-if="
                          v.end_at.$error
                          && (!v.end_at.isLessThanToday || !v.end_at.isGreaterThanStartAt)
                        "
                        class="error-text"
                      >
                        {{ $t('error_text.invalid_date') }}
                      </div>
                    </div>
                  </div>
                  <div class="submit-contain">
                    <button class="cancel" type="button" @click.prevent="showConfirmCancelModal(defaultJobFormText, index)">{{ $t('general.cancel') }}</button>
                    <!--                    <button class="save-btn" type="submit">Lưu</button>-->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="basic-info-contain">
            <div class="learning-title">
              {{ $t('user_profile.education') }}
              <!--<span class="text-danger">*</span>-->
            </div>
            <div class="form-des">
              <span v-if="educationsOfCandidate.length === 0">
                {{ $t('user_profile.education_description') }}
              </span>
            </div>
            <div class="extra learning-add vertical-align-middle" @click="addFormEducation">
              <img src="../../assets/images/users/draft/icon_extra.svg" alt="" />
              <span>{{ $t('user_profile.add') }}</span>
            </div>
            <!--<div v-if="!$v.educationsOfCandidate.required" class="error-text">Đây là mục bắt buộc</div>-->
            <div
              v-for="(v, index) in $v.educationsOfCandidate.$each.$iter"
              :key="index"
              class="learning-item learning-info"
            >
              <form :id="`educationsOfCandidateForm_${index}`" @submit.prevent="saveEducationItem(index)">
                <div class="l-extra">{{ $t('user_profile.add_education') }}</div>
                <div class="l-input">
                  <div class="row">
                    <div class="input-item col-sm-12">
                      <label for="school">
                        {{ $t('user_profile.school_name') }}
                        <span class="text-danger">*</span>
                      </label>
                      <el-select v-model="v.college.$model" placeholder="Chọn trường đại học" :disabled="v.is_custom_college.$model == true" class="w-100 mb-2">
                        <el-option v-for="college in collegeArr" :key="college.id" :label="college.name" :value="college.id"></el-option>
                      </el-select>
                      <label class="w-100 mb-2">
                        <input
                          v-model="v.is_custom_college.$model"
                          type="checkbox"
                          name="is_custom_college"
                          true-value="1"
                          false-value="0"
                        />
                        <span>Trường khác</span>
                      </label>
                      <input
                        v-if="v.is_custom_college.$model == 1"
                        :ref="'educationNameInput_' + index"
                        v-model.trim="v.custom_college.$model"
                        type="text"
                        name="school"
                        class="mb-2"
                        placeholder="Tên trường"
                        @blur="v.custom_college.$touch()"
                      />
                      <div v-if="v.custom_college.$error && !v.custom_college.required" class="error-text">
                        {{ $t('error_text.required') }}
                      </div>
                      <div v-else-if="v.custom_college.$error && !v.custom_college.maxLength" class="error-text">
                        {{ $t('error_text.less_than_200_characters') }}
                      </div>
                      <label for="major">
                        Chuyên ngành
                        <span class="text-danger">*</span>
                      </label>
                      <el-select v-model="v.major.$model" placeholder="Chọn chuyên ngành" :disabled="v.is_custom_major.$model == true" class="w-100 mb-2">
                        <el-option v-for="major in majorArr" :key="major.id" :label="major.name" :value="major.id"></el-option>
                      </el-select>
                      <label class="w-100 mb-2">
                        <input
                          v-model="v.is_custom_major.$model"
                          type="checkbox"
                          name="is_custom_major"
                          :checked="v.is_custom_major.$model"
                        />
                        <span>Chuyên ngành khác</span>
                      </label>
                      <input
                        v-if="v.is_custom_major.$model"
                        :ref="'educationNameInput_' + index"
                        v-model.trim="v.custom_major.$model"
                        type="text"
                        name="school"
                        class="mb-2"
                        placeholder="Chuyên ngành"
                        @blur="v.custom_major.$touch()"
                      />
                      <div v-if="v.custom_major.$error && !v.custom_major.required" class="error-text">
                        {{ $t('error_text.required') }}
                      </div>
                      <div v-else-if="v.custom_major.$error && !v.custom_major.maxLength" class="error-text">
                        {{ $t('error_text.less_than_200_characters') }}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-item col-sm-12">
                      <label for="company">
                        {{ $t('user_profile.status') }}
                        <span class="text-danger">*</span>
                      </label>
                      <div class="check-box">
                        <label class="work">
                          <input
                            v-model="v.status.$model"
                            type="radio"
                            name="study"
                            value="2"
                          />
                          <span>{{ $t('user_profile.education_value.2') }}</span>
                        </label>
                        <label class="work">
                          <input
                            v-model="v.status.$model"
                            type="radio"
                            name="study"
                            value="1"
                          />
                          <span>{{ $t('user_profile.education_value.1') }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row sc_day">
                    <div class="input-item col-md-6 col-sm-12 sc_start_day">
                      <label for="sc_start_day">
                        {{ $t('user_profile.start_date') }}
                        <span class="text-danger">*</span>
                      </label>
<!--                      <input-->
<!--                        :ref="'educationStartAtInput_' + index"-->
<!--                        v-model="v.start_at.$model"-->
<!--                        type="date"-->
<!--                        name="sc_start_day"-->
<!--                        @blur="v.start_at.$touch()"-->
<!--                      />-->
                      <DateSelect
                        :date="v.start_at.$model"
                        :can-select-date-in-past="true"
                        :can-select-date-in-future="false"
                        @changeDate="handleChangeStartAtOfEducationsOfCandidate($event, index)"
                      />
                      <div v-if="v.start_at.$error && !v.start_at.required" class="error-text">
                        {{ $t('error_text.required') }}
                      </div>
                      <div
                        v-else-if="
                          v.start_at.$error
                          && (!v.start_at.isLessThanToday || !v.start_at.isLessThanEndAt)
                        "
                        class="error-text"
                      >
                        {{ $t('error_text.invalid_date') }}
                      </div>
                    </div>
                    <div
                      v-if="v.status.$model === 2 || v.status.$model === '2'"
                      class="input-item col-md-6 col-sm-12 sc_end_day">
                      <label for="sc_end_day">
                        {{ $t('user_profile.end_date') }}
                        <span class="text-danger">*</span>
                      </label>
<!--                      <input-->
<!--                        :ref="'educationEndAtInput_' + index"-->
<!--                        v-model="v.end_at.$model"-->
<!--                        type="date"-->
<!--                        name="sc_end_day"-->
<!--                        @blur="v.end_at.$touch()"-->
<!--                      />-->
                      <DateSelect
                        :date="v.end_at.$model"
                        :can-select-date-in-past="true"
                        :can-select-date-in-future="false"
                        @changeDate="handleChangeEndAtOfEducationsOfCandidate($event, index)"
                      />
                      <div v-if="v.end_at.$error && !v.end_at.required" class="error-text">
                        {{ $t('error_text.required') }}
                      </div>
                      <div
                        v-else-if="
                          v.end_at.$error
                          && (!v.end_at.isLessThanToday || !v.end_at.isGreaterThanStartAt)
                        "
                        class="error-text"
                      >
                        {{ $t('error_text.invalid_date') }}
                      </div>
                    </div>
                  </div>
                  <div class="submit-contain">
                    <button class="cancel" type="button" @click.prevent="showConfirmCancelModal(defaultEducationFormText, index)">{{ $t('general.cancel') }}</button>
                    <!--                    <button class="save-btn" type="submit">Lưu</button>-->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="basic-info-contain">
            <div class="learning-title">
              {{ $t('user_profile.degree_certificate') }}
              <!--<span class="text-danger">*</span>-->
            </div>
            <div class="form-des">
              <span v-if="certificatesOfCandidate.length === 0">
                {{ $t('user_profile.degree_certificate_description') }}
              </span>
            </div>
            <div class="extra certi-add vertical-align-middle" @click="addFormCertificate">
              <img src="../../assets/images/users/draft/icon_extra.svg" alt="" />
              <span>{{ $t('user_profile.add') }}</span>
            </div>
            <!--<div v-if="!$v.certificatesOfCandidate.required" class="error-text">Đây là mục bắt buộc</div>-->
            <div
              v-for="(v, index) in $v.certificatesOfCandidate.$each.$iter"
              :key="index"
              class="learning-item certi-info"
            >
              <form :id="`certificatesOfCandidateForm_${index}`" @submit.prevent="saveCertificateItem(index)">
                <div class="l-extra">{{ $t('user_profile.add_degree_certificate') }}</div>
                <div class="l-input">
                  <div class="row">
                    <div class="input-item col-sm-12">
                      <label for="certi">
                        {{ $t('user_profile.name_of_degree_certificate') }}
                        <span class="text-danger">*</span>
                      </label>
                      <el-select v-model="v.certificate.$model" placeholder="Chọn chuyên ngành" :disabled="v.is_custom_certificate.$model == true" filterable remote reserve-keyword :remote-method="remoteCertificateMethod" :loading="loading" class="w-100 mb-2">
                        <el-option v-for="certificate in certificateArr" :key="certificate.id" :label="certificate.name" :value="certificate.id"></el-option>
                      </el-select>
                      <label class="w-100 mb-2">
                        <input
                          v-model="v.is_custom_certificate.$model"
                          type="checkbox"
                          name="is_custom_major"
                          :checked="v.is_custom_certificate.$model"
                        />
                        <span>Chứng chỉ khác</span>
                      </label>
                      <input
                        v-if="v.is_custom_certificate.$model"
                        :ref="'certificateNameInput_' + index"
                        v-model="v.custom_certificate.$model"
                        type="text"
                        name="certi"
                        @blur="v.custom_certificate.$touch()"
                        @input="v.custom_certificate.$touch()"
                      />
                      <div v-if="v.custom_certificate.$error && !v.custom_certificate.required" class="error-text">{{ $t('error_text.required') }}</div>
                      <div v-else-if="v.custom_certificate.$error && !v.custom_certificate.maxLength" class="error-text">{{ $t('error_text.less_than_100_characters') }}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-item col-md-6 col-sm-12">
                      <label for="certi_time">
                        {{ $t('user_profile.time_to_receive_certificate') }}
                        <span class="text-danger">*</span>
                      </label>
<!--                      <input-->
<!--                        :ref="'certificateReceiveAtInput_' + index"-->
<!--                        v-model="v.receive_at.$model"-->
<!--                        type="date"-->
<!--                        name="certi_time"-->
<!--                        @blur="v.receive_at.$touch()"-->
<!--                        @input="v.receive_at.$touch()"-->
<!--                      />-->
                      <DateSelect
                        :date="v.receive_at.$model"
                        :can-select-date-in-past="true"
                        :can-select-date-in-future="true"
                        @changeDate="handleChangeReceiveAtOfCertificatesOfCandidate($event, index)"
                      />
                      <div v-if="v.receive_at.$error && !v.receive_at.required" class="error-text">{{ $t('error_text.required') }}</div>
                      <div v-else-if="v.receive_at.$error && !v.receive_at.isLessThanToday" class="error-text">{{ $t('error_text.invalid_date') }}</div>
                    </div>
                  </div>
                  <div class="submit-contain">
                    <button class="cancel" type="button" @click.prevent="showConfirmCancelModal(defaultCertificateFormText, index)">{{ $t('general.cancel') }}</button>
                    <!--                    <button class="save-btn" type="submit">Lưu</button>-->
                  </div>
                </div>
              </form>
            </div>
          </div>
          <form class="basic-info-contain" @submit.prevent="saveStrength">
            <div class="learning-title">{{ $t('user_profile.strength') }}</div>
            <div class="form-des">
              {{ $t('user_profile.strength_description') }}
            </div>
            <!--<div class="extra strength-add">
              <img src="../../assets/images/users/draft/icon_extra.svg" alt="" />
              <span>Thêm</span>
            </div>-->
            <div class="streng-info">
              <div>
                <div class="desc fw-bold">{{ $t('user_profile.description') }}</div>
                <VueEditor
                  id="reason-desc"
                  ref="strengthInput"
                  v-model="strength"
									:editor-toolbar="customToolbar"
                  name="strength-desc"
                  cols="30"
                  rows="5"
                  @blur="$v.strength.$touch()"
                  @input="$v.strength.$touch()"
                />
                <div v-if="strength.length < 5000" class="count">
                  {{ $t('general.characters_left_part_1') }}{{ 5000 - strength.length }}{{ $t('general.characters_left_part_2') }}
                </div>
                <div v-else class="count">
                  {{ $t('general.characters_left_part_1') }}0{{ $t('general.characters_left_part_2') }}
                </div>
                <div class="error-text">{{ strengthErrors[0] }}</div>
                <!--<div class="submit-contain">
                  <button class="cancel" type="button" @click.prevent="showConfirmCancelModal(defaultStrengthFormText)">Hủy</button>
                  &lt;!&ndash;                  <button class="save-btn" type="submit">Lưu</button>&ndash;&gt;
                </div>-->
              </div>
            </div>
          </form>
          <form class="basic-info-contain" @submit.prevent="saveReasonApply">
            <div class="learning-title">{{ $t('user_profile.reason_apply') }}</div>
            <div class="form-des">
              {{ $t('user_profile.reason_apply_description') }}
            </div>
            <!--<div class="extra reason-add">
              <img src="../../assets/images/users/draft/icon_extra.svg" alt="" />
              <span>Thêm</span>
            </div>-->
            <div class="reason-info">
              <div>
                <div class="desc fw-bold">{{ $t('user_profile.description') }}</div>
                <!-- <textarea
                  id="reason-desc"
                  ref="reasonApplyInput"
                  v-model="reason_apply"
                  name="reason-desc"
                  cols="30"
                  rows="5"
                  @blur="$v.reason_apply.$touch()"
                  @input="$v.reason_apply.$touch()"
                  @change="$v.reason_apply.$touch()"
                /> -->
								<VueEditor 
									id="reason-desc"
                  ref="reasonApplyInput"
                  v-model="reason_apply"
									:editor-toolbar="customToolbar"
                  name="reason-desc"
                  cols="30"
                  rows="5"
									@blur="$v.reason_apply.$touch()"
                  @input="$v.reason_apply.$touch()"
                  @change="$v.reason_apply.$touch()"/>
                <div v-if="reason_apply.length < 5000" class="count">
                  {{ $t('general.characters_left_part_1') }}{{ 5000 - reason_apply.length }}{{ $t('general.characters_left_part_2') }}
                </div>
                <div v-else class="count">
                  {{ $t('general.characters_left_part_1') }}0{{ $t('general.characters_left_part_2') }}
                </div>
                <div class="error-text">{{ reasonApplyErrors[0] }}</div>
                <!--<div class="submit-contain">
                  <button class="cancel" type="button" @click.prevent="showConfirmCancelModal(defaultReasonApplyFormText)">Hủy</button>
                  &lt;!&ndash;                  <button class="save-btn" type="submit">Lưu</button>&ndash;&gt;
                </div>-->
              </div>
            </div>
          </form>
          <div class="submit-contain last">
            <!-- <button
              class="cancel"
              @click="previewCvInSite()"
            >
              {{ $t('general.preview') }}
            </button> -->
            <button
              ref="showCvUserModalBtn"
              class="d-none"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            />
            <button
              class="save-btn update-btn"
              :disabled="isDisabledBtnSubmitAdvanceInfo"
              @click="submitAdvanceInfo"
            >
              {{ $t('general.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <CvUserModal
      :candidate="candidate"
      :translate-candidate="translateCandidate"
      :educations-of-candidate="educationsOfCandidate"
      :jobs-of-candidate="jobsOfCandidate"
      :cv-type="cvType"
    />

<!--    <ConfirmCancelModal-->
<!--      :content="'Bạn chắc chắn muốn hủy thông tin vừa chỉnh sửa?'"-->
<!--      :form="'basicInfo'"-->
<!--      @onClickYes="resetFormBasicInfo($event)"-->
<!--    />-->

    <!--ConfirmCancelModal-->
    <button
      ref="showConfirmCancelModalBtn"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#confirmCancelModal"
    />
    <div id="confirmCancelModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <img
              ref="closeConfirmCancelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            >
          </div>
          <div class="modal-body">
            <h3 class="text-center modal-body-text">
              {{
                cancelForm === defaultBasicFormText
                ? $t('general.confirm_cancel_updated_information')
                : $t('general.confirm_cancel_information')
              }}
            </h3>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">{{ $t('general.no') }}</button>
            <button type="button" class="btn btn-danger rounded-pill w-20 btn-p" data-bs-dismiss="modal" @click="resetForm()">{{ $t('general.yes') }}</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import { validationMixin } from 'vuelidate'
import {
  required,
  requiredIf,
  maxLength,
  minLength,
  // minValue,
  // alpha,
  numeric,
  email,
  helpers
} from 'vuelidate/lib/validators'
// import ConfirmCancelModal from "~/components/modal/ConfirmCancelModal"
import DateSelect from "~/components/DateSelect"
import {
  DATE_FORMAT,
  YEAR_FORMAT,
  MONTH_FORMAT,
  DAY_FORMAT,
  ASC_ORDER,
  DESC_ORDER
} from '~/constants/main.js'

const imageRule = helpers.regex('image', /\.(jpeg|png|jpg|gif)$/)
const imageSize = (value) => value <= 2000000
const fileCvRule = helpers.regex('application', /\.(pdf)$/)
const fileCvSize = (value) => value <= 5000000
// const alphaAndSpaceValidator = helpers.regex('alphaAndSpace', /^[a-zA-Z ]*$/)

const EDUCATION_STUDYING_STATUS = 1
const EDUCATION_GRADUATED_STATUS = 2
const JOB_END_STATUS = 1
const JOB_WORKING_STATUS = 2
const CV_IN_SITE = 1
const CV_UPLOAD = 2
const BASIC_FORM_TEXT = 'basic'
const EDUCATION_FORM_TEXT = 'education'
const FOREIGN_LANGUAGE_FORM_TEXT = 'foreignLanguage'
const JOB_FORM_TEXT = 'job'
const CERTIFICATE_FORM_TEXT = 'certificate'
const REASON_APPLY_FORM_TEXT = 'reasonApply'
const STRENGTH_FORM_TEXT = 'strength'

export default {
  name: 'UserProfile',
  components: {
    // ConfirmCancelModal,
    DateSelect,
  },
  mixins: [validationMixin],
  layout: 'auth',

  data() {
    return {
			customToolbar: [
				[{ 'size': ['small', false, 'large', 'huge'] }],
				['bold', 'italic', 'underline', 'strike'],
				[{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
				['blockquote', 'code-block'],
				[{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
				[{ 'indent': '-1'}, { 'indent': '+1' }],
				[{ 'color': [] }, { 'background': [] }],
				[{ 'direction': 'rtl' }],
			],
      skillArr: [],
      skillForm: {
        skill: '',
        skillLevel: ''
      },
      skills: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Angular', 'Python', 'Java', 'C++', 'Ruby'],
      skillSections: {
        beginner: [],
        intermediate: [],
        advanced: []
      },
      skillIds: {
        beginner: [],
        intermediate: [],
        advanced: []
      },
      certificateModel: null,
      certificateArr: [],
      majorModel: null,
      majorArr: [],
      collegeModel: null,
      collegeArr: [],
      certificates: [],
      collegeMajors: [],
      DATE_FORMAT,
      YEAR_FORMAT,
      MONTH_FORMAT,
      DAY_FORMAT,
      ASC_ORDER,
      DESC_ORDER,
      isDisabledBtnSubmitBasicInfo: false,
      isDisabledBtnSubmitAdvanceInfo: false,
      isSubmitBasicInfoSuccess: false,
      isSubmitAdvanceInfoSuccess: false,
      completePointList: [
        {
          label: 'Thông tin cơ bản',
          localeId: 'user_profile.basic_information',
          value: 1
        },
        {
          label: 'Ngoại ngữ',
          localeId: 'user_profile.foreign_language_level',
          value: 2
        },
        {
          label: 'Kinh nghiệm làm việc',
          localeId: 'user_profile.work_experience',
          value: 3
        },
        {
          label: 'Học vấn, bằng cấp',
          localeId: 'user_profile.education_degrees',
          value: 4
        },
      ],
      base_url: process.env.USER_URL,
      url_file: process.env.URL_FILE,
      completePoint: 0,
      cvType: 0,
      cancelForm: '',
      cancelItemIndex: -1,
      defaultBasicFormText: BASIC_FORM_TEXT,
      defaultEducationFormText: EDUCATION_FORM_TEXT,
      defaultForeignLanguageFormText: FOREIGN_LANGUAGE_FORM_TEXT,
      defaultJobFormText: JOB_FORM_TEXT,
      defaultCertificateFormText: CERTIFICATE_FORM_TEXT,
      defaultReasonApplyFormText: REASON_APPLY_FORM_TEXT,
      defaultStrengthFormText: STRENGTH_FORM_TEXT,
      previewProfileImageUrl: '',
      profile_image: null,
      file_cv_upload: null,
      skillForeignLanguagesList: ['〇', '△', '×'],
      defaultCandidate: {
        id: '',
        user_id: '',
        name: '',
        // birthday: this.formatDate(this.$moment(), DATE_FORMAT),
        birthday: '',
        email: '',
        profile_image: '',
        phone_number: '',
        strength: '',
        reason_apply: '',
        file_cv_upload: '',
        desire_change_jobs: '',
        status: '',
        created_at: '',
        updated_at: '',
        candidate_educations_jobs: [],
        candidate_foreign_languages: [],
        candidate_certificates: [],
      },
      translateCandidate: {},
      candidate: {
        id: '',
        user_id: '',
        name: '',
        // birthday: this.formatDate(this.$moment(), DATE_FORMAT),
        birthday: '',
        email: '',
        profile_image: '',
        phone_number: '',
        strength: '',
        reason_apply: '',
        file_cv_upload: '',
        desire_change_jobs: '',
        status: '',
        created_at: '',
        updated_at: '',
        candidate_educations_jobs: [],
        candidate_foreign_languages: [],
        candidate_certificates: [],
      },
      educationsOfCandidate: [
        // {
        //   college: '',
        //   major: '',
        //   custom_college: '',
        //   custom_major: '',
        //   status: 2,
        //   start_at: '',
        //   end_at: '',
        //   is_custom_college: false,
        //   is_custom_major: false,
        // },
      ],
      jobsOfCandidate: [
        // {
        //   name: '',
        //   status: 1,
        //   // start_at: this.formatDate(this.$moment(), DATE_FORMAT),
        //   // end_at: this.formatDate(this.$moment(), DATE_FORMAT)
        //   start_at: '',
        //   end_at: ''
        // },
      ],
      certificatesOfCandidate: [
        // {
        //   name: '',
        //   receive_at: ''
        // }
      ],
      reason_apply: '',
      strength: '',
      storeEducationsOfCandidate: [],
      storeJobsOfCandidate: [],
      storeCertificatesOfCandidate: [],
      storeReasonApply: '',
      storeStrength: '',
      searchData: {},
      loading: false,
    }
  },

  validations: {
    profile_image: {
      name: {
        imageRule
      },
      size: {
        imageSize
      }
    },
    file_cv_upload: {
      name: {
        fileCvRule
      },
      size: {
        fileCvSize
      }
    },
    candidate: {
      name: {
        required,
        maxLength: maxLength(20)
      },
      email: {
        required,
        email,
        maxLength: maxLength(100)
      },
      phone_number: {
        // required,
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(13)
      },
      birthday: {
        // isLessThanToday(value) {
        //   // this.$moment(value) < this.$moment()
        //   return this.formatDate(this.$moment(value), DATE_FORMAT)
        //     .localeCompare(this.formatDate(this.$moment(), DATE_FORMAT)) === -1
        // }
      },
    },

    educationsOfCandidate: {
      // required,
      // minLength: minLength(1),
      $each: {
        college: {

        },
        major: {

        },
        custom_college: {

        },
        custom_major: {

        },
        is_custom_college: {

        },
        is_custom_major: {

        },
        status: {
          required
        },
        start_at: {
          required,
          isLessThanToday(value) {
            // this.$moment(value) <= this.$moment()
            return this.formatDate(this.$moment(value), DATE_FORMAT)
              .localeCompare(this.formatDate(this.$moment(), DATE_FORMAT)) !== 1
          },
          isLessThanEndAt(value, item) {
            if (parseInt(item.status) === EDUCATION_GRADUATED_STATUS && item.end_at !== '') {
              // this.$moment(value) <= this.$moment(item.end_at)
              return this.formatDate(this.$moment(value), DATE_FORMAT)
                .localeCompare(this.formatDate(this.$moment(item.end_at), DATE_FORMAT)) !== 1
            }
            return true
          },
        },
        end_at: {
          required: requiredIf(function (item) {
            return parseInt(item.status) === EDUCATION_GRADUATED_STATUS
          }),
          isLessThanToday(value, item) {
            if (parseInt(item.status) === EDUCATION_STUDYING_STATUS) {
              return true
            }
            // this.$moment(value) <= this.$moment()
            return this.formatDate(this.$moment(value), DATE_FORMAT)
              .localeCompare(this.formatDate(this.$moment(), DATE_FORMAT)) !== 1
          },
          isGreaterThanStartAt(value, item) {
            if (parseInt(item.status) === EDUCATION_GRADUATED_STATUS && item.start_at !== '') {
              // this.$moment(value) >= this.$moment(item.start_at)
              return this.formatDate(this.$moment(value), DATE_FORMAT)
                .localeCompare(this.formatDate(this.$moment(item.start_at), DATE_FORMAT)) !== -1
            }
            return true
          },
        },
      }
    },

    jobsOfCandidate: {
      minLength: minLength(1),
      $each: {
        name: {
          required,
          maxLength: maxLength(100)
        },
        status: {
          required
        },
        start_at: {
          required,
          isLessThanToday(value) {
            // this.$moment(value) <= this.$moment()
            return this.formatDate(this.$moment(value), DATE_FORMAT)
              .localeCompare(this.formatDate(this.$moment(), DATE_FORMAT)) !== 1
          },
          isLessThanEndAt(value, item) {
            if (parseInt(item.status) === JOB_END_STATUS && item.end_at !== '') {
              // this.$moment(value) <= this.$moment(item.end_at)
              return this.formatDate(this.$moment(value), DATE_FORMAT)
                .localeCompare(this.formatDate(this.$moment(item.end_at), DATE_FORMAT)) !== 1
            }
            return true
          },
        },
        end_at: {
          required: requiredIf(function (item) {
            return parseInt(item.status) === JOB_END_STATUS
          }),
          isLessThanToday(value, item) {
            if (parseInt(item.status) === JOB_WORKING_STATUS) {
              return true
            }
            // this.$moment(value) <= this.$moment()
            return this.formatDate(this.$moment(value), DATE_FORMAT)
              .localeCompare(this.formatDate(this.$moment(), DATE_FORMAT)) !== 1
          },
          isGreaterThanStartAt(value, item) {
            if (parseInt(item.status) === JOB_END_STATUS && item.start_at !== '') {
              // this.$moment(value) >= this.$moment(item.start_at)
              return this.formatDate(this.$moment(value), DATE_FORMAT)
                .localeCompare(this.formatDate(this.$moment(item.start_at), DATE_FORMAT)) !== -1
            }
            return true
          },
        }
      },
    },

    certificatesOfCandidate: {
      // required,
      // minLength: minLength(1),
      $each: {
        certificate: {

        },
        custom_certificate: {
          required: requiredIf(function (item) {
            // eslint-disable-next-line eqeqeq
            return item.is_custom_certificate == true;
          }),
          maxLength: maxLength(100)
        },
        is_custom_certificate: {

        },
        receive_at: {
          required,
          isLessThanToday(value) {
            // return this.$moment(value) < this.$moment()
            return true
          }
        }
      }
    },

    reason_apply: {
      maxLength: maxLength(5000)
    },

    strength: {
      maxLength: maxLength(5000)
    },
  },

  head() {
    return { title: `${ this.$t('general.myProfile') }` }
  },

  computed: {
    ...mapGetters(['loggedInUser']),

    profileImageErrors () {
      const errors = []
      if (!this.$v.profile_image.$dirty) return errors
      !this.$v.profile_image.name.imageRule && errors.push(this.$t('error_text.image_type_validation'))
      !this.$v.profile_image.size.imageSize && errors.push(this.$t('error_text.image_size_validation'))
      return errors
    },

    fileCvUploadErrors () {
      const errors = []
      if (!this.$v.file_cv_upload.$dirty) return errors
      !this.$v.file_cv_upload.name.fileCvRule && errors.push(this.$t('error_text.cv_file_type_validation'))
      !this.$v.file_cv_upload.size.fileCvSize && errors.push(this.$t('error_text.cv_file_size_validation'))
      return errors
    },

    nameErrors() {
      const errors = []
      if (!this.$v.candidate.name.$dirty) return errors
      !this.$v.candidate.name.required && errors.push(this.$t('error_text.required'))
      !this.$v.candidate.name.maxLength && errors.push(this.$t('error_text.less_than_20_characters'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.candidate.email.$dirty) return errors
      !this.$v.candidate.email.required && errors.push(this.$t('error_text.required'))
      !this.$v.candidate.email.email && errors.push(this.$t('error_text.is_not_email_format'))
      !this.$v.candidate.email.maxLength && errors.push(this.$t('error_text.less_than_100_characters'))
      return errors
    },

    phoneNumberErrors() {
      const errors = []
      if (!this.$v.candidate.phone_number.$dirty) return errors
      // !this.$v.candidate.phone_number.required && errors.push('Đây là trường bắt buộc')
      !this.$v.candidate.phone_number.numeric && errors.push(this.$t('error_text.not_enter_letters_and_special_characters'))
      !this.$v.candidate.phone_number.minLength && errors.push(this.$t('error_text.less_than_9_13_characters'))
      !this.$v.candidate.phone_number.maxLength && errors.push(this.$t('error_text.less_than_9_13_characters'))
      return errors
    },

    birthdayErrors() {
      const errors = []
      if (!this.$v.candidate.birthday.$dirty) return errors
      // !this.$v.candidate.birthday.required && errors.push(this.$t('error_text.required'))
      // !this.$v.candidate.birthday.isLessThanToday && errors.push(this.$t('error_text.invalid_date_of_birth'))
      return errors
    },

    reasonApplyErrors() {
      const errors = []
      if (!this.$v.reason_apply.$dirty) return errors
      !this.$v.reason_apply.maxLength && errors.push(this.$t('error_text.less_than_5000_characters'))
      return errors
    },

    strengthErrors() {
      const errors = []
      if (!this.$v.strength.$dirty) return errors
      !this.$v.strength.maxLength && errors.push(this.$t('error_text.less_than_5000_characters'))
      return errors
    },

  },

  watch: {
    // 'candidate.pref': {
    //   handler(newVal) {
    //     console.log('watch: '+newVal)
    //     if (this.candidate.pref && this.candidate.postal_code2) {
    //       if (this.candidate.pref.length === 3 && this.candidate.postal_code2.length === 4) {
    //         this.candidate.postal_code = this.candidate.pref + this.candidate.postal_code2
    //       }
    //     }
    //   },
    //   deep: true
    // },
    // 'candidate.postal_code2': {
    //   handler(newVal) {
    //     console.log('watch: '+newVal)
    //     if (this.candidate.pref && this.candidate.postal_code2) {
    //       if (this.candidate.postal_code2.length === 4 && this.candidate.pref.length === 3) {
    //         this.candidate.postal_code = this.candidate.pref + this.candidate.postal_code2
    //       }
    //     }
    //   },
    //   deep:true
    // },
  },

  created() {
    this.getUserOptions()
    this.assignData()
  },

  methods: {
    ...mapActions({
      dispatchSetReasonApply: 'user/setReasonApply',
      dispatchSetStrength: 'user/setStrength',
      dispatchPushItemToEducationsOfCandidate: 'user/pushItemToEducationsOfCandidate',
    }),

    ...mapGetters({
      gettersGetReasonApply: 'user/getReasonApply',
      gettersGetStrength: 'user/getStrength',
      gettersGetEducationsOfCandidate: 'user/getEducationsOfCandidate',
    }),

    addSkill() {
      const { skill, skillLevel } = this.skillForm;
        if (skill && skillLevel) {
          this.skillSections[skillLevel].push(skill.name);
          this.skillIds[skillLevel].push(skill.id)
          this.skillForm.skillId = {};
          this.skillForm.skillLevel = '';
        } else {
          this.$message.error('Please select both skill name and level.');
        }
    },
    removeSkill(level, skill) {
      const index = this.skillSections[level].indexOf(skill);
      if (index !== -1) {
        this.skillSections[level].splice(index, 1);
        this.skillIds[level].splice(index, 1)
      }
    },

    assignData() {
      this.getUserProfile()
    },

    remoteSkillMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.skillArr = this.searchData?.skills.filter(item => {
            return item.name.toLowerCase()
              .includes(query.toLowerCase());
          });
        }, 200);
      } else {
        this.certificateArr = [];
      }
    },

    remoteCertificateMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.certificateArr = this.searchData?.certificates.filter(item => {
            return item.name.toLowerCase()
              .includes(query.toLowerCase());
          });
        }, 200);
      } else {
        this.certificateArr = [];
      }
    },

    async getUserOptions() {
      const { data } = await this.$repositories.users.getUserOptions()
      if (data) {
        this.searchData = {...data};
        this.collegeArr = data.colleges
        this.majorArr = data.majors
        this.certificateArr = data.certificates;
      }
    },

    async getUserProfile() {
      const { data } = await this.$repositories.users.getUserProfile()

      if (data.candidate) {
        this.candidate = Object.assign({}, data.candidate)
        this.previewProfileImageUrl = data.candidate.profile_image


        // assign completePoint
        // this.assignCompletePoint(data.candidate)
        // assign reason_apply, strength
        if (this.candidate.reason_apply) this.reason_apply = this.candidate.reason_apply
        if (this.candidate.strength) this.strength = this.candidate.strength

        const tempEducationsOfCandidate = data.candidate.educations
        if (tempEducationsOfCandidate.length > 0) {
          this.educationsOfCandidate = [...tempEducationsOfCandidate]
          this.storeEducationsOfCandidate = [...tempEducationsOfCandidate]
        }

        // assign jobsOfCandidate, storeJobsOfCandidate
        const tempJobsOfCandidate = data.candidate.working_experiences
        if (tempJobsOfCandidate.length > 0) {
          this.jobsOfCandidate = [...tempJobsOfCandidate].map(function (element) {
            return {
              ...element,
              end_at: element.end_at ?? ''
            }
          })
          this.storeJobsOfCandidate = [...tempJobsOfCandidate].map(function (element) {
            return {
              ...element,
              end_at: element.end_at ?? ''
            }
          })
        }

        // assign certificatesOfCandidate, storeCertificatesOfCandidate
        if (data.candidate.certificates.length > 0) {
          this.certificatesOfCandidate = [...data.candidate.certificates]
          this.storeCertificatesOfCandidate = [...data.candidate.certificates]
        }

        if (data.candidate.skills?.length > 0) {
          this.skillSections.beginner = data.candidate.skills.filter((item) => item.level === 'Beginner').map((item) => item.skill.name);
          this.skillSections.intermediate = data.candidate.skills.filter((item) => item.level === 'Intermediate').map((item) => item.skill.name);
          this.skillSections.advanced = data.candidate.skills.filter((item) => item.level === 'Advanced').map((item) => item.skill.name);
          this.skillIds.beginner = data.candidate.skills.filter((item) => item.level === 'Beginner').map((item) => item.skill._id);
          this.skillIds.intermediate = data.candidate.skills.filter((item) => item.level === 'Intermediate').map((item) => item.skill._id);
          this.skillIds.advanced = data.candidate.skills.filter((item) => item.level === 'Advanced').map((item) => item.skill._id);
        }
        console.log(this.skillSections, this.skillIds)

        // this.candidate.phone_number = this.candidate.phone_number !== null && this.candidate.phone_number !== 'null' && this.candidate.phone_number !== ''
        //   ? this.candidate.phone_number
        //   : ''

        // assign defaultCandidate
        this.defaultCandidate = Object.assign({}, this.candidate)

      }
    },

    assignCompletePoint(responseDataCandidate) {
      if (
        (responseDataCandidate.name !== '' && responseDataCandidate.name !== null)
        && (responseDataCandidate.email !== '' && responseDataCandidate.email !== null)
        && (responseDataCandidate.birthday !== '' && responseDataCandidate.birthday !== null)
      ) {
        // check foreign languages
        if (
          responseDataCandidate.candidate_foreign_languages.length > 0
        ) {
          // check jobs of candidate
          if (
            responseDataCandidate.candidate_educations_jobs.filter(function (element) {
              return parseInt(element.type) === 2
            }).length > 0
          ) {
            // check educations and certificates of candidate
            if (
              responseDataCandidate.candidate_educations_jobs.filter(function (element) {
                return parseInt(element.type) === 1
              }).length > 0
              && responseDataCandidate.candidate_certificates.length > 0
            ) {
              this.completePoint = 4
            } else {
              this.completePoint = 3
            }
          } else {
            this.completePoint = 2
          }
        } else {
          this.completePoint = 1
        }
      }
    },

    previewCvInSite() {
      this.$v.candidate.$touch()
      this.$v.educationsOfCandidate.$touch()
      this.$v.jobsOfCandidate.$touch()
      this.$v.certificatesOfCandidate.$touch()
      this.$v.reason_apply.$touch()
      this.$v.strength.$touch()
      if (
        !this.$v.candidate.$invalid
        && !this.$v.educationsOfCandidate.$invalid
        && !this.$v.jobsOfCandidate.$invalid
        && !this.$v.certificatesOfCandidate.$invalid
        && !this.$v.reason_apply.$invalid
        && !this.$v.strength.$invalid
      ) {
        this.cvType = CV_IN_SITE
        this.candidate.reason_apply = this.reason_apply
        this.candidate.strength = this.strength
        this.candidate.candidate_certificates = [...this.certificatesOfCandidate]
        this.candidate.candidate_educations_jobs = [
          ...this.educationsOfCandidate.map(education => ({
            ...education,
            type: 1
          })),
          ...this.jobsOfCandidate.map(job => ({
            ...job,
            type: 2
          })),
        ]

        this.$repositories.users.getUserProfileTranslate({
          candidate: JSON.stringify(this.candidate),
          locale: this.$i18n.locale
        }).then(res => {
          if (res.status === 200) {
            this.translateCandidate = {...res.data.translateCandidate}
          }
        })

        this.$refs.showCvUserModalBtn.click()
      } else if (this.$v.candidate.$invalid) {
        if (this.$v.candidate.name.$error) {
          this.$nextTick(function () {
            this.$refs.nameInput.focus()
          })
        } else if (this.$v.candidate.email.$error) {
          this.$nextTick(function () {
            this.$refs.emailInput.focus()
          })
        } else if (this.$v.candidate.phone_number.$error) {
          this.$nextTick(function () {
            this.$refs.phoneNumberInput.focus()
          })
        } else if (this.$v.candidate.birthday.$error) {
          this.$nextTick(function () {
            // this.$refs.birthdayInput.focus()
            document.getElementById("birthdaySelect").scrollIntoView()
          })
        }
      } else if (this.$v.educationsOfCandidate.$invalid) {
        for (let i = 0; i < Object.keys(this.$v.educationsOfCandidate.$each.$iter).length; i++) {
          if (this.$v.educationsOfCandidate.$each.$iter[i].$error) {
            if (this.$v.educationsOfCandidate.$each.$iter[i].name.$error) {
              this.$nextTick(function () {
                this.$refs[`educationNameInput_${i}`][0].focus()
              })
              break
            } else if (this.$v.educationsOfCandidate.$each.$iter[i].start_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`educationStartAtInput_${i}`][0].focus()
                document.getElementById(`educationsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            } else if (this.$v.educationsOfCandidate.$each.$iter[i].end_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`educationEndAtInput_${i}`][0].focus()
                document.getElementById(`educationsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            }
          }
        }
      } else if (this.$v.jobsOfCandidate.$invalid) {
        for (let i = 0; i < Object.keys(this.$v.jobsOfCandidate.$each.$iter).length; i++) {
          if (this.$v.jobsOfCandidate.$each.$iter[i].$error) {
            if (this.$v.jobsOfCandidate.$each.$iter[i].name.$error) {
              this.$nextTick(function () {
                this.$refs[`companyNameOfJobInput_${i}`][0].focus()
              })
              break
            } else if (this.$v.jobsOfCandidate.$each.$iter[i].start_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`jobStartAtInput_${i}`][0].focus()
                document.getElementById(`jobsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            } else if (this.$v.jobsOfCandidate.$each.$iter[i].end_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`jobEndAtInput_${i}`][0].focus()
                document.getElementById(`jobsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            }
          }
        }
      } else if (this.$v.certificatesOfCandidate.$invalid) {
        for (let i = 0; i < Object.keys(this.$v.certificatesOfCandidate.$each.$iter).length; i++) {
          if (this.$v.certificatesOfCandidate.$each.$iter[i].$error) {
            if (this.$v.certificatesOfCandidate.$each.$iter[i].name.$error) {
              this.$nextTick(function () {
                this.$refs[`certificateNameInput_${i}`][0].focus()
              })
              break
            } else if (this.$v.certificatesOfCandidate.$each.$iter[i].receive_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`certificateReceiveAtInput_${i}`][0].focus()
                document.getElementById(`certificatesOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            }
          }
        }
      } else if (this.$v.reason_apply.$error) {
        this.$nextTick(function () {
          this.$refs.reasonApplyInput.focus()
        })
      } else if (this.$v.strength.$error) {
        this.$nextTick(function () {
          this.$refs.strengthInput.focus()
        })
      }
    },

    previewCvUpload() {
      this.cvType = CV_UPLOAD
    },
    onChangeProfileImage(e) {
      this.profile_image = e.target.files[0]
      if (!this.profile_image) {
        this.$v.profile_image.$reset()
      } else {
        this.submitChangeProfileImage()
      }
    },

    async submitChangeProfileImage() {
      this.$v.profile_image.$touch()
      if (!this.$v.profile_image.$invalid) {
        const formData = new FormData()
        formData.append('file', this.profile_image)
        return await this.$repositories.users.updateProfileImage(
          formData,
          {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then(res => {
          if (res.status === 200) {
            this.previewProfileImageUrl = res.data
            this.candidate.profile_image = res.data
            this.$auth.fetchUser()
            this.$toast.success(this.$t('user_profile.upload_profile_image_success'))
          }
        })
      }
    },

    onChangeFileCvUpload(e) {
      this.file_cv_upload = e.target.files[0]
      if (!this.file_cv_upload) {
        this.$v.file_cv_upload.$reset()
      } else {
        this.submitChangeFileCvUpload()
      }
    },

    async submitChangeFileCvUpload() {
      this.$v.file_cv_upload.$touch()
      if (!this.$v.file_cv_upload.$invalid) {
        const formData = new FormData()
        formData.append('file', this.file_cv_upload)
        return await this.$repositories.users.updateFileCv(
          formData,
          {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then(res => {
          if (res.status === 200) {
            this.candidate.file_cv_upload = res.data.file_cv_upload
            this.$toast.success(this.$t('user_profile.update_cv_file_success'))
          }
        })
      }
    },

    showConfirmCancelModal(cancelForm, cancelItemIndex = -1) {
      this.cancelForm = cancelForm
      this.cancelItemIndex = cancelItemIndex
      this.$refs.showConfirmCancelModalBtn.click()
    },

    resetForm() {
      if (this.cancelForm === BASIC_FORM_TEXT) {
        this.resetFormBasicInfo()
      }
      if (this.cancelForm === EDUCATION_FORM_TEXT) {
        this.resetEducationItem(this.cancelItemIndex)
      }
      if (this.cancelForm === FOREIGN_LANGUAGE_FORM_TEXT) {
        this.resetForeignLanguageItem(this.cancelItemIndex)
      }
      if (this.cancelForm === JOB_FORM_TEXT) {
        this.resetJobItem(this.cancelItemIndex)
      }
      if (this.cancelForm === CERTIFICATE_FORM_TEXT) {
        this.resetCertificateItem(this.cancelItemIndex)
      }
      if (this.cancelForm === REASON_APPLY_FORM_TEXT) {
        this.resetFormReasonApply()
      }
      if (this.cancelForm === STRENGTH_FORM_TEXT) {
        this.resetFormStrength()
      }
    },

    resetFormBasicInfo() {
      this.candidate = Object.assign({}, this.defaultCandidate)
      this.$v.candidate.$reset()
    },

    async submitBasicInfo() {
      this.$v.candidate.$touch()
      if (!this.$v.candidate.$invalid) {
        this.isDisabledBtnSubmitBasicInfo = true
        return await this.$repositories.users.updateInfoBasic({
          name: this.candidate.name,
          email: this.candidate.email,
          phone_number: this.candidate.phone_number,
          birthday: this.candidate.birthday,
        }).then(res => {
          if (res.status === 200) {
            this.defaultCandidate = Object.assign({}, res.data)

            // assign completePoint
            // this.assignCompletePoint(res.data)

            this.$toast.success(this.$t('user_profile.success'))
            window.scrollTo(0,0)
          }
          this.isDisabledBtnSubmitBasicInfo = false
        })
      } else if (this.$v.candidate.name.$error) {
        this.$nextTick(function () {
          this.$refs.nameInput.focus()
        })
      } else if (this.$v.candidate.email.$error) {
        this.$nextTick(function () {
          this.$refs.emailInput.focus()
        })
      } else if (this.$v.candidate.phone_number.$error) {
        this.$nextTick(function () {
          this.$refs.phoneNumberInput.focus()
        })
      } else if (this.$v.candidate.birthday.$error) {
        this.$nextTick(function () {
          // this.$refs.birthdayInput.focus()
          document.getElementById("birthdaySelect").scrollIntoView()
        })
      }
    },

    resetFormReasonApply() {
      this.$v.reason_apply.$reset()
      // this.reason_apply = this.gettersGetReasonApply()
      this.reason_apply = this.storeReasonApply
    },

    saveReasonApply() {
      this.$v.reason_apply.$touch()
      if (!this.$v.reason_apply.$invalid) {
        // this.dispatchSetReasonApply(this.reason_apply)
        this.storeReasonApply = this.reason_apply
      }
    },

    resetFormStrength() {
      this.$v.strength.$reset()
      // this.strength = this.gettersGetStrength()
      this.strength = this.storeStrength
    },

    saveStrength() {
      this.$v.strength.$touch()
      if (!this.$v.strength.$invalid) {
        // this.dispatchSetStrength(this.strength)
        this.storeStrength = this.strength
      }
    },

    addFormEducation() {
      this.educationsOfCandidate.push({
        name: '',
        college: '',
        major: '',
        status: 1,
        is_custom_major: false,
        custom_major: '',
        is_custom_college: false,
        custom_college: '',
        // start_at: this.formatDate(this.$moment(), DATE_FORMAT),
        // end_at: this.formatDate(this.$moment(), DATE_FORMAT)
        start_at: '',
        end_at: ''
      })
      this.$v.educationsOfCandidate.$each.$iter[this.educationsOfCandidate.length - 1].$reset()
    },

    resetEducationItem(index) {
      if (this.storeEducationsOfCandidate.includes(this.educationsOfCandidate[index])) {
        this.storeEducationsOfCandidate.splice(this.storeEducationsOfCandidate.indexOf(this.educationsOfCandidate[index]), 1)
      }
      this.educationsOfCandidate.splice(index, 1)
    },

    saveEducationItem(index) {
      this.$v.educationsOfCandidate.$each.$iter[index].$touch()
      if (!this.$v.educationsOfCandidate.$each.$iter[index].$invalid) {
        if (this.storeEducationsOfCandidate.includes(this.educationsOfCandidate[index])) {
          this.storeEducationsOfCandidate[this.storeEducationsOfCandidate.indexOf(this.educationsOfCandidate[index])] = this.educationsOfCandidate[index]
        } else {
          this.storeEducationsOfCandidate.push(this.educationsOfCandidate[index])
        }
      }
    },

    addFormJob() {
      this.jobsOfCandidate.push({
        name: '',
        status: 1,
        // start_at: this.formatDate(this.$moment(), DATE_FORMAT),
        // end_at: this.formatDate(this.$moment(), DATE_FORMAT)
        start_at: '',
        end_at: ''
      })
      this.$v.jobsOfCandidate.$each.$iter[this.jobsOfCandidate.length - 1].$reset()
    },

    resetJobItem(index) {
      if (this.storeJobsOfCandidate.includes(this.jobsOfCandidate[index])) {
        this.storeJobsOfCandidate.splice(this.storeJobsOfCandidate.indexOf(this.jobsOfCandidate[index]), 1)
      }
      this.jobsOfCandidate.splice(index, 1)
    },

    saveJobItem(index) {
      this.$v.jobsOfCandidate.$each.$iter[index].$touch()
      if (!this.$v.jobsOfCandidate.$each.$iter[index].$invalid) {
        if (this.storeJobsOfCandidate.includes(this.jobsOfCandidate[index])) {
          this.storeJobsOfCandidate[this.storeJobsOfCandidate.indexOf(this.jobsOfCandidate[index])] = this.jobsOfCandidate[index]
        } else {
          this.storeJobsOfCandidate.push(this.jobsOfCandidate[index])
        }
      }
    },

    addFormCertificate() {
      this.certificatesOfCandidate.push({
        name: '',
        custom_certificate: '',
        certificate: '',
        is_custom_certificate: false,
        // receive_at: this.formatDate(this.$moment(), DATE_FORMAT)
        receive_at: '',

      })
      this.$v.certificatesOfCandidate.$each.$iter[this.certificatesOfCandidate.length - 1].$reset()
    },

    resetCertificateItem(index) {
      if (this.storeCertificatesOfCandidate.includes(this.certificatesOfCandidate[index])) {
        this.storeCertificatesOfCandidate.splice(this.storeCertificatesOfCandidate.indexOf(this.certificatesOfCandidate[index]), 1)
      }
      this.certificatesOfCandidate.splice(index, 1)
    },

    saveCertificateItem(index) {
      if (this.storeCertificatesOfCandidate.includes(this.certificatesOfCandidate[index])) {
        this.storeCertificatesOfCandidate[this.storeCertificatesOfCandidate.indexOf(this.certificatesOfCandidate[index])] = this.certificatesOfCandidate[index]
      } else {
        this.storeCertificatesOfCandidate.push(this.certificatesOfCandidate[index])
      }
    },

    async submitAdvanceInfo() {
      this.$v.candidate.$touch()
      this.$v.educationsOfCandidate.$touch()
      this.$v.jobsOfCandidate.$touch()
      this.$v.certificatesOfCandidate.$touch()
      this.$v.reason_apply.$touch()
      this.$v.strength.$touch()
      if (
        !this.$v.candidate.$invalid
        && !this.$v.educationsOfCandidate.$invalid
        && !this.$v.jobsOfCandidate.$invalid
        && !this.$v.certificatesOfCandidate.$invalid
        && !this.$v.reason_apply.$invalid
        && !this.$v.strength.$invalid
      ) {
        this.isDisabledBtnSubmitAdvanceInfo = true
        // submitBasicInfo
        await this.$repositories.users.updateInfoBasic({
          name: this.candidate.name,
          email: this.candidate.email,
          phone_number: this.candidate.phone_number,
          birthday: this.candidate.birthday,
        }).then(res => {
          if (res.status === 200) {
            this.defaultCandidate = Object.assign({}, res.data)
            this.candidate = Object.assign({}, res.data)
            // assign completePoint
            // this.assignCompletePoint(res.data)

            // this.$toast.success(this.$t('user_profile.success'))
            // window.scrollTo(0,0)
            this.isSubmitBasicInfoSuccess = true
          }
        })
        //

        // submitAdvanceInfo
        const formData = new FormData()

        for (let i = 0; i < this.educationsOfCandidate.length; i++) {
          formData.append('educations[' + i + '][name]', this.educationsOfCandidate[i].name)
          formData.append('educations[' + i + '][status]', this.educationsOfCandidate[i].status)
          formData.append('educations[' + i + '][start_at]', this.educationsOfCandidate[i].start_at)
          formData.append('educations[' + i + '][is_custom_college]', this.educationsOfCandidate[i].is_custom_college)
          formData.append('educations[' + i + '][is_custom_major]', this.educationsOfCandidate[i].is_custom_major)
          formData.append('educations[' + i + '][custom_major]', this.educationsOfCandidate[i].custom_major)
          formData.append('educations[' + i + '][custom_college]', this.educationsOfCandidate[i].custom_college)
          formData.append('educations[' + i + '][college]', this.educationsOfCandidate[i].college)
          formData.append('educations[' + i + '][major]', this.educationsOfCandidate[i].major)
          if (parseInt(this.educationsOfCandidate[i].status) === EDUCATION_GRADUATED_STATUS) {
            formData.append('educations[' + i + '][end_at]', this.educationsOfCandidate[i].end_at)
          }
        }

        for (let i = 0; i < this.jobsOfCandidate.length; i++) {
          formData.append('jobs[' + i + '][status]', this.jobsOfCandidate[i].status)
          formData.append('jobs[' + i + '][name]', this.jobsOfCandidate[i].name)
          formData.append('jobs[' + i + '][start_at]', this.jobsOfCandidate[i].start_at)
          if (parseInt(this.jobsOfCandidate[i].status) === JOB_END_STATUS) {
            formData.append('jobs[' + i + '][end_at]', this.jobsOfCandidate[i].end_at)
          }
        }

        for (let i = 0; i < this.certificatesOfCandidate.length; i++) {
          formData.append('certificates[' + i + '][certificate]', this.certificatesOfCandidate[i].certificate)
          formData.append('certificates[' + i + '][is_custom_certificate]', this.certificatesOfCandidate[i].is_custom_certificate)
          formData.append('certificates[' + i + '][custom_certificate]', this.certificatesOfCandidate[i].custom_certificate)
          formData.append('certificates[' + i + '][receive_at]', this.certificatesOfCandidate[i].receive_at)
        }

        formData.append('reason_apply', this.reason_apply)
        formData.append('strength', this.strength)
        formData.append('skills', JSON.stringify(this.skillIds))

        // this.isDisabledBtnSubmitAdvanceInfo = true
        await this.$repositories.users.updateInfoAdvanced(
          formData,
          {
            header: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then(res => {
          if (res.status === 200) {
            this.candidate = Object.assign({}, res.data.candidate)
            this.defaultCandidate = Object.assign({}, res.data.candidate)
            if (this.isSubmitBasicInfoSuccess) {
              // assign completePoint
              // this.assignCompletePoint(res.data.candidate)

              this.$toast.success(this.$t('user_profile.success'))
              window.scrollTo(0,0)
            }
          }
          this.isDisabledBtnSubmitAdvanceInfo = false
        })
      } else if (this.$v.candidate.name.$error) {
        this.$nextTick(function () {
          this.$refs.nameInput.focus()
        })
      } else if (this.$v.candidate.email.$error) {
        this.$nextTick(function () {
          this.$refs.emailInput.focus()
        })
      } else if (this.$v.candidate.phone_number.$error) {
        this.$nextTick(function () {
          this.$refs.phoneNumberInput.focus()
        })
      } else if (this.$v.candidate.birthday.$error) {
        this.$nextTick(function () {
          // this.$refs.birthdayInput.focus()
          document.getElementById("birthdaySelect").scrollIntoView()
        })
      }
      else if (this.$v.educationsOfCandidate.$invalid) {
        for (let i = 0; i < Object.keys(this.$v.educationsOfCandidate.$each.$iter).length; i++) {
          if (this.$v.educationsOfCandidate.$each.$iter[i].$error) {
            if (this.$v.educationsOfCandidate.$each.$iter[i].name.$error) {
              this.$nextTick(function () {
                this.$refs[`educationNameInput_${i}`][0].focus()
              })
              break
            } else if (this.$v.educationsOfCandidate.$each.$iter[i].start_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`educationStartAtInput_${i}`][0].focus()
                document.getElementById(`educationsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            } else if (this.$v.educationsOfCandidate.$each.$iter[i].end_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`educationEndAtInput_${i}`][0].focus()
                document.getElementById(`educationsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            }
          }
        }
      } else if (this.$v.jobsOfCandidate.$invalid) {
        for (let i = 0; i < Object.keys(this.$v.jobsOfCandidate.$each.$iter).length; i++) {
          if (this.$v.jobsOfCandidate.$each.$iter[i].$error) {
            if (this.$v.jobsOfCandidate.$each.$iter[i].name.$error) {
              this.$nextTick(function () {
                this.$refs[`companyNameOfJobInput_${i}`][0].focus()
              })
              break
            } else if (this.$v.jobsOfCandidate.$each.$iter[i].start_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`jobStartAtInput_${i}`][0].focus()
                document.getElementById(`jobsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            } else if (this.$v.jobsOfCandidate.$each.$iter[i].end_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`jobEndAtInput_${i}`][0].focus()
                document.getElementById(`jobsOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            }
          }
        }
      } else if (this.$v.certificatesOfCandidate.$invalid) {
        for (let i = 0; i < Object.keys(this.$v.certificatesOfCandidate.$each.$iter).length; i++) {
          if (this.$v.certificatesOfCandidate.$each.$iter[i].$error) {
            if (this.$v.certificatesOfCandidate.$each.$iter[i].name.$error) {
              this.$nextTick(function () {
                this.$refs[`certificateNameInput_${i}`][0].focus()
              })
              break
            } else if (this.$v.certificatesOfCandidate.$each.$iter[i].receive_at.$error) {
              this.$nextTick(function () {
                // this.$refs[`certificateReceiveAtInput_${i}`][0].focus()
                document.getElementById(`certificatesOfCandidateForm_${i}`).scrollIntoView()
              })
              break
            }
          }
        }
      } else if (this.$v.reason_apply.$error) {
        this.$nextTick(function () {
          this.$refs.reasonApplyInput.focus()
        })
      } else if (this.$v.strength.$error) {
        this.$nextTick(function () {
          this.$refs.strengthInput.focus()
        })
      }

    },

    // copyAffiliateLink() {
    //   const link = this.$refs.affiliateLinkInput
    //   link.select()
    //   document.execCommand("copy")
    //   this.$toast.success(this.$t('user_profile.copy_success'))
    // },

    // change birthday
    handleChangeBirthday(date) {
      this.candidate.birthday = date
      this.$v.candidate.birthday.$touch()
    },

    // change start_at of jobsOfCandidate
    handleChangeStartAtOfJobsOfCandidate(date, i) {
      this.jobsOfCandidate[i].start_at = date
      this.$v.jobsOfCandidate.$each.$iter[i].start_at.$touch()
    },

    // change end_at of jobsOfCandidate
    handleChangeEndAtOfJobsOfCandidate(date, i) {
      this.jobsOfCandidate[i].end_at = date
      this.$v.jobsOfCandidate.$each.$iter[i].end_at.$touch()
    },

    // change start_at of educationsOfCandidate
    handleChangeStartAtOfEducationsOfCandidate(date, i) {
      this.educationsOfCandidate[i].start_at = date
      this.$v.educationsOfCandidate.$each.$iter[i].start_at.$touch()
    },

    // change end_at of educationsOfCandidate
    handleChangeEndAtOfEducationsOfCandidate(date, i) {
      this.educationsOfCandidate[i].end_at = date
      this.$v.educationsOfCandidate.$each.$iter[i].end_at.$touch()
    },

    // change receive_at of certificatesOfCandidate
    handleChangeReceiveAtOfCertificatesOfCandidate(date, i) {
      this.certificatesOfCandidate[i].receive_at = date
      this.$v.certificatesOfCandidate.$each.$iter[i].receive_at.$touch()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/user-profile.scss';
@import '../../styles/components/modal/_confirm_cancel_modal.scss';

</style>
