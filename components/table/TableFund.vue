<!-- 工作台概览 余额卡片 -->
<template>
  <div>
    <!-- 卡片是好文明 -->
    <v-card
      max-height="600px"
    >
      <v-card-title>
        爷的余额
      </v-card-title>
      <v-card-text>
        <p class="display-1 text--primary">
          {{ tableFundCurrent }}
          元
        </p>
      </v-card-text>
      <v-alert
        v-if="tableFundCurrent < 0"
        dense
        type="error"
        icon="mdi-alert-octagon-outline"
        class="v-alert-arrearage"
        style="background-color: rgba(255, 127, 127) !important;"
      >
        你的账户发生欠费, 请尽快补齐款项。
        <span v-if="isAccountBanningEnabled">
          否则你的账户将在 <strong>{{ banningRemainDays }} 日后被封禁</strong>
        </span>
      </v-alert>
      <v-card-actions style="padding-bottom: 20px;">
        <v-btn to="/addfunds/vme50" color="primary">
          <v-icon>mdi-cash</v-icon>
          氪金
        </v-btn>
        <v-btn to="/billing/history">
          账单
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import HttpUtils from '~/utils/HttpUtils.vue'
export default {
  mixins: [HttpUtils],
  data: () => ({
    tableFundCurrent: -86837,
    banningRemainDays: 3,
    isAccountBanningEnabled: false
  }),
  mounted () {
    this.sendGetToApi('billing', '/getUserBalance', '', this.getUserBalanceInfo, true)
  },
  methods: {
    getUserBalanceInfo (balanceDataObj) {
      const defaultLayoutInstance = this.$root.$children[this.$root.$children.length - 1]
      if (balanceDataObj.isError === false) {
        if (balanceDataObj.data.code === 1000) {
          this.$data.tableFundCurrent = balanceDataObj.data.data.balance
          if (!this.$global.$BE_CONFIG.$PAYMENT.$FUND.$ENABLE_ACCOUNT_BANNING_WHEN_ARREARS_OCCURRED) {
            this.$data.isAccountBanningEnabled = false
          } else {
            this.$data.isAccountBanningEnabled = true
            this.$data.banningRemainDays = balanceDataObj.data.data.bannedRemain
          }
        } else {
          defaultLayoutInstance.showSnackBar('error', 'API发生异常, 请检查后端', 10000, false)
          this.$data.tableFundCurrent = 0
          this.$data.deletionRemainDays = 0
        }
      } else if (balanceDataObj.isError === true) {
        if (balanceDataObj.code === 404) {
          if (balanceDataObj.data.code === 1003.1) {
            defaultLayoutInstance.showSnackBar('warning', '支付方式获取失败, 请检查', 5000, true)
            this.$data.tableFundCurrent = 0
            this.$data.deletionRemainDays = 0
          } else if (balanceDataObj.data.code === undefined) {
            defaultLayoutInstance.showSnackBar('error', 'API发生异常, 请检查后端', 10000, false)
            this.$data.tableFundCurrent = 0
            this.$data.deletionRemainDays = 0
          }
        } else if (balanceDataObj.code === 500) {
          defaultLayoutInstance.showSnackBar('error', 'API内部错误, 请检查后端', 10000, false)
          this.$data.tableFundCurrent = 0
          this.$data.deletionRemainDays = 0
        }
      }
    }
  }
}
</script>
<style>
.v-alert-arrearage {
  font-size: 7px;
  margin: 0 4px;
}
</style>
