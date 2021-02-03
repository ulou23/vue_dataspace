import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { routes } from './routes';
import VueRouter from 'vue-router'
import store from '@/store';


Vue.use(VueRouter);


const myrouter=new VueRouter({
  routes:routes,
  mode:"history",
})

Vue.config.productionTip = false

new Vue({
  store,
  router: myrouter,
  vuetify,
  render: h => h(App)
}).$mount('#app')
