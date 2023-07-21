import Vue from 'vue'

const $IS_UNDER_DEV = true
const $global = {
  install (Vue) {
    Vue.prototype.$global = {
      $API_URL: ($IS_UNDER_DEV ? 'https://adc8be3e-8185-45a7-8806-b707727247fb.mock.pstmn.io' : 'https://api.runcs.cc'),
      $SITE_NAME: 'Cumquat',
      $SITE_LOGO_URI: '/cumquat-logo.png',
      $BE_CONFIG: {
        $PAYMENT: {
          $FUND: {
            $ENABLE_ACCOUNT_DELETION_WHEN_ARREARS_OCCURRED: true
          }
        }
      },
      $BE_URL: {
        $ACCOUNT: '/user',
        $BILLING: '/bill',
        $PRODUCT: '/product',
        $INSTANCE: '/instance',
        $PAYMENT: '/pay'
      }
    }
  }
}
Vue.use($global)
