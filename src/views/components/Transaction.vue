<template>
  <article class="transaction">
    <h3 class="transaction-amount">RM {{ data.amount }}</h3>
    <p class="transaction-comment">{{ data.comment }}</p>
    <time :datetime="data.date + ':' + data.time">
      <span>{{ data.date | shortDate }}</span>
      <span>{{ data.time }}</span>
    </time>
    <slot></slot>
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
      }
    }
  })
</script>

<style lang="scss">
	.transaction {
		padding: var(--space);
		margin: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-row-gap: var(--half-space);
		border-bottom: var(--border) solid var(--gray);

		&:last-child {
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
	    text-align: right;
			font-size: var(--font-large);
			font-weight: bold;
		}

		section {
			grid-area: 1 / 1 / 2 / 2;
			align-self: end;
		}
	}
</style>
