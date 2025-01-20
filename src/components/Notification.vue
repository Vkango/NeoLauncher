<template>
    <transition name="fade">
      <div
        v-if="visible"
        class="notification"
        :class="`notification-${position}`"
        @mouseenter="pauseTimer"
        @mouseleave="startTimer"
      >
        <div class="notification-content">
          <div class="notification-title">{{ title }}</div>
          <div class="notification-message">{{ message }}</div>
        </div>
        <button class="notification-close" @click="close">关闭</button>
      </div>
    </transition>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  export default {
    name: 'Notification',
    props: {
      title: {
        type: String,
        default: '通知',
      },
      message: {
        type: String,
        default: '',
      },
      duration: {
        type: Number,
        default: 3000, // 通知持续时间（毫秒）
      },
      position: {
        type: String,
        default: 'top-right', // 通知位置
        validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
      },
    },
    setup(props, { emit }) {
      const visible = ref(false);
      let timer = null;
  
      // 显示通知
      const show = () => {
        visible.value = true;
        startTimer();
      };
  
      // 关闭通知
      const close = () => {
        visible.value = false;
        emit('closed');
      };
  
      // 启动定时器
      const startTimer = () => {
        if (timer) clearTimeout(timer);
        if (props.duration > 0) {
          timer = setTimeout(close, props.duration);
        }
      };
  
      // 暂停定时器
      const pauseTimer = () => {
        if (timer) clearTimeout(timer);
      };
  
      // 监听 visible 的变化
      watch(visible, (newVal) => {
        if (newVal) {
          startTimer();
        }
      });
  
      // 挂载时显示通知
      onMounted(show);
  
      // 卸载时清理定时器
      onUnmounted(() => {
        if (timer) clearTimeout(timer);
      });
  
      return {
        visible,
        close,
        startTimer,
        pauseTimer,
      };
    },
  };
  </script>
  
  <style scoped>
  .notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 1000;
    width: 300px;
    max-width: 90%;
  }
  
  .notification-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .notification-message {
    font-size: 14px;
    color: #666;
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
  
  /* 位置样式 */
  .notification-top-left {
    top: 20px;
    left: 20px;
  }
  
  .notification-top-right {
    top: 20px;
    right: 20px;
  }
  
  .notification-bottom-left {
    bottom: 20px;
    left: 20px;
  }
  
  .notification-bottom-right {
    bottom: 20px;
    right: 20px;
  }
  
  /* 动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>