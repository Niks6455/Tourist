<script setup>
import { onMounted, ref, watch } from 'vue';
import Reviews from '../HomePageComponents/Reviews.vue';
import { useVareblesStore } from '@/store/varebles';
import { useAuthStore } from '@/store/auth';
import { DeleteTourFunction, getOneReview } from '@/api/apiRequest';

defineProps({
  tour: Object, // Получаем объект тура из пропсов
  refreshTours: Function
});

const vareblesStore = useVareblesStore();
const authStore = useAuthStore();
const isPopupOpen = ref(false);
const reviews = ref([]); // Храним отзывы

const openPopup = async (id) => {
  isPopupOpen.value = true;
  fetchReviews(id); // Загружаем отзывы
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const fetchReviews = async (id) => {
    const indTour = id && id 
    getOneReview(indTour).then((res) => {
        if(res.status === 200) {
            reviews.value = res.data;
        }
    })
};

const bronedTour = (id) => {
  vareblesStore.setSelectedTour(id);
  vareblesStore.setPopUpState("bronedTour");
  closePopup();
};

const deleteTour = async (id) => {
  const res = await DeleteTourFunction(id);
  if (res?.status === 200) {
    refreshTours();
    alert("Тур успешно удален!");
  }
};

const clickEditTour = (id) => {
  vareblesStore.setSelectedTour(id);
  vareblesStore.setPopUpState('editTour');
};

watch(isPopupOpen, (newValue) => {
  if (newValue) fetchReviews(); // Загружаем отзывы при открытии
});

// 22 февраля
const getDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
  });
}
const getnameNight = (nights) => {
  if (nights === 1) {
    return 'Ночь'
  } else if (nights > 1 && nights < 5) {
    return 'Ночи'
  } else {
    return 'Ночей'
  }
}
</script>

<template>
    <section>
        <section class="tour-card">
            <div class="tour-card__image">
                <img :src="tour.image ? `data:image/png;base64,${tour.image}` : '/img/noPhoto.png'" alt="Tour Image" />
            </div>
            <div class="tour-card__info">
                <h3>{{ tour.title }}</h3>
                <p class="tour-card__location">📍 {{ tour.location }}</p>
                <p class="tour-card__date">📅 {{ getDate(tour.dateStart)}}, {{ tour.nights }} {{getnameNight(tour.nights)}}</p>
                <p><strong>Стоимость:</strong> {{ tour.price }} ₽</p>
                <button @click="openPopup(tour.id)" class="details-btn">Подробнее</button>
                <button v-if="authStore.checkManager" @click="clickEditTour(tour.id)" class="details-btn">Редактировать</button>
                <button v-if="!authStore.checkManager" class="bronedSubmit" @click="bronedTour(tour.id)">Забронировать</button>
                <button v-if="authStore.checkManager" class="deletButton" @click="deleteTour(tour.id)">&times;</button>
            </div>
        </section>

        <!-- PopUp окно -->
        <div v-if="isPopupOpen" class="popup-overlay" @click.self="closePopup">
            <div class="popup-content">
                <button class="close-btn" @click="closePopup">✖</button>
                <div class="popup-contentImg">
                    <img :src="tour.image ? `data:image/png;base64,${tour.image}` : '/img/noPhoto.png'" alt="Tour Image" />
                </div>
                <div class="popup-contentText">
                    <h2>{{ tour.title }}</h2>
                    <p><strong>Страна:</strong> {{ tour.location }}</p>
                    <p><strong>Описание:</strong> {{ tour.fullDescription || tour.description }}</p>
                    <p><strong>Цена:</strong> {{ tour.price }} ₽</p>
                    <p><strong>Дата начала тура:</strong> {{ new Date(tour.dateStart).toLocaleDateString() }}</p>
                    <p><strong>Дата окончания тура:</strong> {{ new Date(tour.dateEnd).toLocaleDateString() }}</p>
                    <p><strong>Количество ночей:</strong> {{ tour.nights }}</p>
                    <p><strong>Трансфер:</strong> {{ tour.transfer ? "Включен" : "Отсутствует" }}</p>
                    <button class="bronedSubmit" @click="bronedTour(tour.id)" v-if="!authStore.checkManager">Забронировать тур</button>
                    
                    <div class="popup-contentReviews">
                        <Reviews :reviews="reviews" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;
$darcIndigo: #4C3F91;
.tour-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    position: relative;
    &:hover {
        transform: scale(1.03);
    }

    &__image img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    &__info {
        padding: 0px 15px 15px 15px;

        h3 {
            color: #927AF4;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            color: #555;
            margin: 8px 0px;
        }

        .details-btn {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 15px;
            background-color: $primary-color;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.2s ease-in-out;
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            font-size: 16px;
            
            &:hover {
                background-color: darken($primary-color, 10%);
            }
        }
    }
}

.deletButton{
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    background-color: #927AF441;
    border: 1px solid $primary-color;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $primary-color;
    transition: background 0.2s ease-in-out;
    &:hover{
        background-color: $primary-color;
        color: white;
    }

}
/* Стили для PopUp */
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    position: relative;
    text-align: center;
    display: flex;
    // width: 90%;
    img{
        max-height: 500px;
        margin-right: 25px;
    }
    .popup-contentText{
        width: 900px;
        padding-left: 25px;
        border-left:  1px solid #927AF4;
        p{
            text-align: start;
            
        }
    }
}
.popup-contentReviews{
    width: 92%;
 height: 275px;
 position: relative;
 top: -50px;
}
.bronedSubmit{
    display: inline-block;
    margin-top: 10px;
    padding: 8px 15px;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    &:hover {
        background-color: darken($primary-color, 10%);
    }
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
</style>
