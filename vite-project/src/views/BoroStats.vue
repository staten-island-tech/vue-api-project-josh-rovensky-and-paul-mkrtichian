<template>
    <div class="container">
        <Pie id="manhattan" v-if="Maloaded" :data="MaData"/>
        <Pie id="queens" v-if="Quloaded" :data="QuData"/>
        <Pie id="bronx" v-if="Bxloaded" :data="BxData"/>
        <Pie id="brooklyn" v-if="Brloaded" :data="BrData"/>
        <Pie id="staten" v-if="Siloaded" :data="SiData"/>

    </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)
/* const Manhattan = data.filter((tree) => tree.boroname === "Manhattan");
const Queens = data.filter((tree) => tree.boroname === "Queens");
const Bronx = data.filter((tree) => tree.boroname === "Bronx");
const Brooklyn = data.filter((tree) => tree.boroname === "Brooklyn");
const StatenIsland = data.filter((tree) => tree.boroname === "Staten Island"); */
export default {
    
  name: 'PieChart',
  components: { Pie },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false

    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/uvpi-gqnh.json');
      const data = await response.json();
      const Manhattan = data.filter((tree) => tree.boroname === "Manhattan")
      console.log(Manhattan);
      const treeCount = Manhattan.reduce((countObject, currentTree)=>{
        const species = currentTree.spc_common;
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
      console.log(treeCount, treeSpecies, speciesCount);
      this.MaData = displayOne;
      this.Maloaded = true
    } catch (e) {
      console.error(e)
    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>
