<template>
    <section class="about">
      <div class="container">
        <h2 class="title">Почему выбирают нас?</h2>
        <p class="subtitle">
          Мы организуем незабываемые путешествия по всему миру с максимальным комфортом.
        </p>
        
        <div class="content">
          <div class="image">
            <img src="/img/about.jpg" alt="Путешествие" />
          </div>
          
          <div class="stats">
            <div class="stat-card" v-for="stat in stats" :key="stat.id">
              <h3 class="number">{{ stat.number }}</h3>
              <h4 class="label">{{ stat.label }}</h4>
              <p class="desc">{{ stat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const stats = ref([
    { id: 1, number: '10+', label: 'Лет опыта', desc: 'Делаем ваши путешествия комфортными и незабываемыми' },
    { id: 2, number: '500+', label: 'Довольных клиентов', desc: 'Нас рекомендуют друзьям и выбирают снова' },
    { id: 3, number: '50+', label: 'Популярных направлений', desc: 'Мы знаем, куда отправить вас за лучшими эмоциями' },
    { id: 4, number: '100%', label: 'Гарантия качества', desc: 'Проверенные маршруты и партнеры' },
  ]);
  </script>
  
  <style scoped lang="scss">
  $primary-color: #927AF4;
  $accent-color: #78CFEB;
  $text-color: #333;
  
  .about {
    background: #f9f9f9;
    padding: 4rem 2rem;
    text-align: center;
  
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  
    .title {
      font-size: 2.5rem;
      font-weight: bold;
      color: $text-color;
      margin-bottom: 0.5rem;
    }
  
    .subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 2rem;
    }
  
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
  
      .image {
        flex: 1;
        img {
          width: 100%;
          height: 700px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      }
  
      .stats {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
  
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: left;
  
          .number {
            font-size: 2.5rem;
            font-weight: bold;
            color: $primary-color;
          }
  
          .label {
            font-size: 1.2rem;
            font-weight: bold;
            color: $text-color;
          }
  
          .desc {
            font-size: 1rem;
            color: #666;
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
  
  // Адаптивность
  @media (max-width: 992px) {
    .content {
      flex-direction: column;
  
      .stats {
        grid-template-columns: 1fr;
      }
    }
  }
  </style>
  