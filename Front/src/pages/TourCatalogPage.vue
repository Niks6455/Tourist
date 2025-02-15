
<script setup>
    import { ref } from 'vue';
    import Header from '@/components/Header.vue';
    const TourData = ref([]);
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
}
</style>