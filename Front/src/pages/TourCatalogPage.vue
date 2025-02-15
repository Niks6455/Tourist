
<script setup>
    import { ref, onMounted } from 'vue';
    import Header from '@/components/Header.vue';
    import { getAllTours } from '@/api/apiRequest';
    import CardTour from '@/components/TourComponents/CardTour.vue';
    import { useVareblesStore } from '@/store/varebles';
    const TourData = ref([]);
    const vareblesStore = useVareblesStore();


    onMounted(async () => {
        getAllTours().then((response) => {
            TourData.value = response.data;
        })
    })

    const closeBronded = () => {
        vareblesStore.setSelectedTour(null)
        vareblesStore.setPopUpState('')
    }

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
        <div v-else class="tourContainer">
            <div class="tours" v-for="tour in TourData" :key="tour.id">
                <CardTour :tour="tour"/>
            </div>
        </div>

        <div v-if="vareblesStore.popUpState === 'bronedTour'" class="popupBroned">
            <div class="popupBronedInner">
                <button class="close-btn" @click="closeBronded">✖</button>
                    
                <h1>Бронирование тура</h1>
                <h2>Выбранный тур: {{ TourData[vareblesStore.selectedTour - 1]?.title }} </h2>
            </div>
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
    .tourContainer{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        flex-direction: row;
        width: 100vw;
    }
    .popupBroned{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        .popupBronedInner{
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            position: relative;
            text-align: center;
        }
    }
    .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
}

</style>