<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios';
import moment from 'moment'
import Bouncecat from '../assets/images/bouncecat.gif'
import catReaction from '../assets/images/reactions/cat.png'
import eggReaction from '../assets/images/reactions/egg.png'
import madReaction from '../assets/images/reactions/mad.png'

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

.successtext {
  text-wrap: nowrap;
}
.reaction {
  width: fit-content;
  grid-column: 1;
  margin-left: auto;
}
.reaction img {
  width: 50px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.336);
  margin-right: 2px;
}
.reactionholder {
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
  background-color: #ffffff3b;
  border-radius: 30px;
}

.reactionholder label {
text-wrap: nowrap;
grid-column: 1 / span 3;
}

.reactionholder img {
  margin: 0 auto;
  height: 50px;
  background-color: #e4c1f933;
  padding: 0 20px;
  border: 2px solid rgba(0, 0, 0, 0.274);
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
  cursor: pointer;
  user-select: none;
  grid-row: 2;
}

.reactionholder img:hover {
  box-shadow: 5px 5px rgba(0, 0, 0, 0.182);
  background-color: #e4c1f971;
  border-color: rgba(0, 0, 0, 0.574);
}

.reactionholder img.selected {
  box-shadow: 5px 5px rgba(0, 0, 0, 0.182);
  background-color: #e4c1f9;
  border-color: rgba(0, 0, 0, 0.574);
}

.loading {
  text-align: center;
}
.loadingcat {
  height: 100px;
  width: 100px;
}

.date {
  float: right;
  font-style: italic;
  opacity: 75%;
  font-size: 14px;
  padding-top: 5px;
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

  width: 100%;
  height: auto;
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
  display: grid;
  grid-template-columns: 20% 80%;
  min-width: 100%;
  border-radius: 10px;
}

div.messagewrapper.holder {
  width: 90%;
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
  font-size: 2em;
  text-align: center;
}
.field.button.pag {
  align-content: end;
}
button:disabled {
  opacity: 0% !important;
  cursor: default;
}
</style>
