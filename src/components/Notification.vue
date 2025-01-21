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
          <div class="notification-content">
            <div class="notification-title">{{ item.title }}</div>
            <div class="notification-message">{{ item.message }}</div>
          </div>
          <button class="notification-close" @click="close(item.id)">关闭</button>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script>
  import { ref, onUnmounted } from 'vue';
  
  export default {
    name: 'Notification',
    props: {
    },
    setup(props) {
      const notifications = ref([]);
      const timers = ref({});
  
      const addNotification = (title, message, duration = 5000) => {
        const id = Date.now();
        notifications.value.push({ id, title, message, duration, visible: true });
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
  
      return {
        notifications,
        addNotification,
        close,
        startTimer,
        pauseTimer,
      };
    },
  };
  </script>
  
  <style scoped>
  /* 通知容器 */
  .notification-container {
    position: fixed;
    display: flex;
    flex-direction: column-reverse;
    z-index: 2;
    overflow-y: scroll;
    overflow-x: hidden;
    right: 0px;
    top: 40px;
    height: calc(100% - 40px);
  }
  
  .notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    width: 300px;
    max-width: 100%;
    margin-bottom: 10px;
  }
  
  .notification-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .notification-message {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
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