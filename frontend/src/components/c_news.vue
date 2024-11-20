<template>
<div id="news" class="maincontent info">
    <div class="text">
      <h2>What's New?</h2>
    </div>
    <div id="story" class="text">
      <p class="date">{{ date }}</p>
      <h2>{{subject}}</h2>
      <div class="newstext">
        <p> blah blah blah <br> and then blah!!! okay?</p>
      </div>
      <div class="newsphotos">
        <img src="../assets/images/games/rpsb/RPSB.png">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import moment from 'moment';
const date=ref('11/20/2024')
const subject=ref('RPSB Launches 11/26!')


</script>

<style>
#story{
  display:grid;
  grid-template-columns: 2fr 1.5fr;
}

#story h2 {
  grid-column: 1 /span 2;
  padding-top:0;
}

#story .date {
  grid-column: 1 /span 2;
  text-align: left;
  padding-bottom: 0;
  padding-top:0;
  margin:0;
}

#story .newstext {

  text-align: left;

}


</style>
