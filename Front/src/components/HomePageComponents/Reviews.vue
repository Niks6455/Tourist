<template>
  <div class="review">
    <h1>Отзывы клиентов: </h1>
    <div class="review-slider">
      <div
        class="review-slider__wrapper"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="review-slider__item"
        >
          <p class="review-slider__text">"{{ review.text }}"</p>
          <div class="review-slider__rating">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.rating }">★</span>
          </div>
          <div class="review-slider__author">
            <img :src="review.avatar" :alt="review.name" class="review-slider__avatar" />
            <div>
              <span class="review-slider__name">{{ review.name }}</span>
              <span class="review-slider__date">{{ review.date }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <button class="review-slider__btn review-slider__btn--prev" @click="prevSlide">
        ❮
      </button>
      <button class="review-slider__btn review-slider__btn--next" @click="nextSlide">
        ❯
      </button>
  
      <div class="review-slider__dots">
        <span
          v-for="(review, index) in reviews"
          :key="index"
          class="review-slider__dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const reviews = ref([
  {
    name: 'Анна Иванова',
    text: 'Отличный сервис! Все организовано на высшем уровне!',
    avatar: '/img/people.png',
    rating: 5,
    date: '10 февраля 2025'
  },
  {
    name: 'Максим Петров',
    text: 'Тур был просто замечательный, обязательно поеду еще раз!',
    avatar: '/img/people.png',
    rating: 4,
    date: '5 января 2025'
  },
  {
    name: 'Екатерина Смирнова',
    text: 'Все прошло идеально! Очень довольна организацией поездки.',
    avatar: '/img/people.png',
    rating: 5,
    date: '22 декабря 2024'
  }
]);

const currentIndex = ref(0);
let interval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? reviews.value.length - 1 : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  interval = setInterval(nextSlide, 5000);
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$transition-speed: 0.5s;

.review{
  margin: 100px 0px 25px 0px;
  h1{
    color: $primary-color;
  }
}
.review-slider {
  margin: 0px auto 100px auto;
  position: relative;
  width: 100%;
  max-width: 980px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 2rem;
}

.review-slider__wrapper {
  display: flex;
  transition: transform $transition-speed ease-in-out;
}

.review-slider__item {
  min-width: 100%;
  text-align: center;
}

.review-slider__text {
  font-size: 1.2rem;
  font-style: italic;
  color: #333;
}

.review-slider__rating {
  margin: 0.5rem 0;
}

.star {
  font-size: 1.2rem;
  color: lightgray;
}

.star.filled {
  color: gold;
}

.review-slider__author {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: $primary-color;
}

.review-slider__name {
  display: block;
  font-weight: bold;
}

.review-slider__date {
  display: block;
  font-size: 0.9rem;
  color: gray;
}

.review-slider__avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.review-slider__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 2rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background $transition-speed;
}

.review-slider__btn:hover {
  background: rgba(0, 0, 0, 0.3);
}

.review-slider__btn--prev {
  left: 10px;
}

.review-slider__btn--next {
  right: 10px;
}

.review-slider__dots {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.review-slider__dot {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background: gray;
  border-radius: 50%;
  cursor: pointer;
  transition: background $transition-speed;
}

.review-slider__dot.active {
  background: $primary-color;
}
</style>
