<template>
  <div :style="{ backgroundColor: bgColor }" class="tag">
    {{ title }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    default: 'rgba(255,255,255,0.1)'
  }
});
</script>

<style scoped>
.tag {
  display: inline-block;
  padding: 4px 7px;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  margin: 0px 3px;
}
</style>