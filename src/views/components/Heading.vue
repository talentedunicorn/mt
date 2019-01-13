<template>
  <header>
    <h2>{{ title }}</h2>
    <router-link v-if="backLink" class="back" :to="backLink"><span>Back</span></router-link>
  </header>
</template>

<script>
export default ({
  name: "Heading",
  props: {
    title: String,
    backLink: String
  }
})
</script>

<style lang="scss" scoped>
  header {
    padding: var(--space) var(--double-space);

    h2 {
      @extend %heading;
      /*
      font-style: var(--font);
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: var(--letter-space);
      margin: 0;
      */
    }
  }
</style>
