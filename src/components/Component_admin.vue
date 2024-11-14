<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../auth'

import Guestbook from './Component_guestbook.vue'

// import Bouncecat from '../assets/images/bouncecat.gif'
// import catReaction from '../assets/images/reactions/cat.png'
// import eggReaction from '../assets/images/reactions/egg.png'
// import madReaction from '../assets/images/reactions/mad.png'

// const loading = ref(true)
// const failed = ref(false)
// const entries = ref([])
// const currentPage = ref(1)
// const entriesPerPage = 3
// const hasMoreEntries = ref(true)
// const hasPreviousEntries = ref(false)
const router = useRouter()
const auth = useAuthStore()
const entries = Guestbook.entries
function handleLogout() {
  auth.logout()
  router.push({ name: 'SignIn' }) // Redirect to home after logging out
}

// load entries on page load
onMounted(() => {
  Guestbook.getEntries()
})
</script>

<template>
  <div>
    <button @click="handleLogout">Logout</button>
  </div>
  <div class="adminwrapper">
    <div class="manageProjects">
      <h2>Projects</h2>
    </div>
    <div class="manageGuestbook">
      <h2>Guestbook</h2>
      <div v-for="entry in entries" :key="entry.id" class="entry">
        <div class="reaction"><img :src="reactions[entry.reaction]" /></div>
        <div class="messagewrapper holder">
          <div class="date">{{ entry.created_at }}</div>
          <div class="displayname">{{ entry.name }} says..</div>
          <div class="msg">{{ entry.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.adminwrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.459);
  padding: 10px;
  border: 2px solid black;
  gap: 20px;
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
