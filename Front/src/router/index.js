import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import TourCatalogPage from '@/pages/TourCatalogPage.vue'
import Zacaz from '../pages/Zacaz.vue'
import AuthPage from '../pages/AuthPage.vue'
import UsersPage from '@/pages/UsersPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/homePage',
      name: 'home',
      component: HomePage,
    },{
      path: '/users',
      name: 'users',
      comment: UsersPage
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: TourCatalogPage
    },{
      path: '/zacaz',
      name: 'zacaz',
      component: Zacaz
    },{
      path: '/',
      name: 'auth',
      component: AuthPage
    }
  ],
})

export default router
