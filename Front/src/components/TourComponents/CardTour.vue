<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import Reviews from '../HomePageComponents/Reviews.vue';
import { useVareblesStore } from '@/store/varebles';
defineProps({
  tour: Object, // Получаем объект тура из пропсов
});
const vareblesStore = useVareblesStore();
const isPopupOpen = ref(false);

const openPopup = () => {
  isPopupOpen.value = true;
};

const closePopup = () => {
  isPopupOpen.value = false;
};

const bronedTour = (id) => {
    vareblesStore.setSelectedTour(id)
    vareblesStore.setPopUpState("bronedTour")
    closePopup();
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
            <p>{{ tour.description }}</p>
            <p><strong>Стоимость:</strong> {{ tour.price }} ₽</p>
            <button @click="openPopup" class="details-btn">Подробнее</button>
            <button class="bronedSubmit" @click="bronedTour(tour.id)" >Забронировать</button>
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
                <button class="bronedSubmit" @click="bronedTour(tour.id)">Забронировать тур</button>
                <div class="popup-contentReviews">
                    <Reviews/>
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

    &:hover {
        transform: scale(1.03);
    }

    &__image img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    &__info {
        padding: 15px;

        h3 {
            color: #927AF4;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            color: #555;
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
