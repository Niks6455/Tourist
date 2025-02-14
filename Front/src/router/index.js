import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import TourCatalogPage from '@/pages/TourCatalogPage.vue'
import Zacaz from '../pages/Zacaz.vue'
import AuthPage from '@/pages/AuthPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
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
      path: '/auth',
      name: 'auth',
      component: AuthPage
    }
  ],
})

export default router
