<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['toggle']);

const formData = ref({
    email: '',
    password: ''
});

const errorData = ref({
    email: '',
    password: ''
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    errorData.value = { email: '', password: '' };
    let isValid = true;

 
    if (!formData.value.email.trim() || !validateEmail(formData.value.email)) {
        errorData.value.email = 'Введите корректный email';
        isValid = false;
    }
    if (formData.value.password.length < 6) {
        errorData.value.password = 'Пароль должен содержать минимум 6 символов';
        isValid = false;
    }

    return isValid;
};

const register = () => {
    if (validateForm()) {
        console.log('Регистрация успешна', formData.value);
    }
};
</script>

<template>
    <div class="auth-box">
        <img class="sam" src="/img/samol.jpeg"/>
        <label>Почта</label>
        <input 
            type="email" 
            placeholder="Email" 
            class="auth-input" 
            v-model="formData.email" 
            :class="{ 'input-error': errorData.email }"
        />
        <span class="error-text" v-if="errorData.email">{{ errorData.email }}</span>
        <label>Пароль</label>
        <input 
            type="password" 
            placeholder="Пароль" 
            class="auth-input" 
            v-model="formData.password" 
            :class="{ 'input-error': errorData.password }"
        />
        <span class="error-text" v-if="errorData.password">{{ errorData.password }}</span>

        <button class="auth-btn" @click="register">Войти</button>
        <p class="switch-text">Еще нет аккаунта? <button @click="emit('toggle')" class="switch-btn">Зарегистрироваться</button></p>
    </div>
</template>

<style lang="scss" scoped>
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$error-color: #FF4D4D;

.auth-box {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: white;
    padding: 25px;
    border: 2px solid $primary-color;
    border-radius: 0;
    justify-content: center;
}
label{
    color: #000;
    text-align: start;
}
.error-text{
    color: $error-color;
    text-align: start;
    margin-bottom: 0px!important;
}

.auth-input {
    padding: 10px;
    border: 2px solid $primary-color;
    border-radius: 0;
    outline: none;
    font-size: 16px;
    transition: border-color 0.3s;
}

.auth-input:focus {
    border-color: $secondary-color;
}

.input-error {
    border-color: $error-color !important;
}

.error-text {
    color: $error-color;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 10px;
}

.auth-btn {
    background: $primary-color;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 0;
    box-shadow: 3px 3px 0 $secondary-color;
}

.auth-btn:hover {
    background: darken($primary-color, 10%);
}

.switch-text {
    font-size: 14px;
    color: $primary-color;
    text-align: center;
}

.switch-btn {
    background: none;
    color: $primary-color;
    cursor: pointer;
    border: none;
    font-size: 14px;
    text-decoration: underline;
}
</style>