import Vue from 'vue'

const $global = {
  install (Vue) {
    Vue.prototype.$global = {
      $API_URL: 'https://api.runcs.cc',
      $SITE_NAME: 'Cumquat',
      $SITE_LOGO_URI: '/cumquat-logo.png'
    }
  }
}
Vue.use($global)
