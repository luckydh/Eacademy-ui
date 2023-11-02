/** Lazy Load View **/
function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/modules/authentication/_components/${view}.vue`)
}

let routes = [
	{
		name: 'login',
		path: '/login',
		component: loadView('Login'),
		meta: {
			auth: false
		}
	}
];

export default routes;