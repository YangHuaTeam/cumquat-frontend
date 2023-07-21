<!-- 工作台概览 保有产品卡片 -->
<template>
  <div>
    <!-- 产品标题 开始 -->
    <div
      class="text-h6"
    >
      保有产品
    </div>
    <!-- 产品标题 结束 -->
    <!-- 产品行 开始 -->
    <v-row>
      <div v-for="products in productsInfo" :key="products.id" class="products-div">
        <v-col>
          <v-btn class="productbtn" :to="products.link">
            {{ products.productName }} ({{ products.retainedCount }})
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
    announcement: '近日行云因遭大流量攻击, 产品运行可能不稳定。',
    announcementLevel: 'warning',
    productsInfo: []
  }),
  mounted () {
    this.sendGetToApi('instance', '/getInstanceRetention', '', this.compressRetainedProductInfo, true)
  },
  methods: {
    compressRetainedProductInfo (dataObj) {
      if (dataObj.isError === false) {
        if (dataObj.data.code === 1000) {
          const uninitedProductsInfo = dataObj.data.data.retentionInstances
          for (let i = 0; i < uninitedProductsInfo.length; i++) {
            uninitedProductsInfo[i].id = i + 1
          }
          const initedProductsInfo = uninitedProductsInfo
          this.linkRetainedProductInfo(initedProductsInfo)
        } else {
          this.$root.$DefLayout.showSnackBar('error', 'API异常, 请检查后端', 3000, true)
        }
      } else if (dataObj.isError) {
        if (dataObj.code === 500) {
          this.$root.$DefLayout.showSnackBar('error', 'API内部错误, 请检查后端', 3000, true)
        }
      }
    },
    linkRetainedProductInfo (initedProductsInfo) {
      let linkedElCount = 0
      const linkSingleProduct = (dataObj) => {
        const queriedProductName = dataObj.data.data.productName
        for (let productIndex = 0; productIndex < initedProductsInfo.length; productIndex++) {
          if (queriedProductName === initedProductsInfo[productIndex].productName) {
            initedProductsInfo[productIndex].link = dataObj.data.data.productUri
            linkedElCount += 1
          }
        }
      }
      for (let productIndex = 0; productIndex < initedProductsInfo.length; productIndex++) {
        this.sendGetToApi('product', '/getProductUri', 'productName=' + initedProductsInfo[productIndex].productName, linkSingleProduct, false)
      }
      console.debug(initedProductsInfo)
      const awaitLinkingComplete = () => {
        if (linkedElCount === initedProductsInfo.length) {
          this.$data.productsInfo = initedProductsInfo
        } else {
          setTimeout(awaitLinkingComplete, 50)
        }
      }
      awaitLinkingComplete()
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
