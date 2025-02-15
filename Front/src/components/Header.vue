<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<template>
    <header class="header">
      <div class="container">
        <RouterLink to="/" class="logo">Travel<span>Tour</span></RouterLink>
  
        <nav class="nav">
          <RouterLink to="/" class="nav-link">Главная</RouterLink>
          <RouterLink to="/catalog" class="nav-link">Туры</RouterLink>
          <RouterLink to="/zacaz" class="nav-link">Мои заказы</RouterLink>
        </nav>
        <div class="profilePicture">
            <img src="/img/people.png"/>
            <div class="profilePictureContainer">
              <!-- <p>{{ sessionStorage.getItem('user') }}</p> -->
              <botton>Выход</botton>
            </div>
        </div>
       
      </div>
  
    </header>
  </template>
  

  
  <style scoped lang="scss">
  $primary-color: #927AF4;
  $secondary-color: #78CFEB;
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
        cursor: pointer;
        transition: 0.1s linear all;
        &:hover{
            opacity: 0.8;
        }
        img{
            width: 50px;
            height: 50px;
        }
        .profilePictureContainer{
          position: absolute;
          top: 100%;
          background-color: #fff;
          border-radius: 8px;
          padding: 20px 25px;
          right: 25px;
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
  