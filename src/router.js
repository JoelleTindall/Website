import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useAuthStore } from './auth'
import About from './views/About.vue'
import Projectcarousel from './views/Projects.vue'
import Contactform from './views/Contactform.vue'
import Guestbook from './views/Guestbook.vue'
import SignIn from './views/SignIn.vue'
import Admin from './views/Admin.vue'
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
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
    // beforeEnter(to) {

    // },
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const auth = useAuthStore() // Using the Composition API to access the auth state

  if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
    // If trying to access a protected route and user is not authenticated
    return next({ name: 'SignIn', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})
export default router
