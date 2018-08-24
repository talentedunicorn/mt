import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = '/transactions'
const store = new Vuex.Store({
  state: {
    notification: {},
    currency: "RM",
    form: {},
    transactions: [],
    accounts: [
      { name: "Total", amount: "26,223.58" },
      { name: "Bank of money", amount: "23,023.00" },
      { name: "Ah Loan", amount: "3,200.58" },
    ]
  },
  mutations: {
    ['SET_DATA'] (state, data) {
      state.transactions = data
    },
    ['RESET_FORM'] (state) {
      state.form = {}
    },
    ['SET_NOTIFICATION'] (state, data) {
      state.notification = data
    },
  },
  actions: {
    submitForm ({ state, commit, dispatch }, data) {
      axios.post(API_URL, data)
        .then(function (response) {
          commit('SET_NOTIFICATION', { msg: "Successfully added.", type: "success" })
          dispatch('fetchData')
        })
        .catch((error) => { 
          console.error(error)
          commit('SET_NOTIFICATION', { msg: "Failed to save, please retry", type: "error" })
        })
    },
    fetchData ({ commit }) {
      axios.get(API_URL + '?$sort[date]=-1')
        .then((response) => commit('SET_DATA', response.data.data))
        .catch((error) => console.error(error))
    },
    deleteItem ({ commit, dispatch }, id) {
      if (id && window.confirm("This will be permanently deleted")) {
        axios.delete(API_URL, { params: { _id: id }})
          .then((response) => {
            dispatch('fetchData')
            commit('SET_NOTIFICATION', { msg: "Successfully deleted.", type: "success" })
          })
          .catch((error) => console.log(error))
      }
    }
  }
})

export default store
