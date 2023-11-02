/* eslint-disable */
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueEvents from 'vue-events'
import VueApexCharts from 'vue-apexcharts'
import wysiwyg from "vue-wysiwyg";

import 'vuetify/dist/vuetify.min.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.use(VueApexCharts)
Vue.use(Vuetify)
Vue.use(VueEvents)
Vue.use(wysiwyg, {}); // config is optional. more below

require('./library/Calendar')

import slim from 'jquery-slim';
global.jQuery = slim;

/** import dependencies **/
import router from './router'
import {store} from './store'

/** import library **/
import rest from '@/library/Rest' /** Rest (Axios) API */
import storage from '@/library/Storage' /** Web Storage API */
import auth from '@/library/Auth' /** Authentication API */
import encryption from '@/library/Encryption' /** Authentication API */


Vue.prototype.$rest = rest();
Vue.prototype.$storage = storage;
Vue.prototype.$auth = auth;
Vue.prototype.$encryption = encryption;
Vue.prototype.$slim = slim;

Number.prototype.pad = function() {
    return this.toString().padStart(2, "0");
};


import App from './App.vue'
import Button from '@/components/Button'
import EditButton from '@/components/EditButton'
import DeleteButton from '@/components/DeleteButton'
import ViewButton from '@/components/ViewButton'


Vue.component('apexchart', VueApexCharts)
Vue.component('Button', Button)
Vue.component('EditButton', EditButton)
Vue.component('DeleteButton', DeleteButton)
Vue.component('ViewButton', ViewButton)

Vue.config.productionTip = false

window.app = new Vue({
	router,
	store,
  	render: h => h(App),
}).$mount('#app')
