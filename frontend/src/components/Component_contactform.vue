<template>
  <div id="contact" class="maincontent info">
    <div class="text">
      <h2>Contact Me</h2>
      <p>
        You can reach me at <a href="mailto:JoelleStuff@gmail.com">my email</a> or submit something
        through the form below!
      </p>
    </div>
    <div class="componentwrapper">
      <form @submit.prevent="addMessage" @reset="resetForm" id="ContactForm" novalidate="">
        <div v-if="!success" id="Formwrapper" class="maincontent contactform">
          <div class="field name">
            <label>Name: <label v-if="!txtName && submitted" style="color:red;">Enter a name!</label></label>
            <input v-model="txtName" maxlength="25" class="formfield" type="text"
              :class="{ invalid: !txtName && submitted }" />
          </div>

          <div class="field email">
            <label>Email Address: <label v-if="(!emailValid || !txtEmail) && submitted" style="color:red;">Enter a valid
                email!</label></label>
            <input v-model="txtEmail" maxlength="30" class="formfield" type="email"
              :class="{ invalid: !txtEmail && submitted }" />
          </div>

          <div class="field message">
            <label>Message: <label v-if="!txtMessage && submitted" style="color:red;">Enter a message!</label></label>
            <textarea v-model="txtMessage" class="field messagebox" placeholder="Tell me about it.." rows="4" cols="35"
              maxlength="150" :class="{ invalid: !txtMessage && submitted }"></textarea>
          </div>
          <label class="field charlimit" :class="{ alert: max }">
            {{ chars }}/150
          </label>
          <div class="field button">
            <button type="reset">Reset!</button>
            <button type="submit">Send it!</button>
          </div>
        </div>
        <div v-else id="Formwrapper" class="maincontent contactform">

          <p class="successmessage" style="height:100%;">
            Your message was Sent! Except not really.
          </p>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup() {
    const txtName = ref('')
    const txtEmail = ref('')
    const txtMessage = ref('')
    const chars = ref(0)
    const max = ref(false)
    const success = ref(false)
    const submitted = ref(false)

    //email regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailValid = ref(true)

    // Watcher for character count in txtMessage
    watch(txtMessage, newValue => {
      chars.value = newValue.length
      max.value = chars.value >= 150
    })

    const addMessage = () => {
      submitted.value = true;



      if (txtName.value && txtEmail.value && txtMessage.value && emailRegex.test(txtEmail.value)) {
        success.value = true;
        window.scrollTo(0, 0);
      } else {
        if (!txtName.value || !txtEmail.value || !txtMessage.value || !emailRegex.test(txtEmail.value)) {
          if (!emailRegex.test(txtEmail.value)) {
            emailValid.value = false;
          }
          success.value = false;

        }
      }
    }

    const resetForm = () => {
      txtName.value = ''
      txtEmail.value = ''
      txtMessage.value = ''
      success.value = false
      submitted.value = false
    }

    return {
      txtName,
      txtEmail,
      txtMessage,
      chars,
      max,
      success,
      addMessage,
      resetForm,
      submitted,
      emailRegex,
      emailValid,
    }
  }
}
</script>

<style>
#Formwrapper {
  display: grid;

  border-radius: 20px;
  gap: 0;

  margin: 0 auto;
  max-width: 540px;
  min-width: 75%;

  padding-top: 30px;
}

#ContactForm {

  margin:0 auto;
}


.componentwrapper {
  display: grid;

  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
  padding-bottom: 30px;
}

#Formwrapper .field {
  display: inline-grid;
  padding: 10px;
}

label {
  font-weight: bold;
  padding-bottom: 2px;
}

input[type='text'],
input[type='email'] {
  border: 2px solid #27022b70;
  height: 30px;
  border-radius: 5px;
  font-size: 16px;
}

.alert {
  color: red;
}

.successmessage {
  text-align: center;
  font-weight: bold;
}


textarea {
  resize: none;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #a596a7;
  font-size: 16px;
}

.invalid {
  border-color: red !important;
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
  font-family: 'Concert One', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
  color: black;
}


#Formwrapper .field.button {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
}

#Formwrapper .field.charlimit {
  text-align: right;
  font-size: 15px;
  padding: 0;
  padding-bottom: 5px;
  padding-right: 10px;
}
</style>
