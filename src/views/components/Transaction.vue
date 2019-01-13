<template>
  <article class="transaction" :data-account="account.name">
    <h3 class="transaction-amount">{{ account.currency }} <span>{{ data.amount | money }}</span></h3>
    <p class="transaction-comment">{{ data.comment }}</p>
    <time :datetime="data.date + ':' + data.time">
      <span>{{ data.date | shortDate }}</span>
      <span>{{ data.time }}</span>
    </time>
    <div>
      <button class="button" @click="updateTransaction(data._id)">Update</button>
      <button class="button" @click="deleteTransaction(data._id)">Delete</button>
    </div>
  </article>
</template>

<script>
  import moment from 'moment'

  export default({
    name: 'Transaction',
    props: ['data'],
    filters: {
      shortDate(value) {
        if (!value) return ''
        return moment(value).format('MMM, YYYY - DD')
      },
      money(value) {
        let formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 })
        return formatter.format(parseFloat(value))
      }
    },
    computed: {
      account () {
        let account = this.$store.getters.getAccountById(this.data.account)
        return account ? account : { name: "Invalid account", currency: "" }
      }
    },
    methods: {
      deleteTransaction(id) {
        this.$store.dispatch('deleteTransaction', id)
      },
      updateTransaction(id) {
        this.$store.dispatch('selectTransaction', id)
      }
    }
  })
</script>

<style lang="scss" scoped>
	.transaction {
		padding: var(--space);
		margin: 0;
		display: grid;
		/* grid-template-columns: repeat(2, 1fr); */
		grid-row-gap: var(--half-space);
		border-bottom: var(--border) solid var(--gray);

    &::before {
      content: attr(data-account);
      grid-row: 1;
      text-transform: uppercase;
      letter-spacing: var(--letter-space);
      font-weight: var(--bold);
      font-size: var(--font-small);
    }

		&:last-of-type {
			border: none;
		}

		p {
			margin: 0;
		}

		&:hover {
			background: var(--gray);
			transition: all ease-in 0.3s;
		}

    &-amount,
		&-comment,
		time {
			grid-column: 1 / span 2;
		}

		time {
			display: flex;
			justify-content: space-between;
		}

		&-amount {
      margin: 0;
      @extend %currency;
		}

		section {
			grid-area: 1 / 1 / 2 / 2;
			align-self: end;
		}
	}

  .button {
    margin-right: var(--space);

    &:last-of-type {
      margin-right: unset;
    }
  }
</style>
