<script setup>
defineProps({
  tour: Object, // Определяем, что компонент принимает объект tour
});
</script>

<template>
    <section class="tour-card">
        <div class="tour-card__image">
            <img :src="tour.image" alt="Tour Image" />
        </div>
        <div class="tour-card__info">
            <h3>{{ tour.title }}</h3>
            <p>{{ tour.description }}</p>
            <RouterLink :to="`/tour/${tour.id}`" class="details-btn">Подробнее</RouterLink>
        </div>
    </section>
</template>

<style scoped lang="scss">
.tour-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
   
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.03);
    }

    &__image img {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    &__info {
        padding: 15px;

        h3 {
            color: #927AF4;
            margin-bottom: 10px;
        }

        p {
            font-size: 14px;
            color: #555;
        }

        .details-btn {
            display: inline-block;
            margin-top: 10px;
            padding: 8px 15px;
            background-color: #78CFEB;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.2s ease-in-out;

            &:hover {
                background-color: darken(#78CFEB, 10%);
            }
        }
    }
}
</style>
