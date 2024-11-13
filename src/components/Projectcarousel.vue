<template>
  <div id="projects" class="maincontent info">
    <div class="text">
      <h2>My Projects</h2>
      <p>
        My most notable projects are my PlayDate games. Here's what I've
        released so far!<br />
      </p>
    </div>

    <div class="overlay" v-if="bigimage" @click="focusimage">
      <div class="overlaywrapper">
        <div></div>
        <img class="overlayimage" :src="focusedImage" />
        <div></div>
      </div>
    </div>
    <div id="CaroWrapper">
      <div class="gameholder" v-for="card in cards" :key="card">
        <div class="card">
          <div class="content">
            <img class="gameimage" :src="card[2]" />
          </div>

          <div class="ptitleholder" :class="{ expand: isExpanded(card) }">
            <img class="titleimage" :src="card[7]" :alt="card[0]" />
            <h3>{{ card[1] }}</h3>
          </div>
        </div>
        <div
          class="arrowholder"
          :class="{ expand: isExpanded(card) }"
          @click="expandInfo(card, card)"
        >
          <img
            class="arrowl"
            :id="'title' + card"
            :class="{ expand: isExpanded(card) }"
            :src="arrowIcon"
          />
          <p v-if="!isExpanded(card)"><b>More Info</b></p>
          <p v-else><b>Less Info</b></p>
          <img
            class="arrowr"
            :id="'title' + card"
            :class="{ expand: isExpanded(card) }"
            :src="arrowIcon"
          />
        </div>

        <div
          id="infoholder"
          :class="{ expand: isExpanded(card) }"
          v-show="isExpanded(card)"
        >
          <div id="gameinfo" v-if="card[0] === 'Touch Egg'">
            <p>
              <b
                >Finally, the revolutionary and culturally important egg
                experience comes to Playdate.</b
              ><br /><br />
              60 seconds on the clock, turn that crank and touch that egg! Watch
              your fingers and don’t let Him see you, his vision is based on
              movement!
            </p>
          </div>

          <div id="gameinfo" v-if="card[0] === 'Monster Elevator'">
            <p>
              <b>As a servant for the Monster Tower Resort and Spa...</b
              ><br /><br />
              Your goal is to go floor to floor constructing
              <i>premium</i> hamburger-style sandwiches for every resident. They
              paid a pretty penny, so these particular patrons prefer prompt
              perfection!
            </p>
          </div>

          <div id="gameinfo" v-if="card[0] === 'Rock, Paper, Scissors, Boom!'">
            <p>
              <b>..Okay. So what is it?</b> <br /><br />Rock, Paper, Scissors,
              Boom! takes the concept of traditional RPS (Pro term), and
              disregards it. Shift gravity with the d-pad (or the accelerometer)
              to move. As you do, you create rocks, papers, or scissors in your
              path!
            </p>
          </div>
          <div class="screenshots">
            <div class="container">
              <img class="ssimg" style="padding: 10px" :src="card[3]" />
              <div class="ssoverlay" @click="focusimage(card[3])">
                <img :src="magIcon" />
              </div>
            </div>
            <div class="container">
              <img
                class="ssimg"
                style="padding: 10px"
                :src="card[4]"
                @click="focusimage(screenshot)"
              />
              <div class="ssoverlay" @click="focusimage(card[4])">
                <img :src="magIcon" />
              </div>
            </div>
            <div class="container">
              <img
                class="ssimg"
                style="padding: 10px"
                :src="card[5]"
                @click="focusimage(screenshot)"
              />
              <div class="ssoverlay" @click="focusimage(card[5])">
                <img :src="magIcon" />
              </div>
            </div>
          </div>
          <a :href="card[6]" class="buybtnholder"
            ><button class="buybtn">Buy it!</button></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import image1 from '../assets/images/games/touch_egg/Touch Egg.png'
import image2 from '../assets/images/games/monster_elevator/Monster Elevator.png'
import image3 from '../assets/images/games/rpsb/RPSB.png'
import eggTitle from '../assets/images/games/touch_egg/webtitle.png'
import meTitle from '../assets/images/games/monster_elevator/webtitle.png'
import rpsbTitle from '../assets/images/games/rpsb/webtitle.png'
import ssEgg1 from '../assets/images/games/touch_egg/1.png'
import ssEgg2 from '../assets/images/games/touch_egg/2.gif'
import ssEgg3 from '../assets/images/games/touch_egg/3.png'
import ssMe1 from '../assets/images/games/monster_elevator/1.png'
import ssMe2 from '../assets/images/games/monster_elevator/2.gif'
import ssMe3 from '../assets/images/games/monster_elevator/3.png'
import ssRpsb1 from '../assets/images/games/rpsb/1.gif'
import ssRpsb2 from '../assets/images/games/rpsb/2.gif'
import ssRpsb3 from '../assets/images/games/rpsb/3.png'
import arrowIcon from '../assets/images/arrow.png'
import magIcon from '../assets/images/mglass.png'
const ss = ref([''])
const cards = ref([
  [
    'Touch Egg',
    'Will you survive the full time? Or will you become All Thumbs?',
    image1,
    ssEgg1,
    ssEgg2,
    ssEgg3,
    'https://play.date/games/touch-egg/',
    eggTitle,
  ],
  [
    'Monster Elevator',
    'Reach for the top as you serve up some slop!',
    image2,
    ssMe1,
    ssMe2,
    ssMe3,
    'https://play.date/games/monster-elevator/',
    meTitle,
  ],
  [
    'Rock, Paper, Scissors, Boom!',
    'A combustible, arcade-y twist on Rock Paper Scissors!',
    image3,
    ssRpsb1,
    ssRpsb2,
    ssRpsb3,
    'https://play.date/games/rock-paper-scissors-boom!/',
    rpsbTitle,
  ],
])

const bigimage = ref(false)
const currentGame = ref('')
const focusedImage = ref('')
const showGameInfo = ref(false)

//disable scrolling when menu open
watch(bigimage, newValue => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'initial'
  }
})

function expandInfo(selectedGame) {
  // If the selected card is already expanded, collapse it, else expand it
  if (isExpanded(selectedGame)) {
    currentGame.value = '' // Collapse all cards
  } else {
    currentGame.value = selectedGame[0] // Expand the clicked card
  }
  getSS(selectedGame[0]) // Load the screenshots for the selected game
  showGameInfo.value = !isExpanded(selectedGame) // Show or hide game info
}

function isExpanded(card) {
  return currentGame.value === card[0] // Check if the card is currently expanded
}

const focusimage = img => {
  focusedImage.value = img
  if (bigimage.value) {
    bigimage.value = false
  } else {
    bigimage.value = true
  }
}

function getSS(title) {
  ss.value = []
  if (title === 'Touch Egg') {
    ss.value.push(ssEgg1)
    ss.value.push(ssEgg2)
    ss.value.push(ssEgg3)
  } else if (title === 'Monster Elevator') {
    ss.value.push(ssMe1)
    ss.value.push(ssMe2)
    ss.value.push(ssMe3)
  } else if (title === 'Rock, Paper, Scissors, Boom!') {
    ss.value.push(ssRpsb1)
    ss.value.push(ssRpsb2)
    ss.value.push(ssRpsb3)
  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
  div.gameholder {
    width: 95%;
  }

  .card {
    display: grid !important;
    grid-template-columns: 1fr !important;

    /* grid-template-rows: 1fr 1fr; */
  }

  img.titleimage {
    margin: initial;
    padding: initial;
    max-width: 100%;
    padding-top: 10px;
    border-radius: 0;
  }

  div.ptitleholder h3 {
    font-size: 20px;
    padding-top: 0;
  }

  div.content {
    flex: none !important;
  }

  div.ptitleholder {
    padding: initial;
    padding-top: 0;
    flex: none !important;
  }

  div .mobiletitle {
    margin-top: 0;
  }

  div .arrowholder {
    grid-template-columns: 1fr 3fr 1fr;
  }

  .gameinfo {
    grid-column: 1;
  }

  div#infoholder {
    /* grid-template-columns: 1fr 2fr!important; */

    padding-bottom: 0px;
  }

  a.buybtnholder {
    grid-column: 1 / span 2 !important;
  }

  div.screenshots {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    margin-left: 0;
    margin-right: 0;
  }

  #gameinfo p {
    padding: 0;
    margin: 0;
  }

  div.overlaywrapper {
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 18fr 1fr;
    padding: 0;
    max-width: 100%;
  }

  img.overlayimage {
    margin-top: 0;
    grid-row: 2;
    grid-column: 2;
  }
}

.mobiletitle {
  margin: 10px 10px 15px;
}

#CaroWrapper {
  /* border: 2px solid black; */
  width: 100%;
  display: grid;
  gap: 0;

  grid-template-columns: 1;
  border-radius: 20px;
  background-color: #fefbde;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.103);
  padding-bottom: 10px;
}

.container {
  position: relative;
  width: 100%;
  /* Ensures the container spans the full width */
  max-width: 400px;
}

.ssoverlay {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.2);
  /* Black see-through */
  color: #f1f1f1;
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  opacity: 0;
  color: white;
  font-size: 20px;
  padding: 10px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
}

.ssoverlay img {
  aspect-ratio: 1 / 1;

  margin-top: initial;
  margin: 0 auto;
}

.card {
  display: flex;

  grid-column: 1 / span 2;
}

.content {
  /* padding:0px; */
  padding: initial;
  margin: 10px;
  flex: 1;
}

.ptitleholder {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.103);
  flex: 1;
  margin: 10px;
  /* margin:0 auto;
    padding:0px;
    height:100%; */
}

.ptitleholder h3 {
  padding: 10px;
  font-size: min(2vw, 30px);
}

.gameimage {
  margin-top: initial;
  /* margin:0; */
  aspect-ratio: 16/9;
  min-height: 100%;
  border-radius: 10px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.103);
}

img.titleimage {
  margin-top: 0;
}

.buybtnholder {
  margin: 20px;
  background-color: rgba(255, 255, 255, 0);
}

.arrowholder {
  grid-column: 1 / span 2;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  gap: 0;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px #cdade0;
}

.arrowholder:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.arrowholder.expand {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-bottom: 0;
}

.arrowholder p {
  padding-right: 0;
  padding-left: 0;
  font-size: 30px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.31);
}

.arrowl,
.arrowr {
  filter: drop-shadow(3px 3px 3px #00000063);
  aspect-ratio: 1/1;
  margin: auto;
  height: 50px;

  transition: rotate 0.2s;
}

.arrowr {
  rotate: 90deg;
}

.arrowl {
  rotate: -90deg;
}

.arrowl.expand,
.arrowr.expand {
  rotate: 0deg;
}

#infoholder {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 5px 5px #cdade0;
  margin: 0 10px 10px 10px;
  grid-column: 1 / span 2;
  max-height: 0px;
  transition: max-height 0.5s;
  display: grid;
  grid-template-rows: 3;
  padding: 5px;
  padding-bottom: 20px;
}

#infoholder.expand {
  max-height: 999px;
}

.buybtn {
  background-color: #d0f4de;
  font-size: 30px;
}

h3 {
  text-align: center;

  margin: 0 auto;
  padding: 0;

  font-size: 20px;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.31);
}

.gameholder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  height: fit-content;
  background-color: #e4c1f9;

  margin-top: 10px;
  border-radius: 20px;
  /* padding:20px; */
  box-shadow: 5px 5px rgba(0, 0, 0, 0.103);
}

.gameholder.expand {
}

#gameinfo {
  /* background-color: #e4c1f9; */
  margin: 0 auto;
  max-height: 0%;
  padding-top: 10px;
  width: 80%;
  transition: max-height 1s;
}

#gameinfo.expand {
  max-height: 100%;
}

.overlay {
  position: fixed;
  z-index: 201;
  top: 0;
  left: 0;
  margin: auto;
  width: 100vw;
  height: 100dvh;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);

  cursor: pointer;
}

.overlaywrapper {
  display: grid;
  gap: 0;
  margin: 0 auto;
  /* border:2px solid black ; */
  height: 100%;
  max-width: 50%;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-columns: 1fr;
  overflow: hidden;
}

.overlayimage {
  display: inline-grid;
  min-width: 100%;
  border-radius: 10px;
  /* border:8px solid rgba(255, 255, 255, 0.625); */
  background-color: #febc3a;
  padding: 10px;
  cursor: pointer;
}

.carousel {
  display: inline-grid;
  text-align: center;
  margin: 0 auto;
}

.carbtnholder {
  display: grid;
  /* border:2px solid black; */
  gap: 0;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  width: 100%;
  grid-column: 1 / span 3;
  padding: 10px;
}

/* .gameinfo {
    grid-column: 1 / span 3;
    display:grid;
    gap:0;
    grid-template-columns: 1fr 1fr 1fr;
} */

.screenshots {
  /* background-color: rgba(255, 255, 255, 0.571); */
  box-sizing: border-box;
  /* box-shadow: 5px 5px rgba(0, 0, 0, 0.103); */
  margin: 10px;
  margin-top: 0;
  display: inline-grid;
  /* grid-column: 2; */
  display: grid;
  gap: 0;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0px;
}

.ssimg {
  margin-top: initial;
  cursor: pointer;
  display: block;
  width: 100%;
  height: auto;
}

.ssoverlay:hover {
  opacity: 1;
}

.ssimg:hover {
  box-shadow: 0px 0px 10px black;
}

.gamedesc {
  display: inline-grid;
  grid-column: 1 / span 3;
}

.gamedesc p {
  font-size: min(4vw, 20px);
}

.gamedesc ul {
  font-size: min(3.5vw, 20px);
  padding: 0 10%;
}

button {
}

button.carouselbtn {
  /* border:2px dotted black; */

  width: 100%;
  height: 100%;

  text-align: center;
  font-size: 40px;
  font-weight: bold;
  border-radius: 20px;
}

button.carouselbtn.prev {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

button.carouselbtn.next {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.projecttitle {
  text-align: center;

  /* color:rgba(0, 0, 0, 0.9);
    width:100%;
    background-color: #e4c1f9;
    box-shadow: 5px 5px rgba(0, 0, 0, 0.103);
    margin-bottom: 20px;
   */
}

.flavor {
  /* border: 2px solid black; */
  background-color: rgba(255, 255, 255, 0.571);
  border-radius: 20px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.103);
  margin: 10px;
  margin-top: 0;
}

a {
  text-align: center;
}

p {
  margin-bottom: 0;
}

button {
  margin: 0 auto;
  height: 50px;
  width: 90%;
  text-wrap: nowrap;
  border-style: none;
  cursor: pointer;

  border-radius: 5px;
  font-family: 'Concert One', sans-serif;
  font-weight: bold;
  font-style: normal;
  font-size: 20px;
  color: black;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.082);
}

#Formwrapper .field.button {
  display: inline-grid;
  /* grid-column: 1 / span 2; */
  grid-template-columns: 1fr 1fr;
}
</style>
