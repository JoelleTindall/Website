<template>
<div id="news" class="maincontent info">
    <div class="text">
      <h2>What's New?</h2>
    </div>
    <div id="story" class="text">

      <div class="titleholder"><p class="date">{{ date }}</p><h2>{{subject}}</h2></div>
      <div class="textholder">
        <p>Rock, Paper, Scissors, Boom!, my new playdate game, launches on catalogue 11/26!</p>
          <p> Pretty exciting stuff, right?</p><br><br>
       <p><a href="https://play.date/games/rock-paper-scissors-boom/">You can check it out here</a></p>
      </div>
      <div class="photoholder">
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
  grid-auto-flow:dense;
  grid-auto-columns: auto;
   /* grid-template-columns: 1fr 1fr; */
   /* overflow-inline: 1; */
   /* grid-template-rows: min-content; */
}

#story .titleholder {
  grid-column: 1 /span 2;
  grid-row:1;
  padding-top:0;
}
/*
#story .dateholder {
  grid-column: 1;

  text-align: left;
  padding:0 10px;
  margin:0;
} */
#story .titleholder .date {

  float: inline-start;
  font-style: italic;
  margin:0;
  padding:0 10px;

}

#story .textholder {
  grid-column: 1 ;
  text-align: left;
  padding: 20px;
  background-color: rgb(128, 250, 209);
  /* text-indent: 50px; */
  min-width: 200px;


}

#story .photoholder {
  margin:0 auto;
  padding:20px;
 /* max-width: 50%; */
grid-column: 2;

}

#story .photoholder img{
margin: unset;
 min-width: 350px;
 max-width: 200px;
 height:auto;
 /* min-width: 390px; */

}


</style>
