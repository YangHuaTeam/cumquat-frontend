<template>
  <v-app-bar
    color="white"
    elevation="0"
    app
  >
    <v-app-bar-nav-icon />
    <v-toolbar-title @click="replaceToHome">
      {{ siteName }} | 控制台
      <!-- 加条竖杠就会显得很企业级 -->
    </v-toolbar-title>
    <v-spacer />
    <v-btn icon to="/account">
      <v-icon>mdi-account-circle-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    siteName: ''
  }),
  mounted () {
    this.$data.siteName = this.$global.$SITE_NAME
  },
  methods: {
    replaceToHome () {
      this.$router.push('/table')
    }
  }
}
</script>
<style>
.v-toolbar__title {
  margin-right: 5px;
}

.v-btn {
  margin-left: 10px;
}
</style>
