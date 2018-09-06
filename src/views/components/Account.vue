<template>
  <article>
    <h2>{{ name }}</h2>
    <p>{{ currency }} <span v-text="amount"></span></p>
  </article>
</template>

<script>
  export default ({
    name: "Account",
    props: [ "name", "amount", "currency" ]
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

  article {
    display: grid;
    padding: var(--space);

    h2 {
      @extend %heading;
      margin: 0;
    }

    p {
      @extend %currency;
      align-self: center;
    }
  }
</style>
