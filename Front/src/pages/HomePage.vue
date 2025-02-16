<script setup>
import { onMounted, ref } from 'vue';
import Header from '@/components/Header.vue';
import { RouterLink } from 'vue-router';
import About from './../components/HomePageComponents/About.vue';
import HotTour from '../components/HomePageComponents/HotTour.vue';
import Reviews from '../components/HomePageComponents/Reviews.vue';
import { getAllReview } from '@/api/apiRequest';
import Partniers from '../components/HomePageComponents/Partniers.vue';
const reviews = ref([]);

onMounted(async () => {
  try {
    const response = await getAllReview();
    if (response.status === 200) {
      reviews.value = response.data; // исправлено
    }
  } catch (error) {
    console.error("Ошибка при загрузке отзывов:", error);
  }
});
</script>

<template>
  <div>
    <Header />
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <h1>Путешествуй с нами!</h1>
          <p>Лучшие туры по доступным ценам</p>
          <RouterLink to="/catalog" class="btn">Посмотреть туры</RouterLink>
        </div>
      </section>

      <About />
      <HotTour />
      <Reviews :reviews="reviews" />
      <Partniers/>
    </div>
  </div>
</template>

  
  
  <style scoped lang="scss">
  $primary-color: #927AF4;
  $secondary-color: #78CFEB;
  $text-color: #333;
  .home {
    text-align: center;
  
    .hero {
      background: url('img/bgHomePage.jpg') center/cover no-repeat;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
  
      .hero-content {
        max-width: 80%;
  
        h1 {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
  
        p {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
      }
  
      .btn {
        display: inline-block;
        padding: 15px 30px;
        font-size: 1.2rem;
        font-weight: bold;
        text-transform: uppercase;
        color: white;
        background: linear-gradient(90deg, $primary-color, $secondary-color);
        border: none;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
  
        &:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.3);
        }
      }
    }
    
  
    .price {
      font-weight: bold;
      color: $primary-color;
      display: block;
      margin-top: 0.5rem;
    }
  }
  </style>
  