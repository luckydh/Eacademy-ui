/** Lazy Load View **/
function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/modules/account/_components/${view}.vue`)
}

let routes = [{
		name: 'journal_types',
		path: '/journal-type',
		component: loadView('journal_type/index'),
		meta: {
			auth: true
		}
	}
];

export default routes;