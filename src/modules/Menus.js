import authenticationMenu from './authentication/_routes/menu'
import dashboardMenu from './dashboard/_routes/menu'
import transitMenu from './transit/_routes/menu'
import academicMenu from './academic/_routes/menu'
import accountMenu from './account/_routes/menu'

let menus = [...dashboardMenu, ...authenticationMenu, ...transitMenu, ...academicMenu, ...accountMenu]

export default menus;