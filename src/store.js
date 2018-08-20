import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = '/transactions'
const store = new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    submitForm ({ state, commit, dispatch }, data) {
      axios.post(API_URL, data)
        .then(function (response) {
          dispatch('fetchData')
        })
        .catch((error) => console.error(error))
    },
    fetchData ({ commit }) {
      axios.get(API_URL + '?$sort[date]=-1')
        .then((response) => commit('SET_DATA', response.data.data))
        .catch((error) => console.error(error))
    },
    deleteItem ({ dispatch }, id) {
      if (id && window.confirm("This will be permanently deleted")) {
        axios.delete(API_URL, { params: { _id: id }})
          .then((response) => {
            dispatch('fetchData')
          })
          .catch((error) => console.log(error))
      }
    }
  }
})

export default store
