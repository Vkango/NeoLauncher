<template>
    <div id="no-connection">
      <img class="icon" :src="getIconPath(icon)" width="70px">
      <div id="title">{{ title }}</div>
      <div id="content">{{ content }}</div>
      <RippleButton id="button" style="margin-top: 20px;" @click="onClick">{{ buttonTitle }}</RippleButton>
    </div>
</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['click']);

defineProps({
  icon: {
    type: String,
    required: false,
    default: 'offline.svg'
  },
  title: {
    type: String,
    required: false,
    default: '加载失败'
  },
  content: {
    type: String,
    required: false,
    default: '可能是网络问题'
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
#no-connection {
  position: absolute;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
#title {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
}
#content {
  width: 100%;
  text-align: center;
  margin-top: 5px;
  opacity: 0.5;
}
</style>