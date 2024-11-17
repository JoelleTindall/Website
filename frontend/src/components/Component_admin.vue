<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../auth'

import Guestbook from './Component_admin_guestbook.vue'
import Projects from './Component_admin_projects.vue'
const router = useRouter()
const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  router.push({ name: 'SignIn' }) // Redirect to home after logging out
}
</script>

<template>
  <div class="adminheader">
    <h2>Welcome, Admin<button @click="handleLogout">Logout</button></h2>
  </div>
  <div class="adminwrapper">
    <div class="manageProjects">
      <h2>Projects</h2>
      <Projects />
    </div>
    <div class="manageGuestbook">
      <h2>Guestbook</h2>
      <Guestbook />
    </div>
  </div>
</template>

<style>
.adminwrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.459);
  padding: 10px;
  border-radius: 20px;
  gap: 20px;
}

.adminheader {
  text-align: center;
}
.manageProjects {
  background-color: #fcf6bd;
}

.manageGuestbook {
  background-color: #a9def9;
}

.manageProjects,
.manageGuestbook {
  border-radius: 10px;
  padding: 10px;
}

.manageProjects h2,
.manageGuestbook h2 {
  text-align: center;
}
</style>
