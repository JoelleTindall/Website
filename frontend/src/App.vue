<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from './router'
import Bouncecat from './assets/images/bouncecat.gif'

const pageOpen = ref([false, false, false, false])
const page = ref(0)
const comic = ref(false)
const menu = ref(false)
const wink = ref(false)
const route = useRoute()
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

router.beforeEach(to => {
  if (to.path.includes('about')) {
    console.log('about')
    page.value = 1
    pageOpen.value[0] = true
  } else if (to.path.includes('projects')) {
    page.value = 2
    pageOpen.value[1] = true
  } else if (to.path.includes('contact')) {
    page.value = 3
    pageOpen.value[2] = true
  } else if (to.path.includes('guestbook')) {
    page.value = 4
    pageOpen.value[3] = true
  }
})

watch(windowWidth, () => {
  // Do something when window width changes....
  // sets mobile menu to false when screen wide enough, so body can be scrolled
  if (windowWidth.value > 768) {
    menu.value = false
  }
})
watch(windowHeight, () => {})

// Update windowWidth on resize
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
})

// returns the class for the contentwrapper div based on the URL
function whichPage() {
  return {
    about: route.path.includes('about'),
    projects: route.path.includes('projects'),
    contact: route.path.includes('contact'),
    guestbook: route.path.includes('guestbook'),
  }
}

// determines the class for the input button

function showPage() {
  // Reset all pages
  pageOpen.value.fill(false)
  // scroll back up to top
  window.scrollTo(0, 0)

  menu.value = false
}

function showMenu() {
  if (!menu.value) {
    menu.value = true
  } else {
    menu.value = false
  }
}

function comicSans() {
  if (!comic.value) {
    comic.value = true
  } else {
    comic.value = false
  }
}

function logoWink() {
  if (!wink.value) {
    wink.value = true
  } else {
    wink.value = false
  }
}

//disable scrolling when menu open
watch(menu, newValue => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'initial'
  }
})

//FIX ME!!!!!!!
// function initialize() {

// onMounted(() => {
//   console.log('blah')
//   initialize()
// })
</script>

<style>
@import './assets/main.css';
</style>

<template>
  <div class="topheader" :class="{ expand: menu }">
    <div class="rainleft">
      <div class="raina"></div>
      <div class="rainb"></div>

      <div class="rainc"></div>
      <div class="raind"></div>

      <div class="raine"></div>
      <div class="rainf"></div>
      <div class="raing"></div>
      <div class="rainh"></div>
      <div class="raini"></div>
    </div>

    <div class="title">
      <img
        v-show="!wink"
        class="logo"
        :class="{ expand: menu }"
        src="./assets/images/joelle.png"
        @click.prevent="logoWink"
      />
      <img
        v-show="wink"
        class="logo"
        :class="{ expand: menu }"
        src="./assets/images/joellewink.png"
        @click="logoWink"
      />
    </div>
    <div class="mobmenubtn">
      <img
        class="hamburger"
        v-show="!menu"
        src="./assets/images/hamburger.png"
        @click="showMenu"
      />
      <img
        class="hamburger"
        v-show="menu"
        src="./assets/images/hamburgerx.png"
        @click="showMenu"
      />
    </div>
    <div class="mobilemenu" :class="{ expand: menu }">
      <input
        id="about"
        class="am"
        @click="$router.push({ name: 'About' }, showPage())"
        :class="{ open: pageOpen[0], closed: !pageOpen[0] }"
        type="button"
        value="About"
      />
      <input
        id="projects"
        class="bm"
        @click="$router.push({ name: 'Projects' }, showPage())"
        :class="{ open: pageOpen[1], closed: !pageOpen[1] }"
        type="button"
        value="Projects"
      />
      <input
        id="contact"
        class="cm"
        @click="$router.push({ name: 'Contact' }, showPage())"
        :class="{ open: pageOpen[2], closed: !pageOpen[2] }"
        type="button"
        value="Contact"
      />
      <input
        id="guestbook"
        class="dm"
        @click="$router.push({ name: 'Guestbook' }, showPage())"
        :class="{ open: pageOpen[3], closed: !pageOpen[3] }"
        type="button"
        value="Guestbook"
      />
    </div>

    <div class="topbuttons buttonholder ma">
      <input
        id="aboutbtn"
        type="button"
        class="a"
        @click="$router.push({ name: 'About' }, showPage())"
        :class="{ open: pageOpen[0], closed: !pageOpen[0] }"
        value="About"
      />
    </div>
    <div class="topbuttons buttonholder mb">
      <input
        id="projectsbtn"
        type="button"
        class="b"
        @click="$router.push({ name: 'Projects' }, showPage())"
        :class="{ open: pageOpen[1], closed: !pageOpen[1] }"
        value="Projects"
      />
    </div>
    <div class="topbuttons buttonholder mc">
      <input
        id="contactbtn"
        type="button"
        class="c"
        @click="$router.push({ name: 'Contact' }, showPage())"
        :class="{ open: pageOpen[2], closed: !pageOpen[2] }"
        value="Contact"
      />
    </div>
    <div class="topbuttons buttonholder md">
      <input
        id="guestbookbtn"
        type="button"
        class="d"
        @click="$router.push({ name: 'Guestbook' }, showPage())"
        :class="{ open: pageOpen[3], closed: !pageOpen[3] }"
        value="Guestbook"
      />
    </div>

    <div class="rainright">
      <div class="raina"></div>
      <div class="rainb"></div>

      <div class="rainc"></div>
      <div class="raind"></div>

      <div class="raine"></div>
      <div class="rainf"></div>
      <div class="raing"></div>
      <div class="rainh"></div>
      <div class="raini"></div>
    </div>
  </div>
  <div class="wrapper" :class="{ comicsans: comic }">
    <div class="maindiv">
      <div id="contentwrapper" v-bind:class="whichPage()">
        <router-view></router-view>

        <div id="Footer">
          <img
            class="bouncecat"
            :class="{ flipped: comic }"
            :src="Bouncecat"
            @click="comicSans"
          />
          <p>You've reached the end!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#aboutbtn:hover,
#projectsbtn:hover,
#contactbtn:hover,
#guestbookbtn:hover {
  color: black;
  font-weight: bolder;
  box-shadow:
    0px -1px 10px 2px rgba(0, 0, 0, 0.104),
    0 5px rgba(0, 0, 0, 0.107);
}
</style>
