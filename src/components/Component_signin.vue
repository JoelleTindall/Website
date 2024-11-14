<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { useAuthStore } from '../auth' // The authentication store

const txtName = ref('')
const txtPassword = ref('')
const failed = ref(false)

const router = useRouter()

const auth = useAuthStore() // Get the auth store

function handleLogin() {
  // Attempt to log in with the credentials
  auth.login(txtName.value, txtPassword.value)

  // After successful login, check if there's a redirect URL
  if (auth.isAuthenticated.value) {
    const redirectTo = router.currentRoute.value.query.redirect || '/admin'
    router.push(redirectTo) // Redirect to the original requested page
  } else {
    failed.value = true
  }
}
</script>

<template>
  <div id="contentwrapper">
    <div id="about" class="maincontent info">
      <div class="text login">
        <form class="loginform" @submit.prevent="handleLogin">
          <h3 class="failure" v-if="failed">Failed</h3>
          <label>Username: </label>
          <input
            v-model="txtName"
            maxlength="15"
            class="formfield"
            type="text"
          />
          <label>Password: </label>
          <input
            v-model="txtPassword"
            maxlength="15"
            class="formfield"
            type="password"
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.loginform {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 10px;
  gap: 5px;
}

.text.login {
  width: 30%;
  margin: 0 auto;
  text-align: left;
  margin-top: 30px;
}
.text.login label {
  padding-top: 10px;
}

.text.login button {
  margin-top: 30px;
}

.failure {
  color: red;
}
</style>
