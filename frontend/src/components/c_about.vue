<script setup>
import { ref, watch, onMounted } from 'vue'
import smallPhoto from '../assets/images/me_small.jpg'
import fullPhoto from '../assets/images/me.jpg'

const fullimage = ref(false)
const photoState = ref([fullPhoto, smallPhoto])
const windowWidth = ref(window.innerWidth)

watch(windowWidth, () => {
  // Do something when window width changes....
  // sets mobile menu to false when screen wide enough, so body can be scrolled
  if (windowWidth.value > 1471) {
    fullimage.value = true
  } else {
    fullimage.value = false
  }
})

// Update windowWidth on resize
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
  console.log(window.innerWidth)
})

windowWidth.value = window.innerWidth
onMounted(() => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value > 1471) {
    fullimage.value = true
  } else {
    fullimage.value = false
  }
})
</script>

<template>
  <div id="about" class="maincontent info">
    <div class="text">
      <h2 style="font-size: 40px">About Joelle</h2>
      <div class="aboutphoto">
        <img class="mephoto" v-show="fullimage" :src="photoState[0]" />
        <img class="mephoto" v-show="!fullimage" :src="photoState[1]" />
      </div>
      <div class="aboutsummary">
        <div class="whois">
          <h2 class="summaryhead">Who is she?</h2>
          <p class="summary">
            Joelle Tindall was born and raised right here in Cincinnati.<br /><br />
            She studied computer programming and database management at
            Cincinnati State Technical and Community College, resulting in an
            Associate Degree in Applied Sciences. She furthered her studies at
            Northern Kentucky University, which culminated into a Bachelors of
            Science, majoring in Computer Information Technology.
            <br /><br />
            Joelle has since used her powers for both good and evil,
            <a href="https://play.date/games/search/?q=Joelle+Tindall"
              >creating games for the PlayDate</a
            >
            in her spare time.
          </p>
        </div>
        <div class="cando">
          <h2 style="margin: auto">What can she do?</h2>
          <div>
            <h3>Languages and Types</h3>
            <ul style="list-style-type: none">
              <br />
              <li>HTML5</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>jQuery</li>
              <li>Vuejs/Vue 3</li>
              <li>C#</li>
              <li>Lua</li>
              <li>Python</li>
              <li>VB/VB.net</li>
              <li>ASP.net</li>
              <li>PHP</li>
              <li>SQL</li>
              <li>JSON</li>
              <li>Docker Scripts</li>
              <li>Pulp Engine</li>
              <li>Playdate SDK</li>
              <li>And more!</li>
            </ul>
          </div>
          <div>
            <h3>Programs and Systems</h3>
            <ul style="list-style-type: none">
              <br />
              <li>Visual Studio</li>
              <li>Docker</li>
              <li>dBeaver</li>
              <li>Microsoft Access</li>
              <li>Microsoft Office</li>
              <li>Active Directory</li>
              <li>Microsoft SQL Server</li>
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>Apache</li>
              <li>Github</li>
              <li>Windows</li>
              <li>Linux</li>
              <li>Mac</li>
            </ul>
          </div>
        </div>
        <div><br /></div>
      </div>
    </div>
  </div>
</template>

<style></style>
