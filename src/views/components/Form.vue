<template>
  <form ref="form" @submit.prevent="submitForm">
    <label class="amount">
      <span>Amount</span>
      <input name="amount" type="number" min="0" step="0.01" data-error="Enter amount greater than 0" v-model="form.amount"/>
    </label>

    <label class="date">
      <span>Date</span>
      <input name="date" type="date" data-error="Enter a valid date" v-model="form.date"/>
    </label>

    <label class="time">
      <span>Time</span>
      <input name="time" type="time" data-error="Enter a valid time" v-model="form.time"/>
    </label>

    <label class="comment">
      <span>Comments</span>
      <input name="comment" type="text" data-error="Write a short description" v-model="form.comment"/>
    </label>

    <button class="button">Add transaction</button>
  </form>
</template>

<script>
  import validator from 'validator'
  export default({
    name: 'Form',
    data() {
      return {
        form: {
          amount: '',
          date: '',
          time: '',
          comment: ''
        }
      }
    },
    computed: {
      valid() {
        let { notification } = this.$store.state
        return !notification.type && notification.type !== "error"
      },
    },
    methods: {
      submitForm() {
        this.validateForm()
        this.valid && this.$store.dispatch('submitForm', { type: 'create', data: this.form })
            .then(() => { this.form = {} })
      },
      validateForm() {
        this.$store.commit('SET_NOTIFICATION', {})
        let inputs = this.$refs.form.querySelectorAll('input')

        for (let input of inputs) {
          let valid = isValid(input)
          if (valid === false) {
            this.$store.commit('SET_NOTIFICATION', { msg: input.dataset.error, type: "error" })
            break
          }
        }

        function isValid(input) {
          let isValid = false
          let timeFormat = /(?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])?/g

          switch(input.type) {
            case 'number':
              isValid = validator.isFloat(input.value) || validator.isInt(input.value)
              break
            case 'date':
              isValid = new Date(input.value) instanceof Date && !isNaN(Date.parse(input.value))
              break
            case 'time':
              isValid = timeFormat.test(input.value)
              break
            case 'text':
              isValid = !validator.isEmpty(validator.trim(input.value))
              break
            default:
              break
          }

          return isValid
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../style/helpers';

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
    grid-column: span 2;
    justify-self: center;
  }
</style>
