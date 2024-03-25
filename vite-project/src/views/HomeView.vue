<template>
  <div class="container">
  <Pie id="chart" v-if="loaded" :data="chartData" :options = "chartOptions"/>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)
export default {
  name: 'PieChart',
  components: { Pie },
  data: () => ({
    loaded: false,
    chartData: null,
    chartOptions: {
  responsive: true,
  maintainAspectRatio: false,
}
  }),
  async mounted () {
    this.loaded = false

    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/uvpi-gqnh.json');
      const data = await response.json();
      const treeCount = data.reduce((countObject, currentTree)=>{
        const species = currentTree.spc_common;
        if (!species) return countObject;
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
      console.log(treeCount, treeSpecies, speciesCount);
      this.chartData = displayOne;
      this.chartOptions = {
          plugins: {
            title: {
              display: true,
              text: "Trees in New York City",
              font: {
                size: 30,
              },
            },
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
.container{
  height: 800px;
  width: 800px;
}
</style>