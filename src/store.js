import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import validator from 'validator'

Vue.use(Vuex)

const TRANSACTIONS_URL = '/transactions',
      ACCOUNTS_URL = '/accounts'
const store = new Vuex.Store({
  state: {
    notification: {},
    currency: "RM",
    currencies: [
      { symbol: "RM", code: "MYR" },
      { symbol: "$", code: "USD" }
    ],
    currentAccount: {
      name: "",
      currency: ""
    },
    selectedCategories: [],
    allCategories: [
      'Food',
      'Transport',
      'Rent',
      'Vacation',
      'Medical',
      'Entertainment'
    ],
    currentTransaction: {},
    transactions: [],
    transactionTypes: [
      'Debit',
      'Credit'
    ],
    accounts: []
  },
  getters: {
    getAccountById: (state) => (id) => state.accounts.find(account => account._id === id)
  },
  mutations: {
    ['SET_DATA'] (state, { name, data }) {
      state[name] = data
    },
    ['RESET_FORM'] (state) {
      state.currentTransaction = {}
      state.selectedCategories = []
    },
    ['SET_NOTIFICATION'] (state, data) {
      state.notification = data
    },
    ['RESET_CURRENT_ACCOUNT'] (state) {
      state.currentAccount = { name: "", currency: "", amount: 0 } 
    },
    ['SET_ACCOUNT_BALANCE'] (state, data) {
      let index = state.accounts.findIndex((account) => account._id === data.id) 
      let account = state.accounts[index]
      account.amount = data.amount
      Vue.set(state.accounts, index, account)
    }
  },
  actions: {
    submitForm ({ state, commit, dispatch }) {
      dispatch('validateForm')
      .then(() => {
        let { notification, currentTransaction, selectedCategories } = state

        if (notification.type !== 'error') {
          currentTransaction.categories = selectedCategories

          if (currentTransaction._id) {
            console.log('Updating')
            axios.put(TRANSACTIONS_URL + "/" + currentTransaction._id, currentTransaction)
              .then(function (response) {
                commit('SET_NOTIFICATION', { msg: "Successfully updated.", type: "success" })
                commit('RESET_FORM')
                dispatch('fetchTransactions')
              })
          } else {
            axios.post(TRANSACTIONS_URL, currentTransaction)
              .then(function (response) {
                commit('SET_NOTIFICATION', { msg: "Successfully added.", type: "success" })
                commit('RESET_FORM')
                dispatch('fetchTransactions')
              })
              .catch((error) => { 
                console.error(error)
                commit('SET_NOTIFICATION', { msg: "Failed to save, please retry", type: "error" })
              })
          }

          dispatch('getAccountBalance', currentTransaction.account)
        }
      })
    },
    fetchData ({ dispatch }) {
      dispatch('fetchAccounts')
        .then(dispatch('fetchTransactions'))
    },
    fetchTransactions ({ commit }) {
      axios.get(`${TRANSACTIONS_URL}?$sort[date]=-1`)
        .then((response) => commit('SET_DATA', { name: 'transactions', data: response.data.data }))
        .catch((error) => console.error(error))
    },
    fetchAccounts ({ commit }) {
      axios.get(ACCOUNTS_URL)
        .then((response) => commit('SET_DATA', { name: 'accounts', data: response.data.data }))
        .catch((error) => console.error(error))
    },
    deleteTransaction ({ commit, dispatch }, id) {
      if (id && window.confirm("This will be permanently deleted")) {
        axios.delete(TRANSACTIONS_URL, { params: { _id: id }})
          .then((response) => {
            dispatch('fetchTransactions')
            commit('SET_DATA', { name: 'notification', data: { msg: "Successfully deleted.", type: "success" }})
          })
          .catch((error) => console.log(error))
      }

      commit('RESET_FORM')
    },
    selectTransaction({ state, commit }, id) {
      let transaction = state.transactions.filter((item) => item._id === id)[0]
      commit('SET_DATA', { name: 'currentTransaction', data: Object.assign({}, transaction) })
      commit('SET_DATA', { name: 'selectedCategories', data: transaction.categories || [] })
    },
    validateForm ({ state, commit }) {
      // reset notification
      commit('SET_NOTIFICATION', {})
      let form = {
        account: {
          msg: "Select an account"
        },
        amount: {
          msg: "Enter amount greater than 0"
        },
        date: {
          msg: "Enter a valid date" 
        },
        time: {
          msg: "Enter a valid time"
        },
        comment: {
          msg: "Write a short description"
        },
        type: {
          msg: "Transaction type is required"
        }
      }

      // check for fields
      if (Object.keys(state.currentTransaction).length > 0) { 
        Object.keys(form).forEach((name) => {
          // Add categories to current transaction
          if (name === 'categories') {
            commit('SET_DATA', { 
              name: 'currentTransaction', 
              data: Object.assign(state.currentTransaction, { categories: state.selectedCategories })
            })
          }

          let value = state.currentTransaction[name]

          let isValid = validate(name, value, form[name].msg) 

          if (!isValid) commit('SET_NOTIFICATION', { msg: form[name].msg, type: "error" })
          console.log('Validate', name, ':', value)
          return isValid
        })
      } else {
        commit('SET_NOTIFICATION', {msg: 'Form is empty', type: 'error' })
      }

      function validate(type, value) {
        let timeFormat = /(?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])?/g

        if (typeof value === 'undefined') return false

        switch(type) {
          case 'amount':
            return validator.isFloat(value) || validator.isInt(value)
            break
          case 'date':
            return new Date(value) instanceof Date && !isNaN(Date.parse(value))
            break
          case 'time':
            return timeFormat.test(value)
            break
          case 'comment':
            return !validator.isEmpty(validator.trim(value))
            break
          case 'categories':
            return true // Allow empty categories
            break
          case 'account':
            return !validator.isEmpty(validator.trim(value))
          case 'type':
            return !validator.isEmpty(validator.trim(value))
          default:
            break
        }
      }
    },
    submitAccountForm ({ state, commit, dispatch }) {
      console.log('Submitting account form')
      // reset notification
      commit('SET_NOTIFICATION', {})
      let { name, currency, amount } = state.currentAccount
      let isValid = false, msg = ''

      // Loop account object and validate fields
      for (let field of Object.keys(state.currentAccount)) {
        switch (field) {
          case 'name':
            isValid = !validator.isEmpty(validator.trim(name))
            msg = 'Account name is required'
            break
          case 'currency':
            isValid = !validator.isEmpty(validator.trim(currency))
            msg = 'Account currency is required'
            break
          // case 'amount':
          //   isValid = parseInt(amount) > 0
          //   msg = 'Enter a valid amount'
          //   break
          case '_id':
            isValid = true
            break
        }

        // Throw error
        if (isValid === false) {
          commit('SET_NOTIFICATION', { msg, type: 'error'})
          return isValid
        }
      }

      // Call API to add/update
      console.log('Account:', state.currentAccount)
      commit('SET_NOTIFICATION', {})
      if (state.currentAccount._id) {
        axios.put(`${ACCOUNTS_URL}/${state.currentAccount._id}`, state.currentAccount)
          .then(response => {
            commit('SET_NOTIFICATION', { msg: "Successfully updated.", type: "success" })
            // Reset form
            commit('SET_DATA', { name: 'currentAccount', data: {} })
            dispatch('fetchAccounts')
          })
          .catch(err => {
            console.error(err)
            commit('SET_NOTIFICATION', { msg: "Failed to save, please retry", type: "error" })
          })
      } else {
        axios.post(ACCOUNTS_URL, state.currentAccount)
          .then(response => {
            commit('SET_NOTIFICATION', { msg: "Successfully added.", type: "success" })
            // Reset form
            commit('SET_DATA', { name: 'currentAccount', data: {} })
            dispatch('fetchAccounts')
          })
          .catch(err => {
            console.error(err)
            commit('SET_NOTIFICATION', { msg: "Failed to save, please retry", type: "error" })
          })
      }
    },
    deleteAccount({ commit, dispatch }, id) {
      if (id && window.confirm("This will be permanently deleted")) {
        axios.delete(ACCOUNTS_URL, { params: { _id: id }})
          .then((response) => {
            dispatch('fetchAccounts')
            commit('SET_DATA', { name: 'notification', data: { msg: "Successfully deleted.", type: "success" }})
          })
          .catch((error) => console.log(error))
      }
    },
    selectAccount({ state, commit }, id) {
      let account = state.accounts.filter((item) => item._id === id)[0]
      commit('RESET_CURRENT_ACCOUNT')
      commit('SET_DATA', { name: 'currentAccount', data: Object.assign(state.currentAccount, account) })
    },
    getAccountBalance({ state, commit }, id) {
      axios.get(`${window.location.origin}/transactions?account=${id}&$select[]=amount&$select[]=type`)
        .then((response) => {
          let amount = response.data.data.map(item => {
            if (item.type === "Debit") {
              return parseFloat(item.amount)
            } else {
              return parseFloat(item.amount) * -1
            }
          }).reduce((acc, cur) => cur + acc)
          commit('SET_ACCOUNT_BALANCE', { id, amount })
        })
        .catch(err => console.error(err))
    }
  }
})

export default store
