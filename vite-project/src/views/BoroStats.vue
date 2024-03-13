<template>
    <div class="container">
        <Pie id="manhattan" v-if="loaded" :data="chartData"/>
        <Pie id="queens" v-if="loaded" :data="chartData"/>
        <Pie id="bronx" v-if="loaded" :data="chartData"/>
        <Pie id="brooklyn" v-if="loaded" :data="chartData"/>
        <Pie id="staten" v-if="loaded" :data="chartData"/>

    </div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)
/* const Manhattan = data.filter((tree) => tree.boroname === "Manhattan");
const Queens = data.filter((tree) => tree.boroname === "Queens");
const Bronx = data.filter((tree) => tree.boroname === "Bronx");
const Brooklyn = data.filter((tree) => tree.boroname === "Brooklyn");
const StatenIsland = data.filter((tree) => tree.boroname === "Staten Island"); */
</script>

<style lang="scss" scoped>

</style>









































const Manhattan = data.filter((tree) => tree.boroname === "Manhattan");
const Queens = data.filter((tree) => tree.boroname === "Queens");
const Bronx = data.filter((tree) => tree.boroname === "Bronx");
const Brooklyn = data.filter((tree) => tree.boroname === "Brooklyn");
const StatenIsland = data.filter((tree) => tree.boroname === "Staten Island");