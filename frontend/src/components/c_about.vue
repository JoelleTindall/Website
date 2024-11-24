<script setup>
import { ref, watch, onMounted } from 'vue'
import smallPhoto from '../assets/images/me_small.jpg'
import fullPhoto from '../assets/images/me.jpg'


const fullimage=ref(false)
const photoState=ref([fullPhoto,smallPhoto])
const windowWidth = ref(window.innerWidth)



watch(windowWidth, () => {
  // Do something when window width changes....
  // sets mobile menu to false when screen wide enough, so body can be scrolled
  if (windowWidth.value > 960) {
    fullimage.value = true
  } else {
    fullimage.value=false
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
  if (windowWidth.value > 960) {
    fullimage.value = true
  } else {
    fullimage.value=false
  }
})
</script>

<template>
  <div id="about" class="maincontent info">
    <div class="text">
      <h2>About Joelle</h2>
      <div class="aboutphoto">
        <img class="mephoto" v-show="(fullimage)" :src="photoState[0]" />
        <img class="mephoto" v-show="(!fullimage)" :src="photoState[1]"/>
      </div>
      <div class="aboutsummary">
        <p>
          Joelle Tindall was born and raised right here in Cincinnati.<br /><br />
          She studied computer programming and database management at Cincinnati
          State Technical and Community College, resulting in an Associate Degree
          in Applied Sciences. She furthered her studies at Northern Kentucky
          University, which culminated into a Bachelors of Science, majoring in
          Computer Information Technology.
          <br /><br />
          Joelle has since used her powers for both good and evil,
          <a href="https://play.date/games/search/?q=Joelle+Tindall"
            >creating games for the PlayDate</a> in her spare time.
        </p>
      </div>
      <div class="aboutsummary2"><h2 style="padding-top:10px;">What can she do?</h2></div>
    </div>
  </div>
</template>

<style>

.aboutsummary2 {
  grid-column: 1 /span 2;
}

@media only screen and (max-width: 960px) {
.text .aboutsummary {
      padding-top:10%;
      margin:0 auto;
      height:100%;
      grid-column: 1 /span 2;

    }
    div.aboutsummary{
      margin-top: 0px;
    }

    #about .text .aboutphoto {

      grid-row: 2;
      grid-column: 1 /span 2;

    }

    #about .text .aboutsummary {
      grid-column: 1;
      grid-row: 3;
      grid-column: 1 /span 2;
    }

    #about .text h2 {

      grid-column: 1;
      grid-column: 1 /span 2;
    }


    .mephoto {
      width: 75%;
      max-width: 350px;
      border: 8px solid rgba(0, 0, 0, 0.2);
    }

    .aboutsummary p {
    margin-left: 10px;
  }
  }

</style>
