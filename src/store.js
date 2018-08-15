import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = '/transactions'
const store = new Vuex.Store({
  state: {
    form: {},
    transactions: [],
    accounts: []
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
    submitForm ({ state, commit, dispatch }) {
      axios.post(API_URL, state.form)
        .then(function (response) {
          commit('RESET_FORM')
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
