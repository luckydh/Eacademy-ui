/** returns object */

export default {
	USER : (state, payload) => {
		state.user = payload
	},

	BATCH : (state, payload) => {
		state.batch = payload
	}
}
