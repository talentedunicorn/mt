<template>
  <div class="wrapper">
    <header>
      <h1>Accounts</h1>
    </header>

    <form class="form" @submit="addAccount">
      <label>
        <span>Name</span>
        <input type="text" v-model="newAccount.name"/>
      </label>

      <label>
        <span>Currency</span>
        <select v-model="newAccount.currency">
          <option :value="undefined" disabled>Select currency</option>
          <option v-for="(currency, i) in currencies" :key="i" :value="currency.code">{{ currency.symbol }}</option>
        </select>
      </label>

      <button class="button">Create</button>
    </form>

    <section class="accounts">
      <Account v-for="(account, k) in accounts" :key="k" :name="account.name" :amount="account.amount" :currency="account.currency"/>
    </section>
  </div>
</template>

  <script>
  import { mapState } from 'vuex'
  import Account from './components/Account'
  export default {
    name: 'AccountsPage',
    components: {
      Account
    },
    computed: {
      ...mapState({
        accounts: state => state.accounts,
        newAccount: state => state.newAccount,
        currencies: state => state.currencies
      })
    },
    methods: {
      addAccount (e) {
        e.preventDefault()
        console.log(this.$store.state.newAccount)
      }
    },
    mounted () {
      this.$store.dispatch('fetchData')
    }
  }
  </script>

<style lang="scss">
  .form {
    display: flex;
    flex-flow: column;

    label {
      margin-bottom: var(--space);

      span {
        display: block;
      }
    }
  }
</style>
