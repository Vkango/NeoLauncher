<template>
    <div
      class="title-bar"
      @mousedown="startDragging"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
    >
      <div class="title">{{ title }}</div>
      <div class="controls">
        <div class="control-button" @click="minimizeWindow">🔔</div>
        <div class="control-button" @click="minimizeWindow">👇</div>
        <div class="control-button" @click="maximizeWindow">👌</div>
        <div class="control-button" @click="closeWindow">🫱</div>
      </div>
    </div>
  </template>
  
  <script>
        async function minimizeWindow() {
        const window = getCurrentWindow();
        await window.minimize();
      }
      async function maximizeWindow() {
        const window = getCurrentWindow();
        const isMaximized = await window.isMaximized();
        if (isMaximized) {
          await window.unmaximize();
        } else {
          await window.maximize();
        }
      }
      async function closeWindow() {
        const window = getCurrentWindow();
        await window.close();
      }

  import { getCurrentWindow } from '@tauri-apps/api/window';
  
  export default {
    props: {
      title: {
        type: String,
        default: 'Tauri App'
      }
    },
    methods: {
        startDragging(event) {
        const window = getCurrentWindow();
        window.startDragging();
      },
      stopDragging() {
      }
    }
  };
  </script>
  
  <style scoped>
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
  
  .control-button {
    padding: 0 10px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
    cursor: pointer;
    height: 30px;
    box-shadow: none;
    align-content: center;
    text-align: center;
    width: 30px;
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