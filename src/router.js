import { createRouter, createWebHistory, useRoute } from 'vue-router'
import About from './components/About.vue'
import Projectcarousel from './components/Projectcarousel.vue'
import Contactform from './components/Contactform.vue'
import Guestbook from './components/Guestbook.vue'
const routes = [
  {
    path: '/',
    redirect: '/about',
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projectcarousel,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contactform,
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    component: Guestbook,
  },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router
