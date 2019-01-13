<template>
  <form class="form" @submit.prevent="submitForm" :class="{ collapsed: collapsed }">
    <label class="account">
      <span>Account</span>
      <select name="account" v-model="form.account">
        <option disabled :value="undefined">Select account</option>
        <option v-for="(account, k) in accounts" :key="k" :value="account._id">{{ account.name }}</option>
      </select>
    </label>

    <label class="type">
      <span>Type</span>
      <select name="type" v-model="form.type">
        <option disabled :value="undefined">Select type</option>
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

    <button class="button toggle" @click="toggleForm">{{ collapsed ? 'Show': 'Hide' }} form</button>
  </form>
</template>

<script>
  import { mapState } from 'vuex'
  export default({
    name: 'Form',
    data () {
      return {
        collapsed: false
      }
    },
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
      },
      toggleForm(e) {
        e.preventDefault()
        this.collapsed = !this.collapsed
      }
    }
  })
</script>

<style lang="scss" scoped>
  form {
    display: grid;
    grid-gap: var(--space) var(--half-space);

    &.collapsed {
      & > * {
        display: none;
      }

      & > .toggle {
        display: unset;
      }
    }

    @include breakpoint {
      padding: var(--double-space);
      /*
      position: sticky;
      top: 0;
      */
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
