<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios';
import moment from 'moment'
import Bouncecat from '../assets/images/bouncecat.gif'
import catReaction from '../assets/images/reactions/cat.png'
import eggReaction from '../assets/images/reactions/egg.png'
import madReaction from '../assets/images/reactions/mad.png'
import Contactform from './c_contactform.vue';
const submitted = ref(false)
const txtName = ref('')
const txtMessage = ref('')
const successVisible = ref(false)
const successShrink = ref(false)
const chars = ref(0)
const max = ref(false)
const reactions = ref([catReaction, eggReaction, madReaction])
const selectedReaction = ref(0)
const loading = ref(true)
const failed = ref(false)
const entries = ref([])
const currentPage = ref(1)
const entriesPerPage = 3
const hasMoreEntries = ref(true)
const hasPreviousEntries = ref(false)

//date for new post uploads
let date = ref('')

setInterval(() => {
  date.value = moment(new Date())
}, 1000)

async function getEntries() {
  loading.value = true;
  try {
    // Calculate the offset based on the current page and entries per page
    const offset = (currentPage.value - 1) * entriesPerPage;

    // Fetch entries from the backend API with pagination
    const response = await axios.get('http://localhost:3001/api/tguestbook', {
      params: {
        offset,
        limit: entriesPerPage,
      },
    });

    // update entries with the data returned from the backend
    entries.value = response.data.entries; // Update with paginated entries
    const totalEntries = response.data.total; // Get the total count of entries

    // update pagination flags
    hasMoreEntries.value = currentPage.value * entriesPerPage < totalEntries;
    hasPreviousEntries.value = currentPage.value > 1;

    loading.value = false;
  } catch (error) {
    console.error('Error fetching messages:', error);
    failed.value = true;
    loading.value = true;
  }
}

// load the next set of entries if there are more
function loadNext() {
  if (hasMoreEntries.value) {
    currentPage.value += 1; // Increment current page
    getEntries(); // Fetch new entries based on the updated page
  }
}

// loads the previous set of entries
function loadPrevious() {
  if (hasPreviousEntries.value) {
    currentPage.value -= 1
    getEntries()
  }
}

// // load entries on page load
onMounted(() => {
  getEntries()
})

// Inserts a new entry into the database
async function insertEntry() {
  try {
    // Prepare data to be sent
    const payload = {
      created_at: date.value, // Date of entry
      name: txtName.value,    // User's name
      message: txtMessage.value, // User's message
      reaction: selectedReaction.value, // Reaction (index of selected image)
    };

    // Send POST request to the backend to insert data
    const response= await axios.post('http://localhost:3001/api/tguestbook', payload)
        // Check if the response is successful


      if (response.status===200){
        getEntries()
        currentPage.value = 1
      }


  } catch (error) {
    // Handle error
    console.error('Error inserting entry:', error);
    failed.value = true;
  }
}


// watch for changes in txtMessage to update character count
watch(txtMessage, newValue => {
  chars.value = newValue.length
  max.value = chars.value >= 100
})

// gets selected reaction
function selectReaction(index) {
  selectedReaction.value = index
}
//returns true to show which img has been clicked, all else false
function reactionSelected(index) {
  return selectedReaction.value === index
}

// validate the fields not empty)
const checkEntry = () => {
  return txtName.value && txtMessage.value
}

// adds a new entry then clears all fields
const addEntry = async () => {
  window.scrollTo(0, 0) // scroll to the top
  insertEntry()
  txtName.value = ''
  txtMessage.value = ''
  reactionSelected.value = 0
  successVisible.value = true // show success messages


  setTimeout(() => {
    successShrink.value = true // Hide success message after 1.5 seconds
  }, 1500)
}


//  form submission
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
  selectedReaction.value = 0
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
        <p class="successtext"><b>Message posted!</b></p>
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
          <h3>What you will say to me:</h3>
          <div class="field name">
            <label>Name: </label>
            <input
              v-model="txtName"
              maxlength="10"
              class="formfield"
              type="text"
              placeholder="Anonymous"
              :class="{ invalid: !txtName && submitted }"
            />
          </div>

          <div class="field reactionholder">
            <label>How do you feel?</label>
            <img
              v-for="(reaction, index) in reactions"
              :key="index"
              :src="reaction"
              @click="selectReaction(index)"
              :class="{ selected: reactionSelected(index) }"
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
              maxlength="100"
              :class="{ invalid: !txtMessage && submitted }"
            ></textarea>
          </div>
          <label class="field charlimit" :class="{ alert: max }"
            >{{ chars }}/100</label
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

        <div class="loading" v-if="loading">
          <img class="loadingcat rotating" :src="Bouncecat" />
          <p v-if="!failed">Hold on...</p>
          <p v-if="failed">Something went wrong??</p>
        </div>

        <div v-else v-for="entry in entries" :key="entry.id" class="entry">
          <div class="reaction"><img :src="reactions[entry.reaction]" /></div>
          <div class="messagewrapper holder">
            <div class="date">{{ moment(entry.created_at).format('MM/D/YYYY') }}</div>
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
    <Contactform />
  </div>
</template>

<style>

@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}

</style>
