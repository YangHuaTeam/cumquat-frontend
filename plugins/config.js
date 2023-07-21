import Vue from 'vue'

const $IS_UNDER_DEV = true
const $global = {
  install (Vue) {
    Vue.prototype.$global = {
      $API_URL: ($IS_UNDER_DEV ? 'https://adc8be3e-8185-45a7-8806-b707727247fb.mock.pstmn.io' : 'https://api.runcs.cc'),
      $SITE_NAME: 'Cumquat',
      $SITE_LOGO_URI: '/cumquat-logo.png'
    }
  }
}
Vue.use($global)
