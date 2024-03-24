<template>
    <div class="container3">
    <Bar id="chart" v-if="loaded" :data="chartData" :options = "chartOptions"/>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  import {ref , onMounted } from "vue";
  export default {
    name: 'BarChart',
    components: { Bar },
    data: () => ({
      loaded: false,
      chartData: null
    }),
    async mounted () {
      this.loaded = false
  
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/uvpi-gqnh.json');
        const data = await response.json();
        const health = data.reduce((countObject, currentTree)=>{
          const species = currentTree.health;
          if (!species) return countObject;
          if(species in countObject){
            countObject[species] = countObject[species]+1;
          }else{
            countObject[species] = 1;
          }
          return countObject;
        }, {})
        const treeSpecies = Object.keys(health);
        const speciesCount = Object.values(health);
        const displayOne = {
        options: {
          plugins: {
            legend: {
              display: false
            }
          }
        },
    labels: treeSpecies,
    datasets: [
      {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#6af32b', '#083ea8','#edcd54'],
       data: speciesCount,
       label: "Tree Health",
      }
    ]
  }
   const options = {
    responsive: true,
    maintainAspectRatio: false
  }
        console.log(health, treeSpecies, speciesCount);
        this.chartData = displayOne;
        this.chartOptions = {
          plugins: {
            legend: {
              display: false
            }
          }
        }
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
  
  </script>
  <style scoped>
  .container3{
    height: 800px;
    width: 800px;
    
  }
  </style>