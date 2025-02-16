<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const partners = ref([
    '/img/logo/logo1.jpg',
    '/img/logo/logo2.jpg',
    '/img/logo/logo3.jpg',
    '/img/logo/logo5.jpg',
]);

const slider = ref(null);
let interval = null;

const startSlider = () => {
    interval = setInterval(() => {
        if (slider.value) {
            slider.value.scrollLeft += 1;
            if (slider.value.scrollLeft >= slider.value.scrollWidth / 3) {
                slider.value.scrollLeft = 0;
            }
        }
    }, 15);
};

onMounted(() => {
    startSlider();
});

onBeforeUnmount(() => {
    clearInterval(interval);
});
</script>

<template>
    <section>
        <h1>Наши партнеры</h1>
        <div class="slider-container" ref="slider">
            <div class="slider-track">
                <img v-for="(partner, index) in [...partners, ...partners, ...partners]" :key="index" :src="partner" alt="Partner Logo" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
$primary-color: #927AF4;

h1 {
    color: $primary-color;
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
}

.slider-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
}

.slider-track {
    display: flex;
    width: max-content;
    flex-wrap: nowrap;
    animation: scroll 60s linear infinite;
    margin-bottom: 50px;
}

img {
    height: 200px;
    margin: 0 20px;
}

@keyframes scroll {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-33.33%);
    }
}
</style>
