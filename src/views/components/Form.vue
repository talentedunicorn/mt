<template>
  <form ref="form" @submit.prevent="submitForm">
    <label class="account">
      <span>Account</span>
      <select name="account" v-model="form.account">
        <option v-for="(account, k) in accounts" :key="k" :value="account.name">{{ account.name }}</option>
      </select>
    </label>

    <label class="type">
      <span>Type</span>
      <select name="type" v-model="form.type">
        <option v-for="(type, k) in transactionTypes" :key="k" :value="type">{{ type }}</option>
      </select>
    </label>

    <label class="amount">
      <span>Amount</span>
      <input name="amount" type="number" min="0" step="0.01" v-model="form.amount"/>
    </label>

    <label class="date">
      <span>Date</span>
      <input name="date" type="date" v-model="form.date"/>
    </label>

    <label class="time">
      <span>Time</span>
      <input name="time" type="time" v-model="form.time"/>
    </label>

    <label class="comment">
      <span>Comments</span>
      <input name="comment" type="text" v-model="form.comment"/>
    </label>

    <label class="category">
      <span>Categories</span>
      <div v-for="(category, i) in allCategories" :key="i">
        <input :id="category" type="checkbox" name="categories" :value="category" v-model="selectedCategories"/>
        <label :for="category">{{ category }}</label>
      </div>
    </label>

    <button class="button">{{ updating ? 'Update' : 'Add' }} transaction</button>
    <button class="button" v-if="updating" @click="resetForm">Cancel</button>
  </form>
</template>

<script>
  import { mapState } from 'vuex'
  export default({
    name: 'Form',
    computed: {
      form: {
        get() {
          return this.$store.state.currentTransaction
        },
        set(data) {
          this.store.commit('SET_DATA', { name: 'currentTransaction', data })
        }
      },
      selectedCategories: {
        get() {
          return this.$store.state.selectedCategories
        },
        set(data) {
          return this.$store.commit('SET_DATA', { name: 'selectedCategories', data })
        }
      },
      ...mapState({
        allCategories: state => state.allCategories,
        transactionTypes: state => state.transactionTypes,
        accounts: state => state.accounts,
        updating: state => state.currentTransaction.hasOwnProperty('_id'),
      }),
    },
    methods: {
      submitForm() {
        this.$store.dispatch('submitForm')
      },
      resetForm(e) {
        e.preventDefault()
        this.$store.commit('RESET_FORM')
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

  form {
    display: grid;
    grid-gap: var(--space) var(--half-space);
    padding: var(--space);

    @include breakpoint {
      padding: var(--double-space);
      /*
      position: sticky;
      top: 0;
      */
    }

    & > label {
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
  }
  .amount,
  .category,
  .comment {
    grid-column: span 2;
  }

  .button {
    grid-column: span 2;
    justify-self: center;
  }

  .category {
    display: flex;
    flex-wrap: wrap;

    & > span {
      flex: 100%;
    }

    & > div {
      margin-right: var(--half-space);
    }
  }
</style>
