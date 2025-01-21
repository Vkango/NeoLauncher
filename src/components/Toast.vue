<template>
    <transition name="fade">
      <div
        v-if="visible"
        class="toast"
        :class="`toast`"
        @mouseenter="pauseTimer"
        @mouseleave="startTimer"
      >
        <div class="toast-content">
          <div class="toast-title">{{ title }}</div>
        </div>
        
      </div>
    </transition>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  export default {
    name: 'Toast',
    props: {
      title: {
        type: String,
        default: '请选择启动配置',
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
  .toast {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    bottom: 15px;
    left: 0px;
    width: 100%;
  }
  .toast-content {
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  .toast-title {
    font-size: 12px;
    font-weight: bold;
  }

  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, bottom 0.3s ease;

  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    bottom: 5px;
  }
  </style>