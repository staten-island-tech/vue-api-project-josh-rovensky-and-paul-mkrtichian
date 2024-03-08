<template>
  <div>

  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {ref , onMounted } from "vue";
const deaths = ref("");
async function getdeaths(){
  let res = await fetch("https://data.cityofnewyork.us/resource/jb7j-dtam.json")
  let data = await res.json();
  deaths.value = data.results;
}

onMounted(() => {
  getdeaths();
})
</script>

<style scoped>

</style>
