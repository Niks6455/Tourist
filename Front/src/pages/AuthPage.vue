<script setup>
import Layout from '../components/Layout.vue';
import Login from '../components/AuthComponents/Login.vue';
import Register from '../components/AuthComponents/Register.vue';
import { ref } from 'vue';

const stateReg = ref(false);
</script>

<template>
    <Layout>
        <div class="auth-container">
            <h2>{{ stateReg ? 'Регистрация' : 'Авторизация' }}</h2>
            <Login v-if="!stateReg" @toggle="stateReg = true" />
            <Register v-else @toggle="stateReg = false" />
        </div>
    </Layout>
</template>

<style lang="scss" scoped>
$primary-color: #927AF4;
$secondary-color: #78CFEB;
.sam{
    width: 400px;
    margin: 0px;
}
.auth-container {
    max-width: 400px;
    margin: 50px auto;
    margin-top: 150px;
    min-height: calc(100vh - 501px);
    padding: 20px;
    background: $primary-color;
    color: white;
    text-align: center;
    border-radius: 0; // Острые углы
   
}

.toggle-btn {
    margin-top: 15px;
    background: $secondary-color;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    border-radius: 0;
    font-weight: bold;
    box-shadow: 3px 3px 0 white;
}


</style>
