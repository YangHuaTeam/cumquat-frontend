<!-- 工作台概览 热门产品卡片 -->
<template>
  <div>
    <!-- 公告行 开始 -->
    <v-row>
      <v-col>
        <v-alert ref="broadcastAlertEl" icon="mdi-bullhorn-outline" :type="announcementLevel">
          公告: 暂无公告
        </v-alert>
      </v-col>
    </v-row>
    <!-- 公告行 结束 -->
    <!-- 产品标题 开始 -->
    <div
      class="text-h6"
    >
      热门产品
    </div>
    <!-- 产品标题 结束 -->
    <!-- 产品行 开始 -->
    <v-row>
      <div v-for="products in recommendProductsInfo" :key="products.id" class="products-div">
        <v-col>
          <v-btn class="productbtn" :to="products.productUri">
            {{ products.productName }}
          </v-btn>
        </v-col>
      </div>
    </v-row>
    <!-- 产品行 结束 -->
  </div>
</template>

<script>
import HttpUtils from '~/utils/HttpUtils.vue'
export default {
  mixins: [HttpUtils],
  data: () => ({
    tableFundCurrent: 0,
    announcementLevel: 'warning',
    recommendProductsInfo: []
  }),
  mounted () {
    this.sendGetToApi('product', '/getHotProducts', '', this.compressHotProductsInfo, false)
  },
  methods: {
    compressHotProductsInfo (dataObj) {
      if (dataObj.isError === false) {
        if (dataObj.data.code === 1000) {
          const uninitedProductsInfo = dataObj.data.data
          for (let i = 0; i < uninitedProductsInfo.length; i++) {
            uninitedProductsInfo[i].id = i + 1
          }
          const initedProductsInfo = uninitedProductsInfo
          this.$data.recommendProductsInfo = initedProductsInfo
        } else {
          this.$root.$DefLayout.showSnackBar('error', 'API异常, 请检查后端', 3000, true)
        }
      } else if (dataObj.isError) {
        if (dataObj.code === 500) {
          this.$root.$DefLayout.showSnackBar('error', 'API内部错误, 请检查后端', 3000, true)
        }
      }
    }
  }
}
</script>

<style>
.productbtn {
  width: 140px;
}

.text-h6 {
  margin-bottom: 15px;
}

.col {
  padding-right: 2px;
}
</style>
