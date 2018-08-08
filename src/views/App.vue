<template>
  <div>
    <h1>MT</h1>

    <form @submit.prevent="handleSubmit">
      <label class="amount">
        <span>Amount</span>
        <input type="number" v-model="amount"/>
      </label>

      <label class="date">
        <span>Date</span>
        <input type="date" v-model="date"/>
      </label>

      <label class="time">
        <span>Time</span>
        <input type="time" v-model="time"/>
      </label>

      <label class="comment">
        <span>Comments</span>
        <input type="text" v-model="comment"/>
      </label>

      <button>Add transaction</button>
    </form>

    <section v-if="transactions.length > 0">
      <h2>Latest transactions</h2>
      <ul>
        <li v-for="(transaction, index) in transactions">
          <article>
            <h3 class="transaction-amount">RM {{ transaction.amount }}</h3>
            <p class="transaction-comment">{{ transaction.comment }}</p>
            <time :datetime="transaction.date + ':' + transaction.time">
              <span>{{ transaction.date }}</span>
              <span>{{ transaction.time }}</span>
            </time>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import 'normalize.css'

  const API_URL = process.env.API_URL + '/transactions'
  export default ({
    data() {
      return {
        amount: 0,
        date: null,
        time: null,
        comment: '',
        transactions: []
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get(API_URL)
          .then((response) => this.transactions = response.data.data)
          .catch((error) => console.error(error))
      },
      handleSubmit() {
        let data = {
          amount: this.amount,
          date: this.date,
          time: this.time,
          comment: this.comment
        }

        axios.post(API_URL, data)
          .then(function (response) {
            console.log('Successfully added', response)
            this.fetchData()
          })
          .catch((error) => console.error(error))
      }
    }
  })
</script>

<style lang="scss">
  :root {
    --border: 3px;
    --shadow: 2px 2px 0px var(--black);
    --space: 1.25rem;
    --half-space: calc(var(--space) / 2);
    --double-space: calc(var(--space) * 2);
    --black: hsl(0, 0%, 15%);
    --white: hsl(0, 0%, 94%);
    --gray: hsl(0, 0%, 85%);
    --font-larger: 3.5rem;
    --font-large: 2rem;
    --font-small: 0.9rem;
    --letter-space: 0.125em;
    --form-width: 50rem;
  }

  body {
    background: var(--white);
    color: var(--black);
  }

  %heading {
    font-size: var(--font-small);
    text-transform: uppercase;
    letter-spacing: var(--letter-space);
    margin: 0;
  }

  form {
    display: grid;
    grid-gap: var(--space);
    padding: var(--space);
    max-width: var(--form-width);

    @media (orientation: landscape) {
      padding: var(--double-space);
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

  button {
    @extend %heading;
    justify-self: end;
    border: var(--border) solid;
    font-weight: bold;
    background: var(--white);
    padding: var(--half-space) var(--space);
    box-shadow: var(--shadow);
    grid-column: span 2;
    justify-self: center;

    @media (orientation: landscape) {
      justify-self: end;
    }

    &:hover,
    &:active {
      box-shadow: none;
      transition: all ease-in 0.3s;
    }
  }
</style>
