import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

import store from '@/store'

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

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: fixRoutes
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ページにログインマークがあったら
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // ログイン中か確認
    const isLogin = store.getters.isLogin
    console.log('Requires auth page.', `login: ${isLogin}`)

    if (!isLogin) {
      console.log('- auto redirect')
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  }
  next()
})

export default router
