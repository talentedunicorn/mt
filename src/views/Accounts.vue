<template>
  <div class="wrapper">
    <header>
      <h1>Accounts</h1>
    </header>

    <form class="form" @submit="addAccount">
      <label>
        <span>Name</span>
        <input type="text" v-model="currentAccount.name"/>
      </label>

      <label>
        <span>Currency</span>
        <select v-model="currentAccount.currency">
          <option value="" disabled>Select currency</option>
          <option v-for="(currency, i) in currencies" :key="i" :value="currency.code">{{ currency.symbol }}</option>
        </select>
      </label>

      <button class="button">Create</button>
    </form>

    <section class="accounts">
      <ul>
        <li v-for="(account, k) in accounts" :key="k">
          <Account :name="account.name" :amount="account.amount" :currency="account.currency"/>
          <button>Edit</button>
          <button @click="deleteAccount(account._id)">Delete</button>
        </li>
      </ul>
    </section>
  </div>
</template>

  <script>
  import { mapState, mapActions } from 'vuex'
  import Account from './components/Account'
  export default {
    name: 'AccountsPage',
    components: {
      Account
    },
    computed: {
      ...mapState({
        accounts: state => state.accounts,
        currentAccount: state => state.currentAccount,
        currencies: state => state.currencies
      })
    },
    methods: {
      ...mapActions([
        'addAccount',
        'deleteAccount'
        ])
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
