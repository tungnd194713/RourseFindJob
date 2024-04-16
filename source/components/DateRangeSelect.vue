<template>
  <div class="d-flex align-items-center height-fit-content flex-column flex-lg-row flex-xl-column flex-xxl-row">
    <div class="visa-date-from-contain">
      <div class="row mx-0">
        <template v-if="$i18n.locale === 'ja'">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content ps-0 pe-1">
            <div class="select-style">
              <select
                ref="startYearSelectRef"
                v-model="startYear"
                name="startYear"
                @change="onChangeStartDate()"
              >
                <option
                  v-for="(startYearOption, index) in startYearSelectList"
                  :key="index"
                  :value="startYearOption"
                >
                  {{ startYearOption }}
                </option>
              </select>
            </div>
            <div class="text-date">{{ $t('general.year') }}</div>
          </div>

          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content ps-0 pe-1 px-sm-1">
            <div class="select-style">
              <select
                ref="startMonthSelectRef"
                v-model="startMonth"
                name="startMonth"
                @change="onChangeStartDate()"
              >
                <option
                  v-for="(startMonthOption, index) in startMonthSelectList"
                  :key="index"
                  :value="startMonthOption"
                >
                  {{ startMonthOption }}
                </option>
              </select>
            </div>
            <div class="text-date">{{ $t('general.month') }}</div>
          </div>

          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content ps-0 pe-1 px-sm-1">
            <div class="select-style">
              <select
                ref="startDaySelectRef"
                v-model="startDay"
                name="startDay"
                @change="onChangeStartDate()"
              >
                <option
                  v-for="(startDayOption, index) in startDaySelectList"
                  :key="index"
                  :value="startDayOption"
                >
                  {{ startDayOption }}
                </option>
              </select>
            </div>
            <div class="text-date">{{ $t('general.day') }}</div>
          </div>
        </template>

        <template v-else>
          <div class="col-3 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content px-0 px-sm-0">
<!--            <div class="text-date d-block d-sm-none">{{ $t('general.day') }}</div>-->
            <div class="select-style">
              <select
                ref="startDaySelectRef"
                v-model="startDay"
                name="startDay"
                @change="onChangeStartDate()"
              >
                <option
                  v-for="(startDayOption, index) in startDaySelectList"
                  :key="index"
                  :value="startDayOption"
                >
                  {{ startDayOption }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content px-0 px-sm-0">
<!--            <div class="text-date d-block d-sm-none">{{ $t('general.month') }}</div>-->
            <div class="text-date text-center px-2 d-block d-sm-block">/</div>
            <div class="select-style">
              <select
                ref="startMonthSelectRef"
                v-model="startMonth"
                name="startMonth"
                @change="onChangeStartDate()"
              >
                <option
                  v-for="(startMonthOption, index) in startMonthSelectList"
                  :key="index"
                  :value="startMonthOption"
                >
                  {{ startMonthOption }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-5 col-sm-4 col-md-5 col-lg-5 col-xl-5 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content px-0 pe-sm-0">
<!--            <div class="text-date d-block d-sm-none">{{ $t('general.year') }}</div>-->
            <div class="text-date text-center px-2 d-block d-sm-block">/</div>
            <div class="select-style">
              <select
                ref="startYearSelectRef"
                v-model="startYear"
                name="startYear"
                @change="onChangeStartDate()"
              >
                <option
                  v-for="(startYearOption, index) in startYearSelectList"
                  :key="index"
                  :value="startYearOption"
                >
                  {{ startYearOption }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="visa-date-range-character-contain">
      ～
    </div>
    <div class="visa-date-to-contain">
      <div class="row mx-0">
        <template v-if="$i18n.locale === 'ja'">
          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content ps-0 pe-1">
            <div class="select-style">
              <select
                ref="endYearSelectRef"
                v-model="endYear"
                name="endYear"
                @change="onChangeEndDate()"
              >
                <option
                  v-for="(endYearOption, index) in endYearSelectList"
                  :key="index"
                  :value="endYearOption"
                >
                  {{ endYearOption }}
                </option>
              </select>
            </div>
            <div class="text-date">{{ $t('general.year') }}</div>
          </div>

          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content ps-0 pe-1 px-sm-1">
            <div class="select-style">
              <select
                ref="endMonthSelectRef"
                v-model="endMonth"
                name="endMonth"
                @change="onChangeEndDate()"
              >
                <option
                  v-for="(endMonthOption, index) in endMonthSelectList"
                  :key="index"
                  :value="endMonthOption"
                >
                  {{ endMonthOption }}
                </option>
              </select>
            </div>
            <div class="text-date">{{ $t('general.month') }}</div>
          </div>

          <div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content ps-0 pe-1 px-sm-1">
            <div class="select-style">
              <select
                ref="endDaySelectRef"
                v-model="endDay"
                name="endDay"
                @change="onChangeEndDate()"
              >
                <option
                  v-for="(endDayOption, index) in endDaySelectList"
                  :key="index"
                  :value="endDayOption"
                >
                  {{ endDayOption }}
                </option>
              </select>
            </div>
            <div class="text-date">{{ $t('general.day') }}</div>
          </div>
        </template>

        <template v-else>
          <div class="col-3 col-sm-4 col-md-3 col-lg-3 col-xl-3 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content px-0 px-sm-0">
<!--            <div class="text-date d-block d-sm-none">{{ $t('general.day') }}</div>-->
            <div class="select-style">
              <select
                ref="endDaySelectRef"
                v-model="endDay"
                name="endDay"
                @change="onChangeEndDate()"
              >
                <option
                  v-for="(endDayOption, index) in endDaySelectList"
                  :key="index"
                  :value="endDayOption"
                >
                  {{ endDayOption }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content px-0 px-sm-0">
<!--            <div class="text-date d-block d-sm-none">{{ $t('general.month') }}</div>-->
            <div class="text-date text-center px-2 d-block d-sm-block">/</div>
            <div class="select-style">
              <select
                ref="endMonthSelectRef"
                v-model="endMonth"
                name="endMonth"
                @change="onChangeEndDate()"
              >
                <option
                  v-for="(endMonthOption, index) in endMonthSelectList"
                  :key="index"
                  :value="endMonthOption"
                >
                  {{ endMonthOption }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-5 col-sm-4 col-md-5 col-lg-5 col-xl-5 mb-2 mb-sm-0 mb-md-0 mb-xl-0 d-flex align-items-center height-fit-content px-0 px-sm-0">
<!--            <div class="text-date d-block d-sm-none">{{ $t('general.year') }}</div>-->
            <div class="text-date text-center px-2 d-block d-sm-block">/</div>
            <div class="select-style">
              <select
                ref="endYearSelectRef"
                v-model="endYear"
                name="endYear"
                @change="onChangeEndDate()"
              >
                <option
                  v-for="(endYearOption, index) in endYearSelectList"
                  :key="index"
                  :value="endYearOption"
                >
                  {{ endYearOption }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DATE_FORMAT,
  YEAR_FORMAT,
  MONTH_FORMAT,
  DAY_FORMAT,
  ASC_ORDER,
  DESC_ORDER
} from '~/constants/main.js'
export default {
  name: "DateRangeSelect",

  props: {
    startDate: {
      type: String,
      // required: true,
      default: '',
    },
    canSelectStartDateInFuture: {
      type: Boolean,
      required: true
    },
    canSelectStartDateInPast: {
      type: Boolean,
      required: true
    },
    endDate: {
      type: String,
      // required: true,
      default: '',
    },
    canSelectEndDateInFuture: {
      type: Boolean,
      required: true
    },
    canSelectEndDateInPast: {
      type: Boolean,
      required: true
    },
  },

  data() {
    return {
      DATE_FORMAT,
      YEAR_FORMAT,
      MONTH_FORMAT,
      DAY_FORMAT,
      ASC_ORDER,
      DESC_ORDER,
      startYearSelectList: [],
      startMonthSelectList: [],
      startDaySelectList: [],
      startYear: this.formatDate(this.$moment(), YEAR_FORMAT),
      startMonth: '',
      startDay: '',
      endYearSelectList: [],
      endMonthSelectList: [],
      endDaySelectList: [],
      endYear: this.formatDate(this.$moment(), YEAR_FORMAT),
      endMonth: '',
      endDay: ''
    }
  },

  watch: {
    startDate: {
      handler(newVal) {
        if (this.$moment(newVal, DATE_FORMAT).isValid()) {
          this.startYear = this.formatDate(this.startDate, YEAR_FORMAT).toString()
          this.startMonth = this.formatDate(this.startDate, MONTH_FORMAT).toString()
          this.startDay = this.formatDate(this.startDate, DAY_FORMAT).toString()
        }
      },
      deep: true
    },

    startYear: {
      handler(newVal) {
        if (newVal && this.startMonth) {
          const numberDaysInMonth = this.getNumberDaysInMonth(this.startMonth, newVal)
          this.startDaySelectList = this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
            e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          )
          // if (!this.daySelectList.includes(this.day)) {
          //   this.day = this.daySelectList[0]
          // }
        }
      },
      deep: true
    },

    startMonth: {
      handler(newVal) {
        if (newVal && this.startYear) {
          const numberDaysInMonth = this.getNumberDaysInMonth(newVal, this.startYear)
          this.startDaySelectList = this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
            e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          )
          // if (!this.daySelectList.includes(this.day)) {
          //   this.day = this.daySelectList[0]
          // }
        }
      },
      deep: true
    },

    endDate: {
      handler(newVal) {
        if (this.$moment(newVal, DATE_FORMAT).isValid()) {
          this.endYear = this.formatDate(this.endDate, YEAR_FORMAT).toString()
          this.endMonth = this.formatDate(this.endDate, MONTH_FORMAT).toString()
          this.endDay = this.formatDate(this.endDate, DAY_FORMAT).toString()
        }
      },
      deep: true
    },

    endYear: {
      handler(newVal) {
        if (newVal && this.endMonth) {
          const numberDaysInMonth = this.getNumberDaysInMonth(this.endMonth, newVal)
          this.endDaySelectList = this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
            e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          )
          // if (!this.daySelectList.includes(this.day)) {
          //   this.day = this.daySelectList[0]
          // }
        }
      },
      deep: true
    },

    endMonth: {
      handler(newVal) {
        if (newVal && this.endYear) {
          const numberDaysInMonth = this.getNumberDaysInMonth(newVal, this.endYear)
          this.endDaySelectList = this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
            e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          )
          // if (!this.daySelectList.includes(this.day)) {
          //   this.day = this.daySelectList[0]
          // }
        }
      },
      deep: true
    },

    day: {
      handler(newVal) {

      },
      deep: true
    }
  },

  created() {
    this.assignData()
  },

  methods: {
    assignData() {
      this.startYearSelectList = this.calculateStartYearSelect()
      this.startMonthSelectList = this.calculateMonthSelect()
      this.startDaySelectList = this.calculateStartDaySelect()
      if (this.startDate) {
        this.startYear = this.formatDate(this.startDate, YEAR_FORMAT)
        this.startMonth = this.formatDate(this.startDate, MONTH_FORMAT)
        this.startDay = this.formatDate(this.startDate, DAY_FORMAT)
      }
      this.endYearSelectList = this.calculateEndYearSelect()
      this.endMonthSelectList = this.calculateMonthSelect()
      this.endDaySelectList = this.calculateEndDaySelect()
      if (this.endDate) {
        this.endYear = this.formatDate(this.endDate, YEAR_FORMAT)
        this.endMonth = this.formatDate(this.endDate, MONTH_FORMAT)
        this.endDay = this.formatDate(this.endDate, DAY_FORMAT)
      }
    },

    calculateStartYearSelect() {
      const yearNow = this.formatDate(this.$moment(), YEAR_FORMAT)
      if (this.canSelectStartDateInPast && this.canSelectStartDateInFuture) {
        return this.createRangeNumber(parseInt(yearNow) - 100, parseInt(yearNow) + 100, DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      } else if (this.canSelectStartDateInPast) {
        return this.createRangeNumber(parseInt(yearNow) - 100, parseInt(yearNow), DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      } else if (this.canSelectStartDateInFuture) {
        return this.createRangeNumber(parseInt(yearNow), parseInt(yearNow) + 100, DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      }
    },

    calculateMonthSelect() {
      return this.createRangeNumber(1, 12, ASC_ORDER).map(
        e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      )
    },

    calculateStartDaySelect() {
      if (this.startYear && this.startMonth) {
        const numberDaysInMonth = this.getNumberDaysInMonth(this.startMonth, this.startYear)
        return this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      }
      return this.createRangeNumber(1, 31, ASC_ORDER).map(
        e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      )
    },

    calculateEndYearSelect() {
      const yearNow = this.formatDate(this.$moment(), YEAR_FORMAT)
      if (this.canSelectEndDateInPast && this.canSelectEndDateInFuture) {
        return this.createRangeNumber(parseInt(yearNow) - 100, parseInt(yearNow) + 100, DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      } else if (this.canSelectEndDateInPast) {
        return this.createRangeNumber(parseInt(yearNow) - 100, parseInt(yearNow), DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      } else if (this.canSelectEndDateInFuture) {
        return this.createRangeNumber(parseInt(yearNow), parseInt(yearNow) + 100, DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      }
    },

    calculateEndDaySelect() {
      if (this.endYear && this.endMonth) {
        const numberDaysInMonth = this.getNumberDaysInMonth(this.endMonth, this.endYear)
        return this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      }
      return this.createRangeNumber(1, 31, ASC_ORDER).map(
        e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      )
    },

    onChangeStartDate() {
      let date = ''
      if (this.startYear && this.startMonth && this.startDay) {
        date = `${this.startYear}-${this.startMonth}-${this.startDay}`
      }
      this.$emit('changeStartDate', date)
    },

    onChangeEndDate() {
      let date = ''
      if (this.endYear && this.endMonth && this.endDay) {
        date = `${this.endYear}-${this.endMonth}-${this.endDay}`
      }
      this.$emit('changeEndDate', date)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/components/_date_range_select.scss";
</style>
