<script setup>
import { ref, watch, onMounted } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const submitted = ref(false)
const txtName = ref('')
const txtMessage = ref('')
const successVisible = ref(false)
const successShrink = ref(false)
const chars = ref(0)
const max = ref(false)

//example entries and array, would be stored and retrieved in DB in real version
// const entries = ref([
//   {
//     name: 'Alice',
//     message:
//       'This is a great guestbook! Wow I love it so Im gonna leave a longgg message!! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaa HAHA okay Im done!!',
//   },
//   { name: 'pair of pants', message: 'shit sucks' },
// ])

const entries = ref([]) // Store the currently displayed entries
const currentPage = ref(1) // Page number for pagination
const entriesPerPage = 3 // Max number of entries to display per page
const hasMoreEntries = ref(true) // Flag to indicate whether there are more entries to load
const hasPreviousEntries = ref(false) // Flag to indicate if previous entries exist

// Function to fetch entries based on the current page
async function getEntries() {
  try {
    const { data, error, count } = await supabase
      .from('TGuestbook')
      .select('*', { count: 'exact' })
      .range(
        (currentPage.value - 1) * entriesPerPage, // Calculate the range start
        currentPage.value * entriesPerPage - 1, // Calculate the range end
      )

    if (error) throw error

    // If it's the first page, we just load the entries; otherwise, we replace the current entries
    if (currentPage.value === 1) {
      entries.value = data
    } else {
      entries.value = data // Replace old entries with new ones for this page
    }

    // Update flags based on pagination
    hasMoreEntries.value = currentPage.value * entriesPerPage < count
    hasPreviousEntries.value = currentPage.value > 1
  } catch (err) {
    console.error('Error fetching entries:', err)
  }
}

// Function to load the next set of entries
function loadNext() {
  if (hasMoreEntries.value) {
    currentPage.value += 1 // Increment the page number
    getEntries() // Fetch the next set of entries
  }
}

// Function to load the previous set of entries
function loadPrevious() {
  if (hasPreviousEntries.value) {
    currentPage.value -= 1 // Decrement the page number
    getEntries() // Fetch the previous set of entries
  }
}

onMounted(() => {
  getEntries() // Load initial entries on page load
})

// Inserting a new entry into the database
async function insertEntry() {
  await supabase
    .from('TGuestbook')
    .insert({ name: txtName.value, message: txtMessage.value })
}

// Watch for changes in txtMessage to update character count
watch(txtMessage, newValue => {
  chars.value = newValue.length // Update character count
  max.value = chars.value >= 150 // Check if max character count is reached
})

// Validate the entry (checking if fields are not empty)
const checkEntry = () => {
  return txtName.value && txtMessage.value
}

// Function to add a new entry
const addEntry = async () => {
  window.scrollTo(0, 0) // Scroll to the top
  await insertEntry() // Insert the new entry into the database
  txtName.value = '' // Clear the name field
  txtMessage.value = '' // Clear the message field
  successVisible.value = true // Show success message
  getEntries() // Reload entries
  setTimeout(() => {
    successShrink.value = true // Hide success message after 2 seconds
  }, 2000)
}
// Handle form submission
const handleSubmit = () => {
  submitted.value = true
  //validates entry and returns true if good, then adds with addEntry
  if (checkEntry()) {
    addEntry()
  }
}

const resetForm = () => {
  txtName.value = ''
  txtMessage.value = ''
  submitted.value = false
}
</script>

<template>
  <div id="guestbook" class="maincontent info">
    <div class="text">
      <h2>Guestbook!!!</h2>
    </div>

    <div class="guestwrapper" :class="{ shrink: successShrink }">
      <div
        v-if="successVisible"
        class="success-message"
        :class="{ shrink: successShrink }"
      >
        <p><b>Message posted!</b></p>
      </div>

      <form
        id="GuestForm"
        v-if="!successVisible"
        @submit.prevent="handleSubmit"
        class="form-column"
      >
        <div
          id="Formwrapper"
          class="maincontent guestform"
          :class="{ shrink: successShrink }"
        >
          <h3>What people have said to me:</h3>
          <div class="field name">
            <label>Name: </label>
            <input
              v-model="txtName"
              maxlength="25"
              class="formfield"
              type="text"
              placeholder="Anonymous"
              :class="{ invalid: !txtName && submitted }"
            />
          </div>

          <div class="field message">
            <label>Message: </label>
            <textarea
              v-model="txtMessage"
              class="field messagebox"
              placeholder="Say something nice or mean"
              rows="4"
              cols="35"
              maxlength="150"
              :class="{ invalid: !txtMessage && submitted }"
            ></textarea>
          </div>
          <label class="field charlimit" :class="{ alert: max }"
            >{{ chars }}/150</label
          >
          <div class="field button">
            <button type="button" @click="resetForm">Nevermind!</button>
            <button type="submit">Post!</button>
          </div>
        </div>
      </form>

      <div
        id="messagewrapper"
        class="message-wrapper"
        :class="{ shrink: successShrink }"
      >
        <h3>What people have said to me:</h3>
        <div v-for="entry in entries" :key="entry.id" class="entry">
          <div class="messagewrapper holder">
            <div class="displayname">{{ entry.name }} says..</div>
            <div class="msg">{{ entry.message }}</div>
          </div>
        </div>
        <div class="field button pag">
          <button @click="loadPrevious" :disabled="!hasPreviousEntries">
            <
          </button>
          <button @click="loadNext" :disabled="!hasMoreEntries">></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* mobile-narrow view */
@media only screen and (max-width: 768px) {
  div#GuestForm {
    border-radius: 20px;
  }

  div.guestwrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 1fr;
  }

  div.guestwrapper.shrink {
    grid-template-rows: 0fr 1fr;
    grid-template-columns: 100%;
    gap: 0px;
  }

  div.success-message {
    border-radius: 20px;
  }

  div#messagewrapper.message-wrapper {
    margin-top: 30px;
    grid-row: 2;
    border-radius: 20px;
  }

  div#messagewrapper.shrink {
    margin: auto;
    width: 100%;
  }
}

#GuestForm {
  border-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-top: 0;
  overflow: clip;
  grid-column: 1;
  background-color: #bae4f944;
}

div.field.message textarea {
  height: 200px;
}

#GuestForm div#Formwrapper {
  padding-top: 0;
  min-height: 590px;
  padding: 10px;
}

.guestwrapper {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.645);
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
  border-radius: 20px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% 50%;
  transition:
    grid-template-columns 1s,
    grid-template-rows 1s,
    gap 1s;
}

.guestwrapper.shrink {
  grid-template-columns: 0% 100%;
  gap: 0px;
}

.success-message {
  overflow: hidden;
  width: 100%;

  grid-column: 1;
  text-align: center;

  border-radius: 10px;
  padding: 10px;
  font-size: 1.2em;
  background-color: #bae4f944;
}

.success-message p {
  padding-top: 30px;
  font-size: calc(1vw + 2vh);
}

.success-message.shrink {
  background-color: #ffffff00;
}

#Formwrapper {
  display: grid;
  border-radius: 20px;
  gap: 10px;
  padding-top: 20px;
}

#Formwrapper .field {
  display: inline-grid;
  padding: 10px;
}

label {
  font-weight: bold;
  padding-bottom: 2px;
}

.alert {
  color: red;
}

.formfield {
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
  border-radius: 5px;
  border: 2px solid #27022b70;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
}

textarea {
  resize: none;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #a596a7;
  font-size: 16px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
}

.componentwrapper {
  display: grid;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
}

.invalid {
  border-color: red;
}

#messagewrapper {
  display: grid;
  padding: 10px;
  padding-bottom: 30px;
  width: 100%;
  height: 600px;
  border-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition:
    width 1s,
    margin 1s;
  background-color: #bae4f944;
  gap: 10px;
}

#messagewrapper.shrink {
  margin: auto;
  width: 50%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

#messagewrapper h3 {
  display: inline-grid;
  text-align: center;
}

.entry {
  display: inline-grid;

  min-width: 100%;
  border-radius: 10px;
}

div.messagewrapper.holder {
  width: 80%;
  margin: 0 auto;
}

.displayname {
  font-weight: bold;
  padding: 5px;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 0;
  width: fit-content;
  position: relative;
  margin-bottom: 0px;
  z-index: 10;
}

.msg {
  z-index: 8;
  position: relative;
  border-radius: 10px;
  margin-top: -4px;
  border-top-left-radius: 0;
  background-color: #ffffff;
  padding: 8px;
  word-break: break-word;
  font-style: italic;
  box-shadow: 10px 10px rgba(0, 0, 0, 0.082);
}

button {
  margin: 0 auto;
  height: 50px;
  width: 90%;
  text-wrap: nowrap;
  border-style: none;
  cursor: pointer;
  background-color: #e4c1f9;
  border-radius: 5px;
  font-size: 20px;
}

.field.button {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
}

#Formwrapper .field.charlimit {
  text-align: right;
  font-size: 15px;
  padding: 0;
  padding-right: 10px;
  padding-bottom: 5px;
}

div.text {
  background-color: rgba(255, 255, 255, 0.645);
}

.field.button.pag button {
  width: 60%;
}
.field.button.pag {
  align-content: end;
}
button:disabled {
  opacity: 0% !important;
  cursor: default;
}
</style>
