<template>
    <div class="notification-container" :class="`notification-container-${position}`">
      <transition-group name="fade" tag="div" class="notification-list">
        <div
          v-for="item in notifications"
          :key="item.id"
          v-show="item.visible"
          class="notification"
          @mouseenter="pauseTimer(item.id)" 
          @mouseleave="startTimer(item.id, item.duration)" 
        >
          <RippleButton class="notification-content">
            <div class="notification-title">{{ item.title }}</div>
            <div class="notification-message">{{ item.message }}</div>
            <button class="notification-close" @click="close(item.id)">关闭</button>
          </RippleButton>

        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue';   
  const notifications = ref([]);
  const timers = ref({});
  
  const addNotification = (title, message, duration = 5000) => {
    const id = Date.now();
    notifications.value.unshift({ id, title, message, duration, visible: true });
    startTimer(id, duration);
  };
  
  const close = (id) => {
    const index = notifications.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      // 设置项目为不可见，触发动画
      notifications.value[index].visible = false;
      // 等待动画完成后再移除项目
      setTimeout(() => {
        notifications.value.splice(index, 1);
      }, 300);
    }
  };
  
  const startTimer = (id, duration) => {
    if (timers.value[id]) {
      clearTimeout(timers.value[id]);
    }
    if (duration > 0) {
      timers.value[id] = setTimeout(() => {
        close(id);
        delete timers.value[id];
      }, duration);
    }
  };
  
  const pauseTimer = (id) => {
    if (timers.value[id]) {
      clearTimeout(timers.value[id]);
      delete timers.value[id];
    }
  };
  
  onUnmounted(() => {
    for (const id in timers.value) {
      if (timers.value[id]) clearTimeout(timers.value[id]);
    }
  });
  defineExpose({
  addNotification,
  close,
  startTimer,
  pauseTimer,
});
  </script>
  <style scoped>
  ::-webkit-scrollbar {
    display: none;
}
  .notification-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    z-index: 2;
    overflow-y: scroll;
    overflow-x: hidden;
    right: 0px;
    top: 40px;
    padding-right: 10px;
    height: calc(100% - 40px);
    pointer-events: none;
    width: 300px;
  }
  
  .notification {
    pointer-events: all;


    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    border-radius: 4px;
    box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.6);
    width: calc(100% - 10px);
    margin: 10px;
    margin-top: 0px;
  }
  
  .notification-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    text-align: left;
  }
  
  .notification-message {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
  .notification-content {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .notification-close {
    border: none;
    background: none;
    font-size: 16px;
    cursor: pointer;
    color: #999;
  }
  
  .notification-close:hover {
    color: #333;
  }
  
  .fade-enter-active,
  .fade-leave-active,
  .fade-move {
    transition: all 0.3s ease, opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }

  .fade-move {
  transition: transform 0.3s ease; /* 确保移动时有过渡效果 */
}
  </style>