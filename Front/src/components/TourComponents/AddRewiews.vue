<script setup>
import { ref, defineProps } from 'vue';
import { SendReviewFunction } from '@/api/apiRequest';
import { useVareblesStore } from '@/store/varebles';

const vareblesStore = useVareblesStore();
const props = defineProps(['refreshReviews']);

const userName = ref('');
const rating = ref(5);
const reviewText = ref('');

const submitReview = async () => {
  if (!reviewText.value) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }

  try {
    const reviewData = {
      rating: rating.value,
      review: reviewText.value,
      tourId: vareblesStore.selectedTour,
    };

    console.log("Отправка отзыва:", reviewData);

    const res = await SendReviewFunction(reviewData);
    if (res?.status === 200) {
      console.log("Отзыв успешно отправлен:", res.data);
      alert("Отзыв успешно добавлен!");
      userName.value = '';
      rating.value = 5;
      reviewText.value = '';
      vareblesStore.setPopUpState(null)
    } 
  } catch (error) {
      
  }
};
</script>

<template>
  <section class="review-section">
    <div class="review-sectionInner">
        <div class="close"><p @click="vareblesStore.setPopUpState(null)">&times;</p></div>
        <h2>Оставить отзыв</h2>
        <div class="review-form">
         
    
          <div class="input-group">
            <label>Рейтинг:</label>
            <select v-model="rating">
              <option v-for="num in 5" :key="num" :value="num">{{ num }} ★</option>
            </select>
          </div>
    
          <div class="input-group">
            <label>Ваш отзыв:</label>
            <textarea v-model="reviewText" placeholder="Напишите ваш отзыв"></textarea>
          </div>
    
          <button class="submit-btn" @click="submitReview">Отправить</button>
        </div>
    </div>
   
  </section>
</template>

<style lang="scss" scoped>
$primary-color: #927AF4;
$secondary-color: #78CFEB;

.review-section {
    padding: 20px;
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    position: fixed;
    left: 0;
    justify-content: center;
    top: 0;
    width: 100vw;
    z-index: 1000;
    .review-sectionInner{
        width: 400px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        position: relative;
        text-align: center;
        min-height: 200px;
    }
    .close{
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
  h2 {
    color: $primary-color;
  }

  .review-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    .input-group {
      display: flex;
      flex-direction: column;
      text-align: left;
      label {
        font-size: 16px;
        margin-bottom: 5px;
      }
      input, select, textarea {
        padding: 10px;
        border: 1px solid $primary-color;
        border-radius: 8px;
        font-size: 16px;
        outline: none;
        transition: 0.3s;
        &:focus {
          border-color: $secondary-color;
          box-shadow: 0 0 8px rgba($secondary-color, 0.5);
        }
      }
      textarea {
        resize: none;
        height: 100px;
      }
    }
    .submit-btn {
      background-color: $primary-color;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }
  }
}
</style>
