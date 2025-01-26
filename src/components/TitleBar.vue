<template>
    <div
      class="title-bar"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
      @dblclick="maximizeWindow"
    >
      <div class="title">{{ title }}</div>
      <div class="controls" @mouseup.stop @mouseleave.stop @mousedown.stop>
        <RippleButton class="control-button" @click="minimizeWindow"><img src="../assets/notice.svg" style="width: 80%;"><div id="msgCount">1</div></RippleButton>
        <RippleButton class="control-button" @click="minimizeWindow">
          <img src="../assets/minimize.svg">
        </RippleButton>
        <RippleButton v-if="!isMaximized" class="control-button" @click="maximizeWindow">
          <img src="../assets/restore.svg">
        </RippleButton>
        <RippleButton v-if="isMaximized" class="control-button" @click="maximizeWindow">
          <img src="../assets/maximize.svg">
        </RippleButton>
        <RippleButton class="control-button" @click="closeWindow"><img src="../assets/close1.svg"></RippleButton>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentWindow } from '@tauri-apps/api/window';
const isMaximized = ref(false);
onMounted(async () => {
  isMaximized.value = getCurrentWindow().isMaximized();
  await getCurrentWindow().onResized(handleResize);
})
const handleResize = async () => {
  const window = getCurrentWindow();
  isMaximized.value = !await window.isMaximized();
};
const props = defineProps({
  title: {
    type: String,
    default: 'Tauri App'
  }
});
const startDragging = (event) => {
  const window = getCurrentWindow();
  window.startDragging();
};
const stopDragging = () => {};
  
const minimizeWindow = async () => {
  const window = getCurrentWindow();
  await window.minimize();};
const maximizeWindow = async () => {
  const window = getCurrentWindow();
  isMaximized.value = await window.isMaximized();
  if (isMaximized.value) {
    await window.unmaximize();
  } else {
    await window.maximize();
  }
};

const closeWindow = async () => {
  const window = getCurrentWindow();
  await window.close();
};
  
  </script>

  
  <style scoped>
  #msgCount {
    position: absolute;
    right: 6px;
    bottom: 3px;
    padding: 0 3px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    min-width: 10px;
    height: 16px;
    border-radius: 10px;

  }
  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    color: white;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
  }
  
  .title {
    font-size: 12px;
    font-weight: normal;
    left: 15px;
    position: absolute;
    color: rgba(255, 255, 255, 0.5);
  }
  
  .controls {
    display: flex;
    position: absolute;
    right: 0px;
  }
  .control-button img{
    width: 60%;
    padding-top: 3px;
  }
  .control-button {
    padding: 0 15px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
    cursor: pointer;
    height: 30px;
    box-shadow: none;
    display: flex;

    align-items: center;
    font-size: 12px;
    transition: color 0.2s ease, background-color 0.2s ease;
  }
  
  .control-button:hover {
    color: rgba(255, 255, 255, 1);
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .control-button:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
  </style>