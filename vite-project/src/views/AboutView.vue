<template>
  <div class="container2">
  <Bar id="chart" v-if="loaded" :data="chartData"/>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)
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
      const deadoralive = data.reduce((countObject, currentTree)=>{
        const species = currentTree.status;
        if(species in countObject){
          countObject[species] = countObject[species]+1;
        }else{
          countObject[species] = 1;
        }
        return countObject;
      }, {})
      const treeSpecies = Object.keys(treeCount);
      const speciesCount = Object.values(treeCount);
      const displayOne = {
  labels: treeSpecies,
  datasets: [
    {
    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#6af32b', '#083ea8','#edcd54'],
     data: speciesCount
      
    }
  ]
}
 const options = {
  responsive: true,
  maintainAspectRatio: false
}
      console.log(deadoralive, treeSpecies, speciesCount);
      this.chartData = displayOne;
      this.loaded = true
    } catch (e) {
    }
  }
}
</script>
<style scoped>
.container2{
  height: 1000px;
  width: 1000px;
}
</style>