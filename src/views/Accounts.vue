<template>
  <div class="wrapper">
    <header>
      <h1>Accounts</h1>
    </header>

    <form class="form" @submit.stop.prevent="submitAccountForm">
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

      <button class="button">{{ updating ? 'Update': 'Create' }}</button>
      <button class="button" @click="resetForm">Cancel</button>
    </form>

    <section class="accounts">
      <ul>
        <li v-for="(account, k) in accounts" :key="k">
          <Account :name="account.name" :amount="account.amount" :currency="account.currency"/>
          <button class="button" @click="selectAccount(account._id)">Edit</button>
          <button class="button" @click="deleteAccount(account._id)">Delete</button>
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
      }),
      updating() {
        return this.currentAccount.hasOwnProperty('_id')
      }
    },
    methods: {
      ...mapActions([
        'submitAccountForm',
        'deleteAccount',
        'selectAccount'
        ]),
      resetForm(e) {
        e.preventDefault()
        return this.$store.commit('SET_DATA', { name: 'currentAccount', data: {}})
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
