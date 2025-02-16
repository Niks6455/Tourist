<script setup>
import { useAuthStore } from '@/store/auth';
import { useVareblesStore } from '@/store/varebles';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const vareblesStore = useVareblesStore();
const menuOpen = ref(false);
const router = useRouter();

const formatedFio = (fio) => {
  if (!fio) return '';
  const fioArr = fio.split(' ');
  return fioArr.length > 1 ? `${fioArr[0]} ${fioArr[1]}` : fio;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Закрываем попап при клике вне него
const handleClickOutside = (event) => {
  if (!event.target.closest('.profilePictureContainer') && !event.target.closest('.profilePictureIcon')) {
    menuOpen.value = false;
  }
};

// Выход из аккаунта
const handleLogout = () => {
  authStore.logout();
  menuOpen.value = false;
  router.push('/'); // Редирект на главную или страницу входа
};

// Добавляем и удаляем обработчик клика вне попапа
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <header class="header">
      <div class="container">
        <RouterLink to="/" class="logo">Travel<span>Tour</span></RouterLink>
  
        <nav class="nav" v-if="!authStore.checkManager">
          <RouterLink to="/homePage" class="nav-link">Главная</RouterLink>
          <RouterLink to="/catalog" class="nav-link">Туры</RouterLink>
          <RouterLink to="/zacaz" class="nav-link">Мои брони</RouterLink>
        </nav>

        <nav class="nav" v-else>
          <RouterLink to="/catalog" class="nav-link">Туры</RouterLink>
          <RouterLink to="/zacaz" class="nav-link">Заявки на бронирование</RouterLink>
          <RouterLink to="/users" class="nav-link">Пользователи</RouterLink>

        </nav>


        <div class="profilePicture">
          <!-- Иконка профиля -->
          <div class="profilePictureIcon" @click="toggleMenu">
            <img src="/img/people.png" />
          </div>
  
          <!-- Выпадающее меню -->
          <div v-if="menuOpen" class="profilePictureContainer">
            <p class="profilePictureContainer__title">Данные аккаунта:</p>
            <p>ФИО: {{ authStore?.user?.fio }}</p>
            <p>Роль: {{ vareblesStore.getRoleName(authStore?.user?.role) }}</p>
            <button @click="handleLogout">Выход</button>
          </div>
        </div>
       
      </div>
  
    </header>
  </template>
  

  
  <style scoped lang="scss">

  $primary-color: #927AF4;
  $secondary-color: #78CFEB;
  $darcIndigo: #4C3F91;
  $transition-speed: 0.3s;
  .header {
    background: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem 2rem;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    box-sizing: border-box;

    .profilePicture{
        .profilePictureIcon{
          cursor: pointer;
          transition: 0.1s linear all;
          &:hover{
              opacity: 0.8;
          }
          img{
              width: 50px;
              height: 50px;
          }
        }
        .profilePictureContainer{
          position: absolute;
          top: 100%;
          background-color: #fff;
          border-radius: 0px 0px 8px 8px;
          padding: 20px 25px;
          right: 25px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          .profilePictureContainer__title{
            margin-bottom: 10px;
          }
          p{
            margin: 5px 0px;
          }
          button{
            background-color: $primary-color;
            color: #fff;
            font-size: 16px;
            padding: 10px 10px;
            border-radius: 8px;
            border: none;
            margin-top: 10px;
            cursor: pointer;
            transition: 0.1s linear all;
            width: 100%;
            &:hover{
                transform: scale(1.02);
            }
          }
        }
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
        width: 100%;
      margin: 0 auto;
    }
  
    .logo {
      font-size: 1.8rem;
      font-weight: bold;
      color: $primary-color;
      text-decoration: none;
  
      span {
        color: $secondary-color;
      }
    }
  
    .nav {
      display: flex;
      gap: 2rem;
  
      .nav-link {
        text-decoration: none;
        color: #333;
        font-size: 1rem;
        font-weight: 500;
        transition: color $transition-speed;
  
        &:hover {
          color: $primary-color;
        }
      }
    }
  
    .menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      width: 30px;
      height: 30px;
      position: relative;
  
      span {
        width: 100%;
        height: 3px;
        background: $primary-color;
        display: block;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        transition: $transition-speed;
  
        &::before,
        &::after {
          content: "";
          width: 100%;
          height: 3px;
          background: $primary-color;
          position: absolute;
          left: 0;
          transition: $transition-speed;
        }
  
        &::before {
          top: -10px;
        }
  
        &::after {
          top: 10px;
        }
  
        &.open {
          background: transparent;
  
          &::before {
            top: 0;
            transform: rotate(45deg);
          }
  
          &::after {
            top: 0;
            transform: rotate(-45deg);
          }
        }
      }
    }
  
    .mobile-menu {
      display: none;
      flex-direction: column;
      background: white;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      padding: 1rem 0;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  
      .mobile-link {
        text-decoration: none;
        color: #333;
        padding: 1rem;
        display: block;
        text-align: center;
        font-size: 1.2rem;
        transition: background $transition-speed;
  
        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
  
  // Адаптивность
  @media (max-width: 768px) {
    .nav {
      display: none;
    }
  
    .menu-btn {
      display: block;
    }
  
    .mobile-menu {
      display: flex;
    }
  }
  </style>
  