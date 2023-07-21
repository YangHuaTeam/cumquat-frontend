import Vue from 'vue'

const $IS_UNDER_DEV = true
const $global = {
  install (Vue) {
    Vue.prototype.$global = {
      $API_URL: ($IS_UNDER_DEV ? 'https://mock.apifox.cn/m1' : 'https://api.runcs.cc'),
      $SITE_NAME: 'Cumquat',
      $SITE_LOGO_URI: '/cumquat-logo.png',
      $BE_CONFIG: {
        $PAYMENT: {
          $FUND: {
            $ENABLE_ACCOUNT_BANNING_WHEN_ARREARS_OCCURRED: true
          }
        }
      },
      $BE_URL: {
        $ACCOUNT: ($IS_UNDER_DEV ? '/3043576-0-82d3ee57' : '/user'),
        $BILLING: ($IS_UNDER_DEV ? '/3043576-0-9d16ce0a' : '/bill'),
        $PRODUCT: ($IS_UNDER_DEV ? '/3043576-0-d29e07db' : '/product'),
        $INSTANCE: ($IS_UNDER_DEV ? '/3043576-0-67e82ade' : '/instance'),
        $PAYMENT: ($IS_UNDER_DEV ? '/3043576-0-d9ca29d5' : '/pay')
      }
    }
  }
}
Vue.use($global)
