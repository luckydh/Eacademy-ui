/** Lazy Load View **/
function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/modules/transit/_components/${view}.vue`)
}

let routes = [
	{
		name: 'roles',
		path: '/roles',
		component: loadView('roles/index'),
		meta: { auth: true }
	}, {
		name: 'add-role',
		path: '/roles/add-update',
		component: loadView('roles/form'),
		meta: { auth: true }
	}, {
		name: 'permissions',
		path: '/permissions',
		component: loadView('permission/index'),
		meta: {
			auth: true
		}
	}, {
		name: 'schools',
		path: '/schools',
		component: loadView('school/index'),
		meta: {
			auth: true
		}
	}, {
		name: 'schools-form',
		path: '/schools/form',
		component: loadView('school/form'),
		meta: {
			auth: true
		}
	}
];

export default routes;