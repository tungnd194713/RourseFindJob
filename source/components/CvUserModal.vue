<template>
  <div
    id="staticBackdrop"
    class="modal fade cv_user"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl position-relative">
      <div class="modal-content">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <img src="../assets/images/icon_modal_close.svg" alt="" />
        </button>
        <div
          v-if="cvType === defaultCvInSite"
          class="modal-body"
        >
        <div class="main-content">
          <div class="content">
            <div class="row">
              <div class="col-12 list-user">
                <table class="table">
                  <tbody>
                    <tr>
                      <td colspan="5" class="border-0">
                        <div class="d-flex align-items-end">
                          <h2 class="fw-bold flex-grow-1">{{ $t('cv_user.title') }}</h2>

                          <div v-if="$i18n.locale === 'vi'" class="time_cv">
                            Ngày
                            <span class="mx-0 mx-md-1">
                              {{
                                candidate.created_at
                                  ? $moment(candidate.created_at).format('DD')
                                  : $moment().format('DD')
                              }}
                            </span>
                            Tháng
                            <span class="mx-0 mx-md-1">
                              {{
                                candidate.created_at
                                  ? $moment(candidate.created_at).format('MM')
                                  : $moment().format('MM')
                              }}
                            </span>
                            Năm
                            <span class="mx-0 mx-md-1">
                              {{
                                candidate.created_at
                                  ? $moment(candidate.created_at).format('YYYY')
                                  : $moment().format('YYYY')
                              }}
                            </span>
                          </div>
                          <div v-if="$i18n.locale === 'ja'" class="time_cv">
                            <span class="mx-0 mx-md-1">
                              {{
                                candidate.created_at
                                  ? $moment(candidate.created_at).format('YYYY')
                                  : $moment().format('YYYY')
                              }}
                            </span>年
                            <span class="mx-0 mx-md-1">
                              {{
                                candidate.created_at
                                  ? $moment(candidate.created_at).format('MM')
                                  : $moment().format('MM')
                              }}
                            </span>月
                            <span class="mx-0 mx-md-1">
                              {{
                                candidate.created_at
                                  ? $moment(candidate.created_at).format('DD')
                                  : $moment().format('DD')
                              }}
                            </span>日現在
                          </div>

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="border-bottom-dot text-center w-20-percent">{{ $t('cv_user.furigana')}}</td>
                      <td colspan="3" class="border-bottom-dot overflow-wrap-anywhere">
                        {{candidate.katakana_name}}
                      </td>
                      <td rowspan="2">
                        <div class="text-center mb-3">{{ $t('cv_user.gender')}}</div>
                        <div v-if="$i18n.locale === 'vi'" class="text-center">{{ defaultLangAndText.defaultGenderListVi[candidate.gender]}}</div>
                        <div v-if="$i18n.locale === 'ja'" class="text-center">{{ defaultLangAndText.defaultGenderListJa[candidate.gender]}}</div>
                      </td>
                      <td rowspan="4" class="card-photo">
                        <img
                          v-if="candidate.profile_image"
                          :src="url_file + candidate.profile_image"
                          alt=""
                        />
                        <img
                          v-else
                          src="~/assets/images/users/draft/avt.svg"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="border-top-dot text-center">{{ $t('cv_user.name')}}</td>
                      <td colspan="3" class="border-top-dot overflow-wrap-anywhere">
                        {{
                          candidate.first_name
                            ? candidate.first_name.toUpperCase()
                            : ''
                        }}
                        {{ candidate.name ? candidate.name.toUpperCase() : '' }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">{{ $t('cv_user.birthday')}}</td>
                      <td v-if="$i18n.locale === 'vi'" colspan="3">
                        <div>
                          Ngày
                          <span class="mx-2 mx-md-3">
                            {{ $moment(candidate.birthday).format('DD/MM/YYYY')}}
                          </span>
                        </div>
                        <div class="text-center">
                          (Tròn <span class="mx-2 mx-md-3">{{ Math.abs($moment(candidate.birthday).diff($moment(), 'years'))}}</span>tuổi)
                        </div>
                      </td>
                      <td v-if="$i18n.locale === 'ja'" colspan="3">
                        <div>
                          {{ $moment(candidate.birthday).format('YYYY')}}年
                          <span class="mx-2 mx-md-3">
                            {{ $moment(candidate.birthday).format('MM')}}月
                          </span>
                          {{ $moment(candidate.birthday).format('DD')}}日生
                        </div>
                        <div class="text-center">
                          (満<span class="mx-2 mx-md-3">{{ Math.abs($moment(candidate.birthday).diff($moment(), 'years'))}}</span>歳)
                        </div>
                      </td>
                      <td>
                        <div class="text-center">{{ $t('cv_user.nationality')}}</div>
                        <div v-if="$i18n.locale === 'vi'" class="text-center">{{ defaultLangAndText.defaultNationalityListVi[candidate.nationality - 1]}}</div>
                        <div v-if="$i18n.locale === 'ja'" class="text-center">{{ defaultLangAndText.defaultNationalityListJa[candidate.nationality - 1]}}</div>
                      </td>
                      <!--<td>
                        <div class="text-start">Tiếng mẹ đẻ</div>
                        <div class="text-center">
                          {{
                            defaultLangAndText.defaultLanguageListVi[
                              candidate.language - 1
                            ]
                          }}
                        </div>
                      </td>-->
                    </tr>
                    <tr>
                      <td colspan="2" class="w-30-percent">
                        <div class="text-start">{{ $t('cv_user.phone_number')}}</div>
                        <div class="text-center">
                          {{ candidate.phone_number }}
                        </div>
                      </td>
                      <td colspan="3">
                        <div class="text-start">{{ $t('cv_user.email') }}</div>
                        <div class="text-center word-break-break-all">{{ candidate.email }}</div>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">{{ $t('cv_user.address')}}</td>
                      <td colspan="5" class="overflow-wrap-anywhere">
                        {{ candidate.postal_code ? '〒' + candidate.postal_code + ', ' : '' }}
                        {{ candidate.province_id > 0 ? $t(provincesList[candidate.province_id]) + ', ' : '' }}
                        {{
                          translateCandidate.district
                          ? translateCandidate.district + ', '
                            : (candidate.district ? candidate.district + ', ' : '')
                        }}
                        {{
                          translateCandidate.address
                          ? translateCandidate.address
                          : (candidate.address ? candidate.address : '')
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <table class="table border-2">
                  <thead>
                    <tr class="text-center">
                      <th class="w-20-percent">{{ $t('cv_user.year') }}</th>
                      <th class="w-15-percent">{{ $t('cv_user.month') }}</th>
                      <th>{{ $t('cv_user.educations') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- start educationsOfCandidate -->
                    <template v-if="educationsOfCandidate.length > 0">
                      <tr
                        v-for="education in educationsOfCandidate"
                        :key="`education_${education.id}`"
                      >
                        <td v-if="$i18n.locale === 'vi'" class="text-center">Năm {{ $moment(education.start_at).format('YYYY')}}</td>
                        <td v-if="$i18n.locale === 'vi'" class="text-center">{{ $moment(education.start_at).format('M')}}</td>
                        <td v-if="$i18n.locale === 'ja'" class="text-center">{{ $moment(education.start_at).format('YYYY')}}年</td>
                        <td v-if="$i18n.locale === 'ja'" class="text-center">{{ $moment(education.start_at).format('M')}}月</td>
                        <td>
                          <div class="row">
                            <div class="col-9 overflow-wrap-anywhere">{{ education.name }}</div>
                            <div v-if="$i18n.locale === 'vi'" class="col-3">
                              {{ defaultLangAndText.defaultEducationsListVi[education.status - 1]}}
                            </div>
                            <div v-if="$i18n.locale === 'ja'" class="col-3">
                              {{ defaultLangAndText.defaultEducationsListJa[education.status - 1]}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td class="text-right">{{ $t('cv_user.end') }}</td>
                      </tr>
                      <tr
                        v-for="(item) in defaultRowAfterEndOfEducationsArr"
                        :key="`defaultRowAfterEndOfEducation_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>

                    <template v-else>
                      <tr
                        v-for="(item) in defaultRowOfEducationsArr"
                        :key="`defaultRowOfEducation_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>
                    <!-- end educationsOfCandidate -->

                    <tr class="text-center border-2">
                      <th>{{ $t('cv_user.year')}}</th>
                      <th>{{ $t('cv_user.month')}}</th>
                      <th>{{ $t('cv_user.jobs')}}</th>
                    </tr>

                    <!-- start jobsOfCandidate -->
                    <template v-if="jobsOfCandidate.length > 0">
                      <tr v-for="job in jobsOfCandidate" :key="`job_${job.id}`">
                        <td v-if="$i18n.locale === 'vi'" class="text-center">Năm {{ $moment(job.start_at).format('YYYY')}}</td>
                        <td v-if="$i18n.locale === 'vi'" class="text-center">{{ $moment(job.start_at).format('M')}}</td>
                        <td v-if="$i18n.locale === 'ja'" class="text-center">{{ $moment(job.start_at).format('YYYY')}}年</td>
                        <td v-if="$i18n.locale === 'ja'" class="text-center">{{ $moment(job.start_at).format('M')}}月</td>
                        <td>
                          <div class="row">
                            <div class="col-9 overflow-wrap-anywhere">{{ job.name }}</div>
                            <div v-if="$i18n.locale === 'vi'" class="col-3">
                              {{ job.status === 1 ?
                              '～' + $moment(job.end_at).format('M/YYYY') :
                              'Hiện đang làm'}}
                            </div>
                            <div v-if="$i18n.locale === 'ja'" class="col-3">
                              {{ job.status === 1 ?
                              '～' + $moment(job.end_at).format('M/YYYY') :
                              '在職中'}}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td class="text-right">{{ $t('cv_user.end') }}</td>
                      </tr>
                      <tr
                        v-for="(item) in defaultRowAfterEndOfJobsArr"
                        :key="`defaultRowAfterEndOfJob_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr
                        v-for="(item) in defaultRowOfJobsArr"
                        :key="`defaultRowOfJob_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>
                    <!-- end jobsOfCandidate -->

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="row">
              <div class="col-12 list-user">
                <table class="table tb-certificate border-2 text-center m-0">
                  <thead>
                    <tr>
                      <th>{{ $t('cv_user.self_assessment')}}</th>
                      <th colspan="4">
                        {{ $t('cv_user.level_1')}}
                        &emsp;
                        {{ $t('cv_user.level_2')}}
                        <br>
                        {{ $t('cv_user.level_3')}}
                      </th>
                    </tr>
                    <tr>
                      <th>{{ $t('cv_user.skill')}}</th>
                      <th>{{ $t('cv_user.skill_listen')}}</th>
                      <th>{{ $t('cv_user.skill_speak')}}</th>
                      <th>{{ $t('cv_user.skill_read')}}</th>
                      <th>{{ $t('cv_user.skill_write')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- start candidate_foreign_languages -->
                    <template v-if="candidate.candidate_foreign_languages.length > 0">
                      <tr
                        v-for="(language, index) in candidate.candidate_foreign_languages"
                        :key="`foreignLanguage_${index}`"
                      >
                        <td class="overflow-wrap-anywhere">{{ language.language_name }}</td>
                        <td>
                          {{ showIconSkill(JSON.parse(language.skill).listen) }}
                        </td>
                        <td>
                          {{ showIconSkill(JSON.parse(language.skill).speak) }}
                        </td>
                        <td>
                          {{ showIconSkill(JSON.parse(language.skill).read) }}
                        </td>
                        <td>
                          {{ showIconSkill(JSON.parse(language.skill).write) }}
                        </td>
                      </tr>
                      <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr
                        v-for="(item) in defaultRowAfterEndOfForeignLanguageArr"
                        :key="`defaultRowAfterEndOfForeignLanguage_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>
                    <teplate v-else>
                      <tr
                        v-for="(item) in defaultRowOfForeignLanguageArr"
                        :key="`defaultRowOfForeignLanguage_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </teplate>
                    <!-- end candidate_foreign_languages -->

                  </tbody>
                </table>

                <table
                  class="table tb-certificate text-center border-2 border-top-0"
                >
                  <thead>
                    <tr>
                      <th class="w-20-percent">{{ $t('cv_user.year')}}</th>
                      <th class="w-15-percent">{{ $t('cv_user.month')}}</th>
                      <th>{{ $t('cv_user.certificates')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- start candidate_certificates -->
                    <template v-if="candidate.candidate_certificates.length > 0">
                      <tr
                        v-for="(certificate, index) in candidate.candidate_certificates"
                        :key="`certificate_${index}`"
                      >
                        <td>
                          {{ $i18n.locale === 'vi' ? $t('cv_user.year') : '' }}
                          {{ $moment(certificate.receive_at).format('YYYY')}}
                          {{ $i18n.locale === 'ja' ? $t('cv_user.year') : '' }}
                        </td>
                        <td>
                          {{ $moment(certificate.receive_at).format('M')}}
                          {{ $i18n.locale === 'ja' ? $t('cv_user.month') : '' }}
                        </td>
                        <td class="text-start overflow-wrap-anywhere">{{ certificate.name }}</td>
                      </tr>
                      <tr class="text-center">
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr
                        v-for="(item) in defaultRowAfterEndOfCertificatesArr"
                        :key="`defaultRowAfterEndOfCertificate_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr
                        v-for="(item) in defaultRowOfCertificatesArr"
                        :key="`defaultRowOfCertificate_${item}`"
                        class="text-center"
                      >
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </template>
                    <!-- end candidate_certificates -->
                  </tbody>
                </table>

                <table class="table border-2">
                  <tbody>
                    <tr>
                      <td>{{ $t('cv_user.strength')}}</td>
                    </tr>
                    <tr>
                      <td class="py-4 white-space-pre-line overflow-wrap-anywhere">
                        {{
                          translateCandidate.strength
                          ? translateCandidate.strength
                          : candidate.strength
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>{{ $t('cv_user.reason_apply')}}</td>
                    </tr>
                    <tr>
                      <td class="py-4 white-space-pre-line overflow-wrap-anywhere">
                        {{
                          translateCandidate.reason_apply
                            ? translateCandidate.reason_apply
                            : candidate.reason_apply
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table class="table tb-2 text-center border-2 mb-0">
                  <tbody>
                    <tr>
                      <td class="w-30-percent vertical-align-middle">{{ $t('cv_user.married_status')}}</td>
                      <td class="w-30-percent vertical-align-middle">{{ $t('cv_user.dependent_person_part_1')}}<br>{{ $t('cv_user.dependent_person_part_2')}}</td>
                      <td class="vertical-align-middle">{{ $t('cv_user.health_part_1')}}<br>{{ $t('cv_user.health_part_2')}}</td>
                    </tr>
                    <tr v-if="$i18n.locale === 'vi'">
                      <td>{{ defaultLangAndText.defaultMarriedStatusListVi[candidate.married_status - 1]}}</td>
                      <td class="w-25">{{ defaultLangAndText.defaultDependentPersonListVi[candidate.dependent_person]}}</td>
                      <td>
                        {{ defaultLangAndText.defaultHealthListVi[candidate.health - 1]}}{{ (candidate.health == 2 && translateCandidate.disease_name) ? ': ' + translateCandidate.disease_name : ''}}
                      </td>
                    </tr>
                    <tr v-if="$i18n.locale === 'ja'">
                      <td>{{ defaultLangAndText.defaultMarriedStatusListJa[candidate.married_status - 1]}}</td>
                      <td class="w-25">{{ defaultLangAndText.defaultDependentPersonListJa[candidate.dependent_person]}}</td>
                      <td>{{ defaultLangAndText.defaultHealthListJa[candidate.health - 1]}}{{ (candidate.health == 2 && translateCandidate.disease_name) ? ': ' + translateCandidate.disease_name : ''}}</td>
                    </tr>
                  </tbody>
                </table>
                <table class="table tb-2 text-center border-2 border-top-0 vertical-align-middle">
                  <tbody>
                    <tr>
                      <td class="w-30-percent">{{ $t('cv_user.stay_experience_date')}}</td>
                      <td class="white-space-pre-line word-break-break-all w-30-percent border-bottom-dot">
<!--                        {{-->
<!--                          translateCandidate.stay_experience_date-->
<!--                          ? translateCandidate.stay_experience_date-->
<!--                          : candidate.stay_experience_date-->
<!--                        }} {{ $t('general.year') }}-->
                        {{ candidate.stay_experience_date ? candidate.stay_experience_date + ' ' + $t('general.year') : '' }}
                      </td>
<!--                      <td rowspan="2">{{ $t('cv_user.visa_part_1')}}<br>{{ $t('cv_user.visa_part_2')}}</td>-->
                      <td>{{ $t('general.status_stay')}}</td>
                      <td class="border-bottom-dot">{{ $t(statusStayList[candidate.status_stay])}}</td>
                    </tr>
                    <tr>
                      <td>{{ $t('cv_user.stay_experience_purpose')}}</td>
                      <td class="border-top-dot white-space-pre-line overflow-wrap-anywhere">
                        {{
                          translateCandidate.stay_experience_purpose
                          ? translateCandidate.stay_experience_purpose
                          : candidate.stay_experience_purpose
                        }}
                      </td>
                      <td>{{ $t('cv_user.visa_date')}}</td>
                      <td
                        v-if="$i18n.locale === 'ja'"
                        class="border-top-dot"
                      >
                        {{ $moment(candidate.visa_date_from).format('YYYY/MM/DD') }}
                        <br>
                        ～
                        <br>
                        {{ $moment(candidate.visa_date_to).format('YYYY/MM/DD') }}
                      </td>
                      <td
                        v-else
                        class="border-top-dot"
                      >
                        {{ $moment(candidate.visa_date_from).format('DD/MM/YYYY') }}
                        <br>
                        ～
                        <br>
                        {{ $moment(candidate.visa_date_to).format('DD/MM/YYYY') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
          

          <div class="d-flex justify-content-end footer">
            <img
              src="../assets/images/icon_pdf_download.svg"
              alt=""
              class="cursor-pointer"
              @click="exportPdf"
            />
            <button
              class="btn btn-outline-secondary ms-5"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {{ $t('cv_user.close') }}
            </button>
          </div>
        </div>

        <div
          v-if="cvType === defaultCvUpload"
          class="modal-body"
        >
          <div class="content cv-type-upload">
            <object
              type="application/pdf"
              :data="url_file + candidate.file_cv_upload"
              width="100%"
              height="500px"
              style="height: 1000px"
            >
              No Support
            </object>
          </div>

          <div class="d-flex justify-content-end footer">
            <!--            <img src="../../assets/images/icon_pdf_download.svg" alt="" @click="exportPdf()">-->
            <button class="btn btn-outline-secondary ms-5" data-bs-dismiss="modal" aria-label="Close">{{ $t('cv_user.close')}}</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import defaultInCvUser from '~/constants/defaultInCvUser'
import visaTypes from "~/constants/visaTypes"
import theProvinces from "~/constants/provinces"
import statusStayList from '~/constants/statusStay'

const CV_IN_SITE = 1
const CV_UPLOAD = 2
const DEFAULT_NUMBER_ROW_OF_EDUCATIONS = 9
const DEFAULT_NUMBER_ROW_END_OF_EDUCATIONS = 2
const DEFAULT_NUMBER_ROW_OF_JOBS = 9
const DEFAULT_NUMBER_ROW_END_OF_JOBS = 2
const DEFAULT_NUMBER_ROW_OF_FOREIGN_LANGUAGE = 3
const DEFAULT_NUMBER_ROW_END_OF_FOREIGN_LANGUAGE = 1
const DEFAULT_NUMBER_ROW_OF_CERTIFICATES = 5
const DEFAULT_NUMBER_ROW_END_OF_CERTIFICATES = 1

export default {
  name: 'CvUserModal',

  props: {
    candidate: {
      type: Object,
      required: true,
    },
    translateCandidate: {
      type: Object,
      required: true,
    },
    educationsOfCandidate: {
      type: Array,
      required: true,
    },
    jobsOfCandidate: {
      type: Array,
      required: true,
    },
    cvType: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      DEFAULT_NUMBER_ROW_OF_EDUCATIONS,
      DEFAULT_NUMBER_ROW_END_OF_EDUCATIONS,
      DEFAULT_NUMBER_ROW_OF_JOBS,
      DEFAULT_NUMBER_ROW_END_OF_JOBS,
      DEFAULT_NUMBER_ROW_OF_FOREIGN_LANGUAGE,
      DEFAULT_NUMBER_ROW_END_OF_FOREIGN_LANGUAGE,
      DEFAULT_NUMBER_ROW_OF_CERTIFICATES,
      DEFAULT_NUMBER_ROW_END_OF_CERTIFICATES,
      url_file: process.env.URL_FILE,
      defaultLangAndText: defaultInCvUser,
      visaTypesList: visaTypes,
      defaultCvInSite: CV_IN_SITE,
      defaultCvUpload: CV_UPLOAD,
      provincesList: theProvinces,
      statusStayList,
      defaultRowOfEducationsArr: this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_EDUCATIONS),
      defaultRowOfJobsArr: this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_JOBS),
      defaultRowOfForeignLanguageArr: this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_FOREIGN_LANGUAGE),
      defaultRowOfCertificatesArr: this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_CERTIFICATES),
    }
  },

  computed: {
    defaultRowAfterEndOfEducationsArr() {
      let result = []
      const num = this.educationsOfCandidate.length + DEFAULT_NUMBER_ROW_END_OF_EDUCATIONS
      if (this.educationsOfCandidate.length > 0 && num < DEFAULT_NUMBER_ROW_OF_EDUCATIONS) {
        result = this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_EDUCATIONS - num)
      }
      return result
    },
    defaultRowAfterEndOfJobsArr() {
      let result = []
      const num = this.jobsOfCandidate.length + DEFAULT_NUMBER_ROW_END_OF_JOBS
      if (this.jobsOfCandidate.length > 0 && num < DEFAULT_NUMBER_ROW_OF_JOBS) {
        result = this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_JOBS - num)
      }
      return result
    },
    defaultRowAfterEndOfForeignLanguageArr() {
      let result = []
      const num = this.candidate.candidate_foreign_languages.length + DEFAULT_NUMBER_ROW_END_OF_FOREIGN_LANGUAGE
      if (this.candidate.candidate_foreign_languages.length > 0 && num < DEFAULT_NUMBER_ROW_OF_FOREIGN_LANGUAGE) {
        result = this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_FOREIGN_LANGUAGE - num)
      }
      return result
    },
    defaultRowAfterEndOfCertificatesArr() {
      let result = []
      const num = this.candidate.candidate_certificates.length + DEFAULT_NUMBER_ROW_END_OF_CERTIFICATES
      if (this.candidate.candidate_certificates.length > 0 && num < DEFAULT_NUMBER_ROW_OF_CERTIFICATES) {
        result = this.createRangeNumber(1, DEFAULT_NUMBER_ROW_OF_CERTIFICATES - num)
      }
      return result
    },
  },

  created() {

  },

  updated() {
    if (this.cvType === CV_UPLOAD) {
      const pdfObjectElement = document.createElement('object')
      pdfObjectElement.type = "application/pdf"
      pdfObjectElement.data = this.url_file + this.candidate.file_cv_upload
      pdfObjectElement.width = "100%"
      pdfObjectElement.height = "500px"
      pdfObjectElement.style = "height: 1000px"
      pdfObjectElement.textContent = "No Support"
      document.querySelector('.cv-type-upload').innerHTML = ''
      document.querySelector('.cv-type-upload').appendChild(pdfObjectElement)
    }
  },

  methods: {
    async exportPdf() {
      return await this.$repositories.candidates
        .exportPdf(this.$i18n.locale, this.translateCandidate, {
          responseType: 'blob',
        })
        .then((res) => {
          if (res.status === 200) {
            const file = new Blob([res.data], { type: 'application/pdf' })
            // const fileURL = URL.createObjectURL(file)
            // window.open(fileURL, '_blank')

            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = `cv-${this.candidate.name}-${this.$i18n.locale}.pdf`
            link.click();
            URL.revokeObjectURL(link.href);
          }
        })
    },

    showIconSkill(level) {
      if (level === 1) {
        return '◯'
      } else if (level === 2) {
        return '△'
      } else if (level === 3) {
        return '×'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/components/cv_user.scss';
</style>
