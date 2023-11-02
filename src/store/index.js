import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import states from './states'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

/** Import extra modules here **/
//import authentication from '@/modules/authentication/_store'

export const store = new Vuex.Store({
	state: states,
	getters: getters,
	mutations: mutations,
	actions : actions,
	modules: [
		//authentication
	]
})