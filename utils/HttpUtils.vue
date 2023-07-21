<script>
import SessionUtils from '~/utils/SessionUtils.vue'
export default {
  name: 'HttpUtils',
  mixins: [SessionUtils],
  methods: {
    sendPostToApi (operationType, requestApiURI, objectData, callbackFunc, takeActionIfSessionIsExpired) {
      const postData = {}
      postData.data = objectData
      if (operationType === 'account') {
        requestApiURI = this.$global.$BE_URL.$ACCOUNT + requestApiURI
      } else if (operationType === 'payment') {
        requestApiURI = this.$global.$BE_URL.$PAYMENT + requestApiURI
      } else if (operationType === 'billing') {
        requestApiURI = this.$global.$BE_URL.$BILLING + requestApiURI
      } else if (operationType === 'instance') {
        requestApiURI = this.$global.$BE_URL.$INSTANCE + requestApiURI
      } else if (operationType === 'product') {
        requestApiURI = this.$global.$BE_URL.$PRODUCT + requestApiURI
      }
      this.$axios.post(this.$global.$API_URL + requestApiURI, postData)
        .then((data) => {
          const result = {}
          result.data = data.data
          result.isError = false
          callbackFunc(result)
          return true
        }).catch((error) => {
          const errorObj = {}
          errorObj.isError = true
          if (error.message === 'Network Error') {
            errorObj.code = -1
            errorObj.message = '网络异常, 请稍后再试'
          } else if (error.response !== undefined) {
            if (error.response.status === 404) {
              errorObj.code = 404
              errorObj.message = '页面未找到'
              errorObj.data = error.response.data
            } else if (error.response.status === 403) {
              errorObj.code = 403
              errorObj.message = '您没有权限访问目标页面'
              errorObj.data = error.response.data
            } else if (error.response.status === 500) {
              errorObj.code = 500
              errorObj.message = '服务器内部错误, 请稍后再试'
              errorObj.data = error.response.data
            } else if (error.response.status === 502) {
              errorObj.code = 502
              errorObj.message = '网关错误, 请稍后再试'
              errorObj.data = error.response.data
            } else if (error.response.status === 503) {
              errorObj.code = 503
              errorObj.message = '服务不可用, 请稍后再试'
              errorObj.data = error.response.data
            } else if (error.response.status === 422) {
              errorObj.code = 422
              errorObj.message = '参数错误'
              errorObj.data = error.response.data
            } else if (error.response.status === 401) {
              errorObj.code = 401
              errorObj.message = '登录以继续'
              errorObj.data = error.response.data
              if (takeActionIfSessionIsExpired) {
                this.deleteCookieValue('frontendTempSession')
                this.checkIfSessionIdExist()
              }
            } else {
              if (error.response.status !== undefined) {
                errorObj.code = error.response.status
              } else {
                errorObj.code = 0
                errorObj.message = '网络异常, 请稍后再试'
              }
              errorObj.data = error.response.data
            }
          } else {
            errorObj.code = 0
            errorObj.message = '发生未知错误'
          }
          callbackFunc(errorObj)
          return false
        })
    },
    sendGetToApi (operationType, requestApiURI, extParam, callbackFunc, takeActionIfSessionIsExpired) {
      if (operationType === 'account') {
        requestApiURI = this.$global.$BE_URL.$ACCOUNT + requestApiURI
      } else if (operationType === 'payment') {
        requestApiURI = this.$global.$BE_URL.$PAYMENT + requestApiURI
      } else if (operationType === 'billing') {
        requestApiURI = this.$global.$BE_URL.$BILLING + requestApiURI
      } else if (operationType === 'instance') {
        requestApiURI = this.$global.$BE_URL.$INSTANCE + requestApiURI
      } else if (operationType === 'product') {
        requestApiURI = this.$global.$BE_URL.$PRODUCT + requestApiURI
      }
      this.$axios.get(this.$global.$API_URL + requestApiURI + '?' + extParam)
        .then((data) => {
          const result = data
          result.isError = false
          callbackFunc(result)
          return true
        }).catch((error) => {
          const errorObj = {}
          errorObj.isError = true
          if (error.response.status === 500) {
            errorObj.code = 500
            errorObj.message = '服务器内部错误, 请稍后再试'
            errorObj.data = error.response.data
          } else if (error.response.status === 401) {
            errorObj.code = 401
            errorObj.message = '登录以继续'
            errorObj.data = error.response.data
            if (takeActionIfSessionIsExpired) {
              this.deleteCookieValue('frontendTempSession')
              this.checkIfSessionIdExist()
            }
          } else {
            errorObj.code = error.response.status
            errorObj.message = error.response.message
            errorObj.data = error.response.data
          }
          callbackFunc(errorObj)
          return false
        })
    }
  }
}
</script>
