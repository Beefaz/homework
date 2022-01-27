import Vue from 'vue';
import App from './App.vue';
import router from '@/router/router'
import store from "@/store/store";

import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.prototype.$sectionClassColors = {
  default: 'default',
  new: 'success',
  open: 'warning',
  done: 'primary',
  trashed: 'danger',
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
