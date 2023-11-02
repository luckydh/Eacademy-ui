/** Lazy Load View **/
function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/modules/academic/_components/${view}.vue`)
}

let routes = [{
		name: 'aio',
		path: '/aio',
		component: loadView('AiO/index'),
		meta: {
			auth: true
		}
	}, {
		name: 'batches',
		path: '/batches',
		component: loadView('batch/index'),
		meta: {
			auth: true
		}
	}, {
		name: 'grades',
		path: '/grades',
		component: loadView('grades/index'),
		meta: {
			auth: true
		}
	}, {
		name: 'grades-detail',
		path: '/grades/:gradeId',
		component: loadView('sections/index'),
		meta: {
			auth: true
		}
	}, {
		name: 'subjects',
		path: '/subjects',
		component: loadView('subjects/index'),
		meta: {
			auth: true
		}
	},
];

export default routes;