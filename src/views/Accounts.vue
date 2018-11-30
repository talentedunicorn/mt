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

      <label>
        <span>Amount</span>
        <input type="number" step="0.01" v-model="currentAccount.amount" />
      </label>

      <div class="form-controls">
        <button class="button">{{ updating ? 'Update': 'Create' }}</button>
        <button class="button" @click="resetForm">Cancel</button>
      </div>
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
        return this.$store.commit('RESET_CURRENT_ACCOUNT')
      }
    },
    mounted () {
      this.$store.dispatch('fetchData')
      this.$store.commit('SET_DATA', { name: 'notification', data: {}})
    }
  }
  </script>

<style lang="scss">
  .form {
    --form-width: 40rem;
    max-width: var(--form-width);
    margin-left: auto;
    display: flex;
    flex-flow: column;

    label {
      margin-bottom: var(--space);

      span {
        display: block;
      }
    }
    &-controls {
      display: flex;
      justify-content: flex-end;

      button {
        margin-left: var(--space);
      }
    }
  }

  .accounts {
    ul {
      list-style: none;
      margin: 0;
      padding: var(--space);
    }

    .button {
      margin-left: var(--space);
    }
  }
</style>
