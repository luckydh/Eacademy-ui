import auth from '@/library/Auth'

function requireAuth(to, from, next) {
	if(to.name != 'login') {
		if(to.meta.auth && auth.authenticated()) next()
		else if(from.name != 'login') next('/login')
		else next(false)
	} else {
		if(to.meta.auth && auth.authenticated()) next(false)
		else next()
	}
}

export default requireAuth;
