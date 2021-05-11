import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import acl from "./boot/acl";

Vue.use(VueRouter)

Vue.config.productionTip = false,

  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:8080/api/v1/users',
    timeout: 30000,
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      'Content-Type': 'application/json'
    }
  })

new Vue({
  router,
  acl,
  render: h => h(App)
}).$mount('#app')
