<template>
  <div class="wrapper">
    <header>
      <h1>MT</h1>
    </header>

    <Form class="form" />

    <section class="accounts">
      <Account v-for="account in accounts" :key="account._id" :id="account._id"/>
    </section>
    <section v-if="transactions.length > 0">
      <h2>Latest transactions</h2>
      <Transaction
        v-for="transaction in transactions"
        :key="transaction._id"
        :data="transaction"/>
    </section>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Form from './components/Form'
  import Transaction from './components/Transaction'
  import Account from './components/Account'

  export default ({
    name: 'Dashboard',
    components: {
      Form,
      Transaction,
      Account
    },
    computed: {
      ...mapState({
        transactions: state => state.transactions,
        accounts: state => state.accounts
      })
    },
    mounted() {
      this.$store.dispatch('fetchData')
    }
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
    min-height: 100vh;
    grid-template-areas: "header" "accounts" "form" "list";
    align-items: start;

    @include breakpoint {
      grid-template-areas: "header accounts form" "header list form";
      grid-template-columns: min-content minmax(var(--list-width), 1fr) minmax(calc(var(--form-width) / 2), var(--form-width));
    }

    & > header {
      grid-area: header;
      align-self: start;
      padding: var(--space);
      border: var(--border) solid;
      border-width: 0 0 var(--border) 0;

      @include breakpoint {
        align-self: stretch;
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

    & > section {
      grid-area: list;
    }

    & > .accounts {
      grid-area: accounts;
      padding-top: var(--space);
    }

    & > .form {
      background: var(--white);
      grid-area: form;

      @include breakpoint {
        position: sticky;
        top: 0;
      }
    }
  }

  .controls {
    grid-column: span 2;
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: var(--space);
    justify-self: end;
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
