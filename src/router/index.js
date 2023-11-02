import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)


/** Import Routes Here **/
import routes from './routes'
import authRoutes from '@/modules/authentication/_routes'
import appRoutes from '@/modules/Routes'


routes[0].children = [...routes[0].children, ...appRoutes];

/** Middleware (Guard) **/
import Guard from './guard'



let routeList = [
	...routes,
	...authRoutes
];


let router = new Router({
    routes: routeList,
    mode: 'history'
})

router.beforeEach(Guard)


export default router;