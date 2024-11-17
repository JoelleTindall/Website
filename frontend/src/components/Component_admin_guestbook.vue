<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import moment from 'moment'
import Bouncecat from '../assets/images/bouncecat.gif'

const loading = ref(true)
const failed = ref(false)
const entries = ref([])
const currentPage = ref(1)
const entriesPerPage = 3
const hasMoreEntries = ref(true)
const hasPreviousEntries = ref(false)

//date for new post uploads

// fetches entries based on the currentpage.value
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
    loading.value = false;
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


async function removeEntry(selectedID) {
  loading.value = true;
  try {
    // Send a DELETE request to the backend to remove the entry by ID
    const response = await axios.delete(`http://localhost:3001/api/tguestbook/${selectedID}`);

    // Check if the response is successful
    if (response.status === 200) {
      // Successfully deleted the entry, now reload the entries
      getEntries();
    } else {
      throw new Error('Failed to delete entry');
    }

    loading.value = false;
  } catch (err) {
    failed.value = true;
    console.error('Error deleting entry:', err);
  }
}


// async function removeEntry(selectedID) {
//   loading.value = true
//   console.log(selectedID)
//   try {
//     const { error } = await supabase
//       .from('TGuestbook')
//       .delete()
//       .eq('id', selectedID)

//     if (error) throw error

//     loading.value = false
//     getEntries()
//   } catch (err) {
//     failed.value = true
//     console.error('Error deleting entry:', err)
//   }
// }

// load entries on page load
onMounted(() => {
  getEntries()
})
</script>

<template>
  <div id="guestbook" class="maincontent info">
    <div id="messagewrapper" class="message-wrapper">
      <h3>Remove stuff here:</h3>

      <div class="loading" v-if="loading">
        <img class="loadingcat rotating" :src="Bouncecat" />
        <p v-if="!failed">Hold on...</p>
        <p v-if="failed">Something went wrong??</p>
      </div>

      <div v-else v-for="entry in entries" :key="entry.id" class="entry">
        <div class="reaction">
          <button class="remove" @click="removeEntry(entry.id)">X</button>
        </div>
        <div class="messagewrapper holder">
          <div class="date">{{ moment(entry.created_at).format('MM/D/YYYY') }}</div>
          <div class="displayname">{{ entry.name }} says..</div>
          <div class="msg">{{ entry.message }}</div>
        </div>
      </div>

      <div class="field button pag">
        <button @click="loadPrevious" :disabled="!hasPreviousEntries"><</button>
        <button @click="loadNext" :disabled="!hasMoreEntries">></button>
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

.remove {
  width: 50px;
  margin-right: 10px;
}

.successtext {
  text-wrap: nowrap;
}
.reaction {
  grid-column: 1;
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
