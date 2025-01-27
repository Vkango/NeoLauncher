<template>
<div class="carousel">
    <div class="carousel-inner" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
    <div v-for="(image, index) in images" :key="index" class="carousel-item">
        <img :src="image" alt="Carousel Image" id="carousel-img"/>
    </div>
    </div>
    <div class="carousel-control">
        <RippleButton class="carousel-control-prev" @click="prevSlide">
        <img class="carousel-control-prev-icon" src="../assets/chevronleft.svg"></img>
        </RippleButton>
        <RippleButton class="carousel-control-next" @click="nextSlide">
        <img class="carousel-control-next-icon" src="../assets/chevronright.svg"></img>
        </RippleButton>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const isMouseIn = ref(false);
const props = defineProps({
images: {
    type: Array,
    required: true
},
interval: {
    type: Number,
    default: 3000
}
});

const currentSlide = ref(0);
let timer = null;

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % props.images.length;
};

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + props.images.length) % props.images.length;
};

const startAutoSlide = () => {
    timer = setInterval(nextSlide, props.interval);
};

const stopAutoSlide = () => {
    clearInterval(timer);
};

onMounted(startAutoSlide);
onUnmounted(stopAutoSlide);
</script>

<style scoped>
.carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
}
#carousel-img {
    position: absolute;
    width: 100%;
    height: 250px;
    object-fit: cover;
}
.carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-item {
    flex: 0 0 100%;
    max-width: 100%;
}

.carousel-item img {
    width: 100%;
    display: block;
}
.carousel-control {
    display: flex;
    position: absolute;
    bottom: 10px;
}
.carousel-control-prev,
.carousel-control-next {
    width: 30px;
    height: 30px;
    bottom: 0px;
    left: 10px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1;
    box-shadow: none;
    scale: 0.8;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.1;
}



.carousel-control-prev-icon,
.carousel-control-next-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: no-repeat center center;
    background-size: 100% 100%;
}

</style>