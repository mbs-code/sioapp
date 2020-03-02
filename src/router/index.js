import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Channels from '@/views/channels/Index'
import Channel from '@/views/channels/Id'
import Videos from '@/views/videos/Index'
import Video from '@/views/videos/Id'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/channels',
    name: 'channels',
    component: Channels
  },
  {
    path: '/channels/:id',
    name: 'channel-id',
    component: Channel
  },
  {
    path: '/videos',
    name: 'videos',
    component: Videos
  },
  {
    path: '/videos/:id',
    name: 'video-id',
    component: Video
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
