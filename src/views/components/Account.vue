<template>
  <article>
    <h2>{{ account.name }}</h2>
    <p>{{ account.currency }} <span>{{ account.amount | money }}</span></p>
  </article>
</template>

<script>
  export default ({
    name: "Account",
    computed: {
      account() {
        return this.$store.getters.getAccountById(this.id)
      }
    },
    props: [ "id" ],
    filters: {
      money(value) {
        let formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 })
        return formatter.format(parseFloat(value))
      }
    },
    methods: {
      async getAccountBalance(id) {
        let self = this
        await fetch(`${window.location.origin}/transactions?account=${id}&$select[]=amount&$select[]=type`)
          .then(res => res.json())
          .then(({data}) => {
            let total = data.map(item => {
              if (item.type === "Debit") {
                return parseFloat(item.amount)
              } else {
                return parseFloat(item.amount) * -1
              }
            }).reduce((acc, cur) => cur + acc)
            self.amount = total
          })
          .catch(err => console.error(err))
      }
    },
    mounted() {
      this.$store.dispatch('getAccountBalance', this.id)
    }
  })
</script>

<style lang="scss" scoped>
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
