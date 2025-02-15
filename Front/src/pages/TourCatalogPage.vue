
<script setup>
    import { ref, onMounted } from 'vue';
    import Header from '@/components/Header.vue';
    import { getAllTours } from '@/api/apiRequest';
    import CardTour from '@/components/TourComponents/CardTour.vue';
    const TourData = ref([]);


    onMounted(async () => {
        getAllTours().then((response) => {
            TourData.value = response.data;
        })
    })
</script>


<template>
    <main>
        <Header/>
        <section>
            <h1>Каталог туров</h1>
        </section>
        <div v-if="TourData.length === 0" class="notData">
            <p>Туры отсутствуют!</p>
        </div>
        <div v-else class="tours" v-for="tour in TourData" :key="tour.id">
            <CardTour :tour="tour"/>
        </div>
    </main>
</template>


<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;
main{
    padding-top: 100px;
    min-height: calc(100vh - 451px);
    h1{
        color:$primary-color;
        display: flex;
        justify-content: center;
        font-size: 32px;
    }
    .notData{
        display: flex;
        justify-content: center;
    }
    .tours{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        flex-direction: row;
        width: 100vw;
    }
}

</style>