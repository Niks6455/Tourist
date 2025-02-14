<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['toggle']);

const formData = ref({
    fio: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const errorData = ref({
    fio: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    errorData.value = { fio: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.value.fio.trim()) {
        errorData.value.fio = 'Введите ФИО';
        isValid = false;
    }
    if (!formData.value.email.trim() || !validateEmail(formData.value.email)) {
        errorData.value.email = 'Введите корректный email';
        isValid = false;
    }
    if (formData.value.password.length < 6) {
        errorData.value.password = 'Пароль должен содержать минимум 6 символов';
        isValid = false;
    }
    if (formData.value.password !== formData.value.confirmPassword) {
        errorData.value.confirmPassword = 'Пароли не совпадают';
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
        
        <label>ФИО</label>
        <input 
            type="text" 
            placeholder="ФИО" 
            class="auth-input" 
            v-model="formData.fio" 
            :class="{ 'input-error': errorData.fio }"
        />
        <span class="error-text" v-if="errorData.fio">{{ errorData.fio }}</span>
        
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
        
        <label>Повторите пароль</label>
        <input 
            type="password" 
            placeholder="Повторите пароль" 
            class="auth-input" 
            v-model="formData.confirmPassword" 
            :class="{ 'input-error': errorData.confirmPassword }"
        />
        <span class="error-text" v-if="errorData.confirmPassword">{{ errorData.confirmPassword }}</span>

        <button class="auth-btn" @click="register">Зарегистрироваться</button>
        <p class="switch-text">Уже есть аккаунт? <button @click="emit('toggle')" class="switch-btn">Войти</button></p>
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

label {
    color: #000;
    text-align: start;
}

.error-text {
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
