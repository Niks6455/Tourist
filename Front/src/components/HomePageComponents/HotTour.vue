<template>
  <section class="hot-tours">
    <div class="hot-tours__header">
      <h2>🔥 Горящие туры</h2>
      <p>Лови лучшие предложения от туроператоров!</p>
    </div>

    <div class="hot-tours__grid">
      <div v-for="tour in filteredTours" :key="tour.id" class="tour-card" @click="router.push(`/catalog`)">
        <div class="tour-card__image">
          <img :src="tour.image" :alt="tour.name" />
          <span v-if="tour.discount" class="tour-card__discount">-{{ tour.discount }}%</span>
        </div>
        <div class="tour-card__content">
          <h3 class="tour-card__title">{{ tour.name }}</h3>
          <p class="tour-card__location">📍 {{ tour.location }}</p>
          <p class="tour-card__date">📅 {{ tour.date }}, {{ tour.nights }} ночей</p>
          <p class="tour-card__price">
            <span v-if="tour.oldPrice" class="tour-card__old-price">{{ tour.oldPrice }} руб </span>
            <span class="tour-card__new-price">- {{ tour.price }} руб</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const selectedCity = ref("");
const selectedCountry = ref("");

const tours = ref([
  {
    id: 1,
    name: "PORT RIVER HOTEL & SPA",
    location: "Сиде, Турция",
    date: "27 фев",
    nights: 6,
    price: 63406,
    oldPrice: 68243,
    discount: 7,
    image: "/img/1img.jpeg",
  },
  {
    id: 2,
    name: "КУНАК ОТЕЛЬ",
    location: "Казань, Россия",
    date: "16 фев",
    nights: 6,
    price: 18365,
    oldPrice: 26909,
    discount: 32,
    image: "/img/2img.jpeg",

  },
  {
    id: 3,
    name: "STELLA MAKADI RESORT",
    location: "Хургада, Египет",
    date: "10 март",
    nights: 7,
    price: 47890,
    oldPrice: 52890,
    discount: 9,
    image: "/img/3img.jpeg",

  }
]);

const filteredTours = computed(() => {
  return tours.value.filter(
    (tour) =>
      (!selectedCity.value || tour.location.includes(selectedCity.value)) &&
      (!selectedCountry.value || tour.location.includes(selectedCountry.value))
  );
});
</script>

<style lang="scss" scoped>
$primary-color: #927AF4;
$accent-color: #78CFEB;
$error-color: #FF4D4D;
.hot-tours {
  background: linear-gradient(135deg, $primary-color, $accent-color);
  padding: 2.5rem;
  border-radius: 15px;
  color: white;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.hot-tours__header {
  margin-bottom: 1.5rem;

  h2 {
    font-size: 2.2rem;
    font-weight: bold;
  }
  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.hot-tours__grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}
.tour-card__title{
  color: $primary-color;
}
.tour-card {
  background: white;
  color: black;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 325px;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
}

.tour-card__image {
  position: relative;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
.tour-card__old-price{
  color: $error-color;
  text-decoration: line-through;
}

.tour-card__discount {
  position: absolute;
  top: 10px;
  right: 10px;
  background: $primary-color;
  color: white;
  padding: 8px 14px;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 5px;
  transform: rotate(10deg);
}
</style>
