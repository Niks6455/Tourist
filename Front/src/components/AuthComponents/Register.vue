<!-- <script setup>
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
</style> -->

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import {registerFunction} from '@/api/apiRequest'
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

const ErrorText = ref('');
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
        const data = {
            fio: formData.value.fio,
            email: formData.value.email,
            password: formData.value.password
        }
        registerFunction(data).then((res) => {
            if(res?.status === 200){
                alert('Регистрация успешна, выполните вход')
                emit('toggle')
                ErrorText.value = ""
            }else{
                ErrorText.value = "Пользователь с таким email уже существует"
            }
        })
    }
};
</script>

<template>
    <div class="auth-box">
       
            <div class="authBoxImg">
                <img class="sam" src="/img/logoAuth.svg"/>
            </div>
            <div>
                <div class="title">
                    <h1>Вход</h1>
                    <p>Путевки легко и быстро</p>
                </div>
                <div>
                    <div class="label">
                        <label>ФИО</label>
                    </div>
                    <input 
                        type="name" 
                        placeholder="ФИО" 
                        class="auth-input" 
                        v-model="formData.fio" 
                        :class="{ 'input-error': errorData.fio }"
                    />
                    <div class="error-textCont">
                        <span class="error-text" v-if="errorData.fio">{{ errorData.fio }}</span>
                    </div>
                </div>
                <div>
                    <div class="label">
                        <label>Почта</label>
                    </div>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        class="auth-input" 
                        v-model="formData.email" 
                        :class="{ 'input-error': errorData.email }"
                    />
                    <div class="error-textCont">
                        <span class="error-text" v-if="errorData.email">{{ errorData.email }}</span>
                    </div>
                </div>
              
                <div>
                    <div class="label">
                        <label>Пароль</label>
                    </div>
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        class="auth-input" 
                        v-model="formData.password" 
                        :class="{ 'input-error': errorData.password }"
                    />
                    <div  class="error-textCont">
                        <span class="error-text" v-if="errorData.password">{{ errorData.password }}</span>
                    </div>
                </div>

                <div>
                    <div class="label">
                        <label>Повторите пароль</label>
                    </div>
                    <input 
                        type="password" 
                        placeholder="Повторите пароль" 
                        class="auth-input" 
                        v-model="formData.confirmPassword" 
                        :class="{ 'input-error': errorData.confirmPassword }"
                    />
                    <div class="error-textCont">
                        <span class="error-text" v-if="errorData.confirmPassword">{{ errorData.confirmPassword }}</span>
                    </div>
                </div>
               
        
                <button class="auth-btn" @click="register">Зарегистрироваться</button>
                <p v-if="ErrorText" class="error-text"> {{ ErrorText }}</p>
                <p class="switch-text">Уже есть аккаунт? <button @click="emit('toggle')" class="switch-btn">Войти</button></p>
            </div>
        
       
    </div>
</template>

<style lang="scss" scoped>
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$error-color: #FF4D4D;

.label{
    display: flex;
    justify-content: start;
}
.error-textCont{
    display: flex;
    justify-content: start;
    margin-bottom: 20px;
}
.error-text{
    color: $error-color;
    text-align: start;
    margin-bottom: 0px!important;
    justify-content: start;
}
.sam{
    width: 550px;
}
.auth-box{
    display: flex;
    justify-content: center;
}
.authBoxImg{
    margin-right: 50px;
}
.title{
    display: block;
    color: #000;
    text-align: start;
    p{
        font-size: 18px;
        margin-top: 0px;
        font-weight: 400;
    }
    h1{
        margin: 0;
    }
}
.switch-text{
    color: #000;
}
label{
    color: #000;
    text-align: start;
    margin-bottom: 5px;
}
input{
    margin-bottom: 10px;
    width: 400px;
    height: 41px;
    padding: 0px 10px;
    font-size: 18px;
    border: none;
    border: 1px solid $primary-color;
    border-radius: 8px;
    box-sizing: border-box;
}
.switch-btn{
    background: none;
    border: none;
    color: $primary-color;
    font-size: 18px;
    cursor: pointer;
    transition: 0.1s linear all;
    &:hover{
      text-decoration: underline;
    }
}
.auth-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #fff;
    border-radius: 8px;
    border: none;
    background: $primary-color;
    width: 400px;
    padding: 0px 10px;
    height: 41px;
    cursor: pointer;
    transition: 0.1s linear all;
    &:hover{
        transform: scale(1.02);
    }
}
</style>