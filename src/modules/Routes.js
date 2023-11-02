import dashboardRoutes from './dashboard/_routes'
import transitRoutes from './transit/_routes'
import academicRoutes from './academic/_routes'
import accountRoutes from './account/_routes'

let routes = [...dashboardRoutes, ...transitRoutes, ...academicRoutes, ...accountRoutes]

export default routes;