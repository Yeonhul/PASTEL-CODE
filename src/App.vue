<template>
  <div>
    <He-der />
    <LoginComponent />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
}
</script>

<style lang="scss">
@import '@/scss/header.scss';
@import '@/scss/main_page.scss';
@import '@/scss/content.scss';
@import '@/scss/pick.scss';
@import '@/scss/login.scss';
</style>
