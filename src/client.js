import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './views/App'
import Dashboard from './views/Dashboard'
import TransactionList from './views/components/TransactionList'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Dashboard },
  { path: '/all', component: TransactionList }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
