import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

// dir root route に -index が付く問題の簡易 fix
const str = '-index'
const fixRoutes = routes.map(e => {
  const name = '' + e.name
  if (name.indexOf(str)) {
    e.name = name.replace(str, '')
  }
  return e
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: fixRoutes
    }
  ]
})
