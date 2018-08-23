<template>
  <div id="app">
    <Notification v-if="notification.msg" :msg="notification.msg"/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Notification from './components/Notification'

  export default ({
    name: "App",
    components: {
      Notification
    },
    computed: {
      notification() {
        return this.$store.state.notification
      }
    }
  })
</script>

<style lang="scss">
  @import '../style/shared';
</style>
