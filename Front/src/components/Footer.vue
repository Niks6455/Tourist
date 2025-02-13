<template>
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <RouterLink to="/" class="logo">Travel<span>Tour</span></RouterLink>
          <p class="footer__tagline">Твой надежный гид в мире путешествий! 🌍</p>
        </div>
  
        <nav class="footer__nav">
          <RouterLink to="/" class="footer__link">Главная</RouterLink>
          <RouterLink to="/catalog" class="footer__link">Туры</RouterLink>
          <RouterLink to="/about" class="footer__link">О нас</RouterLink>
          <RouterLink to="/contacts" class="footer__link">Контакты</RouterLink>
        </nav>
  
        <div class="footer__copyright">
          <p>&copy; {{ new Date().getFullYear() }} TravelTour. Все права защищены.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { RouterLink } from 'vue-router';
  </script>
  
  <style scoped lang="scss">
  $primary-color: #927AF4;
  $secondary-color: #78CFEB;
  
  .footer {
    background: linear-gradient(135deg, rgba($primary-color, 0.9), rgba($secondary-color, 0.9));
    backdrop-filter: blur(10px);
    color: white;
    padding: 3rem 1rem;
    text-align: center;
    margin-top: 2rem;
    border-top: 5px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
  
    .container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  
    .footer__top {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }
  
    .logo {
      font-size: 2rem;
      font-weight: bold;
      text-decoration: none;
      color:   $primary-color;
      transition: transform 0.3s;
  
      span {
        color: $secondary-color;
        opacity: 0.8;
      }
  
      &:hover {
        transform: scale(1.1);
      }
    }
  
    .footer__tagline {
      font-size: 1rem;
      opacity: 0.9;
    }
  
  
    .footer__nav {
      display: flex;
      gap: 2rem;
      margin-top: 0rem;
  
      .footer__link {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        transition: opacity 0.3s, transform 0.3s;
  
        &:hover {
          opacity: 0.7;
          transform: translateY(-3px);
        }
      }
    }
  
    .footer__copyright {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 0rem;
    }
  }
  </style>
  