<template>
  <h1>All transactions</h1>
</template>

<script>
  export default ({
    name: "Transaction list"
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

  h1 {
    @extend %heading;
    padding: var(--space);
  }
</style>
