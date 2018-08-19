<template>
  <div class="wrapper">
    <header>
      <h1>MT</h1>
    </header>

    <Form class="form" />

    <section class="accounts">
      <Account v-for="account in accounts" :name="account.name" :amount="account.amount"/>
    </section>
    <section v-if="transactions.length > 0">
      <h2>Latest transactions</h2>
      <ol>
        <li v-for="(transaction, index) in transactions">
          <Transaction :data="transaction">
            <a href="#" class="button" @click="deleteItem(transaction._id)">Delete</a>
          </Transaction>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState, mapActions } from 'vuex'
  import Form from './components/Form'
  import Transaction from './components/Transaction'
  import Account from './components/Account'

  const API_URL = '/transactions'
  export default ({
    name: 'Dashboard',
    components: {
      Form,
      Transaction,
      Account
    },
    computed: mapState({
      transactions: state => state.transactions,
      accounts: state => state.accounts
    }),
    mounted() {
      this.$store.dispatch('fetchData')
    },
    methods: {
      deleteItem(id) { return this.$store.dispatch('deleteItem', id) }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../style/helpers';

  .wrapper {
    display: grid;
    min-height: 100vh;

    @include breakpoint {
      grid-template-areas: "header accounts form" "header list form";
      grid-template-columns: min-content minmax(var(--list-width), 1fr) minmax(calc(var(--form-width) / 2), var(--form-width));

      & > header {
        grid-area: header;
      }

      & > section {
        grid-area: list;
      }

      & > .form {
        grid-area: form;
      }

      & > .accounts {
        grid-area: accounts;
      }
    }

    & > header {
      padding: var(--space);
      border: var(--border) solid;
      border-width: 0 0 var(--border) 0;
      align-self: start;

      @include breakpoint {
        align-self: unset;
        border-width: 0 var(--border) 0 0;
      }

      h1 {
        margin: 0;
        letter-spacing: 0.25em;
        font-size: 1.5rem;
        position: sticky;
        top: var(--space);
      }
    }

    & > .form,
    & > .accounts,
    & > section {
      align-self: start;
      margin-top: var(--space);
    }
  }

  .button {
    grid-column: span 2;
    justify-self: center;

    @include breakpoint {
      justify-self: end;
    }
  }

  section {
    h2 {
      @extend %heading;
      text-align: center;
      padding: var(--double-space) var(--space) var(--half-space);
    }

    ol {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
</style>
