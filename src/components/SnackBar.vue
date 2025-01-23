<template>
    <transition name="fade">
      <div
        v-if="visible"
        class="snackbar"
        :class="`snackbar`"
        @mouseenter="pauseTimer"
        @mouseleave="startTimer"
      >
        <div class="snackbar-content">
          <div class="snackbar-title">{{ title }}</div>
          <RippleButton id="button">撤销</RippleButton>
        </div>
        
      </div>
    </transition>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  export default {
    name: 'SnackBar',
    props: {
      title: {
        type: String,
        default: '已删除配置 default',
      },
      duration: {
        type: Number,
        default: 60000, // 通知持续时间（毫秒）
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
  .snackbar {
    position: absolute;
    z-index: 2;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
  }
  .snackbar-content {

    width: 100%;
    display: flex;
    height: 100%;
  }
  .snackbar-title {
    padding: 10px 15px;
    font-size: 12px;
    font-weight: bold;
    display: inline-block;
    width: calc(100% - 80px);
  }

  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, bottom 0.3s ease;

  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    bottom: -30px;
  }
  #button {
    background-color: transparent;
    box-shadow: none;
    width: 80px;
    display: block;
    font-size: 12px;
    color: rgb(85, 210, 226)
  }
  </style>