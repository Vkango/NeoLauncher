<template>
    <div id="tip-card">
      <div style="display: flex; gap: 10px; align-items: center; ">
      <img class="icon" :src="getIconPath(icon)" width="16px">
      <div id="title">{{ title }}</div>
    </div>
      <div id="content" v-if="content == ''">{{ content }}</div>
    </div>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['click']);

defineProps({
  icon: {
    type: String,
    required: false,
    default: 'info.svg'
  },
  title: {
    type: String,
    required: true,
    default: 'Info'
  },
  content: {
    type: String,
    required: false,
    default: ''
  },
  buttonTitle: {
    type: String,
    required: false,
    default: '重试'
  },
  bindEvent: {
    required: false,
  }
})
const getIconPath = (icon) => {
  return new URL(`../assets/${icon}`, import.meta.url).href;
};
const onClick =() => {
  emit('click');
}
</script>
<style scoped>
#tip-card {
  position: relative;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(49, 86, 252, 0.2);
  opacity: 0.8;
}
#title {
  font-size: 13px;
  font-weight: bold;
  display: inline-block;
}
#content {
  width: 100%;
  text-align: center;
  opacity: 0.5;
}
</style>