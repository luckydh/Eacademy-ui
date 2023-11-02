import AuthGuard from './guard'

function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/modules/${view}.vue`)
}

let routes = [
	{
		path: '/',
		component: loadView('layout/_components/index'),
		meta: { auth: true },
		children: []
	}
];

export default routes;