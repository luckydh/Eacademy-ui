/** Lazy Load View **/
function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/modules/dashboard/_components/${view}.vue`)
}

let routes = [
	{
		path: '',
		name: 'home',
		component: loadView('index'),
		meta: {
			auth: true
		}
	}
];

export default routes;