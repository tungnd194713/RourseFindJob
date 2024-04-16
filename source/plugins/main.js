import Vue from 'vue'
import {
  DATE_FORMAT,
  YEAR_FORMAT,
  MONTH_FORMAT,
  DAY_FORMAT,
  ASC_ORDER,
  DESC_ORDER
} from '~/constants/main.js'

// common methods
Vue.mixin({
  data() {
    return {
      DATE_FORMAT,
      YEAR_FORMAT,
      MONTH_FORMAT,
      DAY_FORMAT,
      ASC_ORDER,
      DESC_ORDER
    }
  },

  methods: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getNumberDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },

    formatDate(date, format) {
      return this.$moment(date).format(format)
    },

    createRangeNumber(start, end, order = ASC_ORDER) {
      // console.log('start log createRangeNumber')
      // console.log(start, end, order)
      // console.log('end log createRangeNumber')
      if (order === ASC_ORDER) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      } else if (order === DESC_ORDER) {
        return Array(end - start + 1).fill().map((_, idx) => end - idx)
      }
    }
  }
})
