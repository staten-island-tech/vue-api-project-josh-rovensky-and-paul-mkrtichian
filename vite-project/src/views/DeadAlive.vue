<template>
  <div class="container2">
  <Bar id="chart" v-if="loaded" :data="chartData" :options = "chartOptions"/>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'BarChart',
  components: { Bar },
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
    console.log()

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
      const treeSpecies = Object.keys(deadoralive);
      const speciesCount = Object.values(deadoralive);
      const displayOne = {
  labels: treeSpecies,
  datasets: [
    {
    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#6af32b', '#083ea8','#edcd54'],
     data: speciesCount
      
    }
  ]
}
      console.log(deadoralive, treeSpecies, speciesCount);
      this.chartData = displayOne;
      this.chartOptions = {
          plugins: {
            title: {
              display: true,
              text: "Tree Status",
              font: {
                size: 30,
              } 
            },
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
.container2{
  height: 800px;
  width: 800px;
  
}
</style>