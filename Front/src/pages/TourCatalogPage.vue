<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import { getAllTours } from '@/api/apiRequest';
import CardTour from '@/components/TourComponents/CardTour.vue';
import { useVareblesStore } from '@/store/varebles';
import { createBookings } from '@/api/apiRequest';
const TourData = ref([]);
const vareblesStore = useVareblesStore();

const peopleCount = ref(1);
const comments = ref('');
const transferRequired = ref(false);

onMounted(async () => {
    getAllTours().then((response) => {
        TourData.value = response.data;
    });
});

const closeBronded = () => {
    vareblesStore.setSelectedTour(null);
    vareblesStore.setPopUpState('');
    peopleCount.value = '';
    comments.value = '';
    transferRequired.value = false;
};

const bookTour = () => {
    if(!peopleCount.value || !comments.value || !vareblesStore.selectedTour){
        alert("Заполните все поля!");
        return
    }
    const data = {
        tourId: vareblesStore.selectedTour,
        countPeople: peopleCount.value,
        comment: comments.value,
        transferRequired: transferRequired.value
    }
    createBookings(data).then((res) => {
        if(res?.status === 201){
            console.log("res", res);
            alert("Тур успешно забронирован!");
            closeBronded();
        }else{
            alert(" Произошла ошибка при бронировании!");
        }
    });
  
}; 
</script>

<template>
    <main>
        <Header />
        <section>
            <h1>Каталог туров</h1>
        </section>
        <div v-if="TourData.length === 0" class="notData">
            <p>Туры отсутствуют!</p>
        </div>
        <div v-else class="tourContainer">
            <div class="tours" v-for="tour in TourData" :key="tour.id">
                <CardTour :tour="tour" />
            </div>
        </div>

        <div v-if="vareblesStore.popUpState === 'bronedTour'" class="popupBroned">
            <div class="popupBronedInner">
                <button class="close-btn" @click="closeBronded">✖</button>
                <h1>Бронирование тура</h1>
                <h3>Выбранный тур: {{ TourData[vareblesStore.selectedTour - 1]?.title }}</h3>

                <div>
                    <div class="label">
                        <label>Кол-во человек:</label>
                    </div>
                    <div class="inputCont">
                        <input v-model="peopleCount" type="number" placeholder="Кол-во человек" />
                    </div>
                </div>

                <div>
                    <div class="label">
                        <label>Комментарии:</label>
                    </div>
                    <div class="inputCont">
                        <textarea v-model="comments" placeholder="Дополнительные пожелания"></textarea>
                    </div>
                </div>

                <div>
                    <div class="label">
                        <label>Трансфер до аэропорта:</label>
                    </div>
                    <div class="radio-group">
                        <label>
                            <input type="radio" v-model="transferRequired" :value="true" />
                            Да
                        </label>
                        <label>
                            <input type="radio" v-model="transferRequired" :value="false" />
                            Нет
                        </label>
                    </div>
                </div>
                <div class="info">
                    <p><strong>Итоговая Стоимость:</strong> {{ TourData[vareblesStore.selectedTour - 1]?.price * (peopleCount || 1) }}</p>
                    <p><strong>Дата отправления:</strong> {{ new Date(TourData[vareblesStore.selectedTour - 1]?.dateStart).toLocaleDateString() }} </p>
                    <p><strong>Дата прибытия:</strong> {{ new Date(TourData[vareblesStore.selectedTour - 1]?.dateEnd).toLocaleDateString() }} </p>
                </div>

                <div>
                    <button class="auth-btn" @click="bookTour">Забронировать</button>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
$primary-color: #927AF4;
$secondary-color: #78CFEB;

main {
    padding-top: 100px;
    min-height: calc(100vh - 451px);

    h1 {
        color: $primary-color;
        display: flex;
        justify-content: center;
        font-size: 32px;
    }
  

    .notData {
        display: flex;
        justify-content: center;
    }

    .tourContainer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        width: 100vw;
    }

    .popupBroned {
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
        .info{
            p{
                text-align: start;
                margin: 5px 0px;
            }
            margin-bottom: 15px;
        }
        .popupBronedInner {
            width: 500px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            position: relative;
            text-align: center;
            padding-top: 60px;
        }

        h1 {
            position: absolute;
            left: 15px;
            top: -15px;
        }
        h3{
            text-align: start;
        }

        .label {
            color: #000;
            text-align: start;
            margin-bottom: 5px;
        }

        .inputCont {
            display: flex;
            justify-content: start;

            input,
            textarea {
                margin-bottom: 10px;
                width: 100%;
                padding: 10px;
                font-size: 18px;
                border: 1px solid $primary-color;
                border-radius: 8px;
                box-sizing: border-box;
            }

            textarea {
                height: 80px;
                resize: none;
            }
        }

        .radio-group {
            display: flex;
            gap: 20px;
            justify-content: start;
            align-items: center;
            margin-bottom: 15px;
        
            label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 18px;
                cursor: pointer;
                color: #333;
                font-weight: 500;
                transition: color 0.2s ease-in-out;
        
                &:hover {
                    color: #927AF4;
                }
            }
        
            input {
                appearance: none;
                width: 20px;
                height: 20px;
                border: 2px solid #927AF4;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
                position: relative;
        
                &:checked {
                    background-color: #927AF4;
                    border-color: #927AF4;
                }
        
                &:checked::before {
                    content: '';
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: white;
                    border-radius: 50%;
                }
            }
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

    .auth-btn {
        background-color: $primary-color;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        width: 100%;
        transition: background 0.2s ease-in-out;

        &:hover {
            background-color: darken($primary-color, 10%);
        }
    }
}
</style>
