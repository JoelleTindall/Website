import { ref } from 'vue'

export function useAuthStore() {
  // checks login status
  const isAuthenticated = ref(false)

  // coded credentials for demo purposes
  const validUsername = 'test'
  const validPassword = 'test'

  // request to validate credentials
  const login = async (username, password) => {
    if (username === validUsername && password === validPassword) {
      // Success

      isAuthenticated.value = true
      localStorage.setItem('auth-token', 'your-auth-token') // Store a token in localStorage
    } else {
      // Failure
      isAuthenticated.value = false
    }
  }

  // logout
  const logout = () => {
    isAuthenticated.value = false
    // clear the token from localStorage
    localStorage.removeItem('auth-token')
  }

  const checkAuthentication = () => {
    // check for token exists in localStorage
    isAuthenticated.value = !!localStorage.getItem('auth-token')
  }

  // initialize authentication state when  app loads
  checkAuthentication()

  return {
    isAuthenticated,
    login,
    logout,
  }
}
