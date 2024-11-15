<template>
  <div id="about" class="maincontent info">
    <div class="text">
      <h2>About Joelle</h2>

      <img class="mephoto" :src="myPhoto" />

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
          >creating games for the PlayDate</a
        >
        in her spare time.
      </p>
    </div>
  </div>
</template>

<script setup>
import myPhoto from '../assets/images/me_small.jpg'
</script>

<style></style>
