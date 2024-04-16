<template>
  <div class="row"
       :class="{ 'mx-0': $i18n.locale === 'vi' }"
  >
    <template v-if="$i18n.locale === 'ja'">
      <div class="col-12 col-sm-4 col-md-12 col-xl-4 mb-2 mb-sm-0 mb-md-2 mb-xl-0 d-flex align-items-center height-fit-content">
        <div class="select-style">
          <select
            ref="yearSelectRef"
            v-model="year"
            name="year"
            @change="onChangeDate()"
          >
            <option
              v-for="(yearOption, index) in yearSelectList"
              :key="index"
              :value="yearOption"
            >
              {{ yearOption }}
            </option>
          </select>
        </div>
        <div class="text-date">{{ $t('general.year') }}</div>
      </div>

      <div class="col-12 col-sm-4 col-md-12 col-xl-4 mb-2 mb-sm-0 mb-md-2 mb-xl-0 d-flex align-items-center height-fit-content">
        <div class="select-style">
          <select
            ref="monthSelectRef"
            v-model="month"
            name="month"
            @change="onChangeDate()"
          >
            <option
              v-for="(monthOption, index) in monthSelectList"
              :key="index"
              :value="monthOption"
            >
              {{ monthOption }}
            </option>
          </select>
        </div>
        <div class="text-date">{{ $t('general.month') }}</div>
      </div>

      <div class="col-12 col-sm-4 col-md-12 col-xl-4 mb-2 mb-sm-0 mb-md-2 mb-xl-0 d-flex align-items-center height-fit-content">
        <div class="select-style">
          <select
            ref="daySelectRef"
            v-model="day"
            name="day"
            @change="onChangeDate()"
          >
            <option
              v-for="(dayOption, index) in daySelectList"
              :key="index"
              :value="dayOption"
            >
              {{ dayOption }}
            </option>
          </select>
        </div>
        <div class="text-date">{{ $t('general.day') }}</div>
      </div>
    </template>

    <template v-else>
      <div class="col-3 col-sm-4 col-md-12 col-lg-3 mb-2 mb-sm-0 mb-md-2 mb-xl-0 d-flex align-items-center height-fit-content px-0">
        <div class="text-date d-none d-sm-none d-md-block d-lg-none">{{ $t('general.day') }}</div>
        <div class="select-style">
          <select
            ref="daySelectRef"
            v-model="day"
            name="day"
            @change="onChangeDate()"
          >
            <option
              v-for="(dayOption, index) in daySelectList"
              :key="index"
              :value="dayOption"
            >
              {{ dayOption }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-4 col-sm-4 col-md-12 col-lg-4 mb-2 mb-sm-0 mb-md-2 mb-xl-0 d-flex align-items-center height-fit-content px-0">
        <div class="text-date d-none d-sm-none d-md-block d-lg-none">{{ $t('general.month') }}</div>
        <div class="text-date text-center px-2 d-block d-sm-block d-md-none d-lg-block">/</div>
        <div class="select-style">
          <select
            ref="monthSelectRef"
            v-model="month"
            name="month"
            @change="onChangeDate()"
          >
            <option
              v-for="(monthOption, index) in monthSelectList"
              :key="index"
              :value="monthOption"
            >
              {{ monthOption }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-5 col-sm-4 col-md-12 col-lg-5 mb-2 mb-sm-0 mb-md-2 mb-xl-0 d-flex align-items-center height-fit-content px-0">
        <div class="text-date d-none d-sm-none d-md-block d-lg-none">{{ $t('general.year') }}</div>
        <div class="text-date text-center px-2 d-block d-sm-block d-md-none d-lg-block">/</div>
        <div class="select-style">
          <select
            ref="yearSelectRef"
            v-model="year"
            name="year"
            @change="onChangeDate()"
          >
            <option
              v-for="(yearOption, index) in yearSelectList"
              :key="index"
              :value="yearOption"
            >
              {{ yearOption }}
            </option>
          </select>
        </div>
      </div>
    </template>
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
  name: "DateSelect",

  props: {
    date: {
      type: String,
      // required: true,
      default: '',
    },
    canSelectDateInFuture: {
      type: Boolean,
      required: true
    },
    canSelectDateInPast: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      DATE_FORMAT,
      YEAR_FORMAT,
      MONTH_FORMAT,
      DAY_FORMAT,
      ASC_ORDER,
      DESC_ORDER,
      yearSelectList: [],
      monthSelectList: [],
      daySelectList: [],
      year: this.formatDate(this.$moment(), YEAR_FORMAT),
      month: '',
      day: ''
    }
  },

  watch: {
    date: {
      handler(newVal) {
        // console.log('start log watch date')
        // console.log('newVal: ' + newVal)
        if (newVal !== '' && newVal !== null && newVal !== undefined) {
          if (this.$moment(newVal, DATE_FORMAT).isValid()) {
            this.year = this.formatDate(this.date, YEAR_FORMAT).toString()
            this.month = this.formatDate(this.date, MONTH_FORMAT).toString()
            this.day = this.formatDate(this.date, DAY_FORMAT).toString()
          }
        } else {
          // this.resetYearMonthDayToCurrentDate()
        }
        // console.log('end log watch date')
      },
      deep: true
    },

    year: {
      handler(newVal) {
        // console.log('start log watch year')
        // console.log('newVal: ' + newVal)
        // console.log('this.year: ' + this.year)
        if (this.$moment(newVal, YEAR_FORMAT).isValid() && this.$moment(this.month, YEAR_FORMAT).isValid()) {
          const numberDaysInMonth = this.getNumberDaysInMonth(this.month, newVal)
          // console.log('numberDaysInMonth: ' + numberDaysInMonth)
          this.daySelectList = this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
            e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          )
          // if (!this.daySelectList.includes(this.day)) {
          //   this.day = this.daySelectList[0]
          // }
        } else {
          // this.resetYearMonthDayToCurrentDate()
        }
        // console.log('end log watch year')
      },
      deep: true
    },

    month: {
      handler(newVal) {
        // console.log('start log watch month')
        // console.log('newVal: ' + newVal)
        if (newVal && this.year) {
          const numberDaysInMonth = this.getNumberDaysInMonth(newVal, this.year)
          // console.log('numberDaysInMonth: ' + numberDaysInMonth)
          this.daySelectList = this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
            e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
          )
          // if (!this.daySelectList.includes(this.day)) {
          //   this.day = this.daySelectList[0]
          // }
        }
        // console.log('end log watch month')
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
      this.yearSelectList = this.calculateYearSelect()
      this.monthSelectList = this.calculateMonthSelect()
      this.daySelectList = this.calculateDaySelect()
      if (this.date) {
        this.year = this.formatDate(this.date, YEAR_FORMAT)
        this.month = this.formatDate(this.date, MONTH_FORMAT)
        this.day = this.formatDate(this.date, DAY_FORMAT)
      }
    },

    calculateYearSelect() {
      const yearNow = this.formatDate(this.$moment(), YEAR_FORMAT)
      if (this.canSelectDateInPast && this.canSelectDateInFuture) {
        return this.createRangeNumber(parseInt(yearNow) - 100, parseInt(yearNow) + 100, DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      } else if (this.canSelectDateInPast) {
        return this.createRangeNumber(parseInt(yearNow) - 100, parseInt(yearNow), DESC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      } else if (this.canSelectDateInFuture) {
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

    calculateDaySelect() {
      if (this.year && this.month) {
        const numberDaysInMonth = this.getNumberDaysInMonth(this.month, this.year)
        return this.createRangeNumber(1, numberDaysInMonth, ASC_ORDER).map(
          e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        )
      }
      return this.createRangeNumber(1, 31, ASC_ORDER).map(
        e => e.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      )
    },

    onChangeDate() {
      let date = ''
      if (this.year && this.month && this.day) {
        date = `${this.year}-${this.month}-${this.day}`
      }
      this.$emit('changeDate', date)
    },

    resetYearMonthDayToCurrentDate() {
      this.year = this.formatDate(this.$moment(), YEAR_FORMAT)
      this.month = this.formatDate(this.$moment(), MONTH_FORMAT)
      this.day = this.formatDate(this.$moment(), DAY_FORMAT)
    },

    resetYearMonthDayToEmpty() {
      this.year = ''
      this.month = ''
      this.day = ''
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/components/_date_select.scss";
</style>
