<template>
  <div>
    <h1>All transactions</h1>
    <Transaction v-for="(item, i) in transactions" :key="i" :data="item"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Transaction from '../components/Transaction'
  export default ({
    name: "TransactionList",
    components: {
      Transaction
    },
    computed: {
      ...mapState([
        'transactions'
      ])
    },
    mounted() {
      this.$store.dispatch('fetchData')
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

  h1 {
    @extend %heading;
    padding: var(--space);
  }
</style>
