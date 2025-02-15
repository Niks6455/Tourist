<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import {loginFunction} from '@/api/apiRequest'
import { useRouter } from "vue-router";
import { useAuthStore } from '@/store/auth'

const emit = defineEmits(['toggle']);
const router = useRouter();
const formData = ref({
    email: '',
    password: ''
});

const authStore = useAuthStore()

const errorData = ref({
    email: '',
    password: ''
});
const ErrorText = ref('');

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

const login = () => {
    if (validateForm()) {
        const data = {
            email: formData.value.email,
            password: formData.value.password
        }
        loginFunction(data).then((res) => {
            if(res?.status === 200){
                ErrorText.value = "";
                console.log('data', res.data);
                authStore.login( res.data.user ,res.data.token);
                router.push('/homePage');
            }else{
                ErrorText.value = "Не правильный логин или пароль";

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
        
                <button class="auth-btn" @click="login">Войти</button>
                <p v-if="ErrorText" class="error-text"> {{ ErrorText }}</p>
                <p class="switch-text">Еще нет аккаунта? <button @click="emit('toggle')" class="switch-btn">Зарегистрироваться</button></p>
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