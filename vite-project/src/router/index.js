import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Health',
      name: 'Health',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TreeHealth.vue')
    },
    {
      path: '/Boros',
      name: '/Boros',
      component: () => import('../views/BoroStats.vue')
    },
    {
      path: '/Dead',
      name: '/Dead',
      component: () => import('../views/DeadAlive.vue')
    },
    {
      path: '/Problems',
      name: '/Problems',
      component: () => import('../views/TreeProblems.vue')
    }
  ]
})

export default router
