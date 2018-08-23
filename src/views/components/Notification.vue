<template>
  <article>
    <p>{{ msg }}</p>

    <button @click="clear">Clear</button>
  </article>
</template>

<script>
  export default ({
    name: 'Notification',
    props: [ 'msg' ],
    methods: {
      clear() {
        this.$store.commit('SET_NOTIFICATION', {})
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

  article {
    position: sticky;
    z-index: var(--z-max);
    top: 0;
    display: flex;
    align-items: center;
    padding: calc(var(--space) / 2) var(--space);
    color: var(--white);
    background: var(--black);

    p {
      flex: 1;
    }

    button {
      --size: 2em;
      color: transparent;
      height: var(--size);
      width: var(--size);
      overflow: hidden;
      background: var(--white);
      mask: var(--icon-close) no-repeat center center/contain;
      -webkit-mask: var(--icon-close) no-repeat center center/contain;
    }
  }
</style>
