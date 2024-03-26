<template>
    <div class="container">
        <h1>Trees in Manhattan</h1>
        <Pie id="manhattan" v-if="loaded && Maloaded" :data="MaChartData"/>
        <h1>Trees in Queens</h1>
        <Pie id="queens" v-if="loaded && Quloaded" :data="QuChartData"/>
        <h1>Trees in The Bronx</h1>
        <Pie id="bronx" v-if="loaded && Bxloaded" :data="BxChartData"/>
        <h1>Trees in Brooklyn</h1>
        <Pie id="brooklyn" v-if="loaded && Brloaded" :data="BrChartData"/>
        <h1>Trees in Staten Island</h1>
        <Pie id="staten" v-if="loaded && Siloaded" :data="SiChartData"/>
    </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
function boroData(boro, data) {
  const results = data.filter((tree) => tree.boroname === boro)
      console.log(results);
      const treeCount = results.reduce((countObject, currentTree)=>{
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
return displayOne;
}

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
      const displayOne = boroData("Manhattan", data);
      const displayTwo = boroData("Queens", data);
      const displayThree = boroData("Bronx", data);
      const displayFour = boroData("Brooklyn", data);
      const displayFive = boroData("Staten Island", data);
      // console.log(treeCount, treeSpecies, speciesCount);
      this.MaChartData = displayOne;
      this.QuChartData = displayTwo;
      this.BxChartData = displayThree;
      this.BrChartData = displayFour;
      this.SiChartData = displayFive;
      this.loaded = true;
      this.Maloaded = true;
      this.Quloaded = true;
      this.Bxloaded = true;
      this.Brloaded = true;
      this.Siloaded = true;
      console.log(this.Maloaded);
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
h1{
  text-align: center;
  color: rgb(107, 105, 105);
  font-weight: bold;
}
</style>