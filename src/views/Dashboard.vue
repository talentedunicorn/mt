<template>
  <div class="wrapper">
    <header>
      <h1>MT</h1>
    </header>

    <form @submit.prevent="submitForm">
      <label class="amount">
        <span>Amount</span>
        <input type="number" min="0" step="0.01" :value="form.amount"/>
      </label>

      <label class="date">
        <span>Date</span>
        <input type="date" :value="form.date"/>
      </label>

      <label class="time">
        <span>Time</span>
        <input type="time" :value="form.time"/>
      </label>

      <label class="comment">
        <span>Comments</span>
        <input type="text" :value="form.comment"/>
      </label>

      <button class="button">Add transaction</button>
    </form>

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
  import Transaction from './components/Transaction'

  const API_URL = '/transactions'
  export default ({
    name: 'Dashboard',
    components: {
      Transaction
    },
    computed: mapState({
      form: state => state.form,
      transactions: state => state.transactions
    }),
    mounted() {
      this.$store.dispatch('fetchData')
    },
    methods: {
      submitForm() { return this.$store.dispatch('submitForm') },
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
      grid-template-areas: "header list form";
      grid-template-columns: min-content minmax(var(--list-width), 1fr) minmax(calc(var(--form-width) / 2), var(--form-width));

      & > header {
        grid-area: header;
      }

      & > section {
        grid-area: list;
      }

      & > form {
        grid-area: form;
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

    & > form,
    & > section {
      align-self: start;
      margin-top: var(--space);
    }
  }

  form {
    display: grid;
    grid-gap: var(--space);
    padding: var(--space);

    @include breakpoint {
      padding: var(--double-space);
      /*
      position: sticky;
      top: 0;
      */
    }
  }

  label {
    @extend %heading;
    font-weight: bold;
    display: grid;

    span {
      margin-bottom: var(--half-space);
    }

    &[data-currency] {
      grid-template-columns: min-content 1fr;
      align-items: center;
      grid-template-areas: "label label" "prefix input";

      span {
        grid-area: label;
      }

      &::before {
        content: attr(data-currency);
        grid-area: prefix;
        text-align: center;
        border: var(--border) solid;
        border-right: none;
        padding: var(--half-space);
      }

      input {
        grid-area: input;
      }
    }

    input,
    select,
    textarea {
      border: var(--border) solid;
      padding: var(--half-space);
      max-width: 100%;
    }
  }

  .amount,
  .category,
  .comment {
    grid-column: span 2;
  }

  .button {
    @extend %heading;
    @extend %button;
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
