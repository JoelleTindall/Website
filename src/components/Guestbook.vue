<script>
import { ref, watch } from 'vue'

export default {
  setup() {
    const submitted = ref(false)
    const txtName = ref('')
    const txtMessage = ref('')
    const successVisible = ref(false)
    const successShrink = ref(false)

    //example entries and array, would be stored and retrieved in DB in real version
    const entries = ref([
      {
        name: 'Alice',
        message:
          'This is a great guestbook! Wow I love it so Im gonna leave a longgg message!! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaa HAHA okay Im done!!'
      },
      { name: 'pair of pants', message: 'shit sucks' },
    ])
    const chars = ref(0)
    const max = ref(false)

    // Watch for changes in txtMessage to update character count
    watch(txtMessage, newValue => {
      chars.value = newValue.length // Update character count
      max.value = chars.value >= 150 // Check if max is reached
    })

    //validates entry (no empty fields)
    const checkEntry = () => {
      if (!txtName.value || !txtMessage.value) {
        return false
      } else {
        return true
      }
    }

    // Function to add entry
    const addEntry = () => {
      window.scrollTo(0, 0)
      entries.value.unshift({ name: txtName.value, message: txtMessage.value })
      txtName.value = ''
      txtMessage.value = ''
      successVisible.value = true
      setTimeout(() => {
        successShrink.value = true
      }, 2000) // Show for 2 seconds
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

    return {
      txtName,
      txtMessage,
      entries,
      chars,
      max,
      addEntry,
      resetForm,
      successVisible,
      handleSubmit,
      submitted,
      successShrink,
    }
  },
}
</script>
<template>
  <div id="guestbook" class="maincontent info">
    <div class="text">
      <h2>Guestbook!!!</h2>
    </div>

    <div class="guestwrapper" :class="{ shrink: successShrink }">

      <div v-if="successVisible" class="success-message" :class="{ shrink: successShrink }">
        <p><b>Message posted!</b></p>
      </div>

      <form id="GuestForm" v-if="!successVisible" @submit.prevent="handleSubmit" class="form-column">
        <div id="Formwrapper" class="maincontent guestform" :class="{ shrink: successShrink }">
          <div class="field name">
            <label>Name: </label>
            <input v-model="txtName" maxlength="25" class="formfield" type="text" placeholder="Anonymous"
              :class="{ invalid: !txtName && submitted }" />
          </div>

          <div class="field message">
            <label>Message: </label>
            <textarea v-model="txtMessage" class="field messagebox" placeholder="Say something nice or mean" rows="4"
              cols="35" maxlength="150" :class="{ invalid: !txtMessage && submitted }"></textarea>
          </div>
          <label class="field charlimit" :class="{ alert: max }">{{ chars }}/150</label>
          <div class="field button">
            <button type="button" @click="resetForm">Nevermind!</button>
            <button type="submit">Post!</button>
          </div>
        </div>
      </form>


      <div id="messagewrapper" class="message-wrapper" :class="{ shrink: successShrink }">
        <h3>What people have said to me:</h3>
        <div v-for="(entry, index) in entries" :key="index" class="entry">
          <div class="messagewrapper holder">
            <div class="displayname">{{ entry.name }} says..</div>
            <div class="msg">{{ entry.message }}</div>
          </div>
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
    grid-template-rows: 1.0fr 1.0fr;

  }


  div.guestwrapper.shrink {

    grid-template-rows: 0.0fr 1.0fr;
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
}

.guestwrapper {

  padding: 10px;
  background-color: rgba(255, 255, 255, 0.645);
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
  border-radius: 20px;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% 50%;
  transition: grid-template-columns 1s, grid-template-rows 1s, gap 1s;
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
  border-radius: 20px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  transition: width 1s, margin 1s;
  background-color: #bae4f944;
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
  margin: 10px 0;
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

#Formwrapper .field.button {
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
</style>
