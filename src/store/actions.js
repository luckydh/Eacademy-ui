/** returns object */

export default {
    setUser: (context, payload) => {
    	/*let { data } = await Axios.get('http://yourwebsite.com/api/todo')
        context.commit('USER', payload)*/
    },

    setBatch: ({commit}, payload) => {
    	commit('BATCH', payload);
    }
}
