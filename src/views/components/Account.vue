<template>
  <article>
    <h2>{{ name }}</h2>
    <p>{{ amount.symbol }} <span v-text="amount.value"></span></p>
  </article>
</template>

<script>
  export default ({
    name: "Account",
    props: [ "name", "amount" ]
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

  article {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: var(--space);

    h2 {
      @extend %heading;
      margin: 0;
    }

    p {
      align-self: center;
      grid-column: 2;
      font-weight: bold;
      text-align: right;

      span {
        font-size: var(--font-larger);
      }
    }
  }
</style>
