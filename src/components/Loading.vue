<template>
    <div class="wrap" :style="{ width: size + 'px', height: size + 'px'}">
      <div class="circle-layout" :style="{ width: size + 'px', height: size + 'px', animationDuration: speed + 's' }">
        <div class="layout-left">
          <div class="circle-left" :style="circleStyle"></div>
        </div>
        <div class="layout-right">
          <div class="circle-right" :style="circleStyle"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    color: {
      type: String,
      default: '#F88E8B'
    },
    size: {
      type: Number,
      default: 110
    },
    speed: {
      type: Number,
      default: 2.5
    }
  });
  
  const circleStyle = computed(() => ({

    animationDuration: props.speed + 's'
  }));
  </script>
  
  <style scoped>
  .wrap {
    animation: animation-wrap 2.5s linear infinite;
  }
  
  .circle-layout {
    animation: animation-circle 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  
  .layout-left {
    float: left;
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .layout-right {
    float: right;
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .circle-left {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border: 5px solid #fff;

    border-radius: 50%;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
    transform: rotate(40deg);
    animation: animation-circle-left 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  
  .circle-right {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border: 5px solid #fff;
    border-radius: 50%;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
    transform: rotate(-310deg);
    animation: animation-circle-right 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  
  @keyframes animation-circle-left {
    0% {
      transform: rotate(40deg);
    }
    50% {
      transform: rotate(-100deg);
    }
    100% {
      transform: rotate(40deg);
    }
  }
  
  @keyframes animation-circle-right {
    0% {
      transform: rotate(-310deg);
    }
    50% {
      transform: rotate(-170deg);
    }
    100% {
      transform: rotate(-310deg);
    }
  }
  
  @keyframes animation-circle {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(360deg);
    }
    75% {
      transform: rotate(540deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
  
  @keyframes animation-wrap {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>