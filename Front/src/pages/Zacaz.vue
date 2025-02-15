<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
    <main>
        <Header/>
        <h1>Заказы</h1>
    </main>
</template>

<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$text-color: #333;
main{
    padding-top: 100px;
    height: calc(100vh - 451px);
    h1{
        color:$primary-color;
        display: flex;
        justify-content: center;
        font-size: 32px;
    }
}
</style>