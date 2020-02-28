import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Channels from '../views/channels/Index'
import Channel from '../views/channels/Id'
import Videos from '../views/videos/Index'
import Video from '../views/videos/Id'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/channels',
    name: 'channel',
    component: Channels
  },
  {
    path: '/channels/:id',
    name: 'channel-id',
    component: Channel
  },
  {
    path: '/videos',
    name: 'video',
    component: Videos
  },
  {
    path: '/videos/:id',
    name: 'video-id',
    component: Video
  }
]

const router = new VueRouter({
  routes
})

export default router
