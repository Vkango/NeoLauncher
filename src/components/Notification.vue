<template>
    <div class="notification-container" :class="`notification-container-${position}`">
      <transition-group name="fade" tag="div" class="notification-list">
        <div
          v-for="item in notifications"
          :key="item.id"
          :data-id="item.id"
          v-show="item.visible"
          class="notification"
          @mouseenter="pauseTimer(item.id)" 
          @mouseleave="startTimer(item.id, item.duration)" 
          @mousedown="startDrag($event, item.id)"
          @mouseup="endDrag(item.id)"
        >
        <RippleButton class="notification-content">
          <div class="notification-title">{{ item.title }}</div>
          <div class="notification-message">
            <!--无法使用插槽，因为App.vue添加通知时不能传动态页面-->
            <component :is="item.component" v-bind="item.props"></component>
          </div>
          <Button class="notification-close" @click="close(item.id)">
            <img src="../assets/close.svg" width="12px">
          </Button>
        </RippleButton>

        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup>
import { ref, onUnmounted, markRaw } from 'vue';   
const notifications = ref([]);
const timers = ref({});
const dragging = ref(false);
const dragStartX = ref(0);
const currentDragId = ref(null);
let deltaX = 0;
const addNotification = (title, component, props = {}, duration = 5000) => {
    const id = Date.now();
    notifications.value.unshift({ id, title, component: markRaw(component), props, duration, visible: true });
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
const startDrag = (event, id) => {
    dragging.value = true;
    dragStartX.value = event.clientX;
    currentDragId.value = id;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
};

const onDrag = (event) => {
  if (dragging.value && currentDragId.value !== null) {
    deltaX = event.clientX - dragStartX.value;
    const notificationElement = document.querySelector(`.notification[data-id="${currentDragId.value}"]`);
    if (notificationElement) {
        notificationElement.style.transform = `translateX(${deltaX}px)`;
        notificationElement.style.opacity = `${1 - Math.abs(deltaX / 100)}`;

    }
  }
};

const endDrag = () => {
    if (Math.abs(deltaX) > 100) {
        console.log(currentDragId.value, "closed");
        // 不要调用close显示动画，直接删除
        const index = notifications.value.findIndex((item) => item.id === currentDragId.value);
        if (index !== -1) {
        // 设置项目为不可见，触发动画
        notifications.value[index].visible = false;
        // 等待动画完成后再移除项目
        setTimeout(() => {
        notifications.value.splice(index, 1);
        }, 300);
    }
      }
    if (Math.abs(deltaX) <= 100) {
        deltaX = 0
        const notificationElement = document.querySelector(`.notification[data-id="${currentDragId.value}"]`);
        notificationElement.style.transform = `translateX(0px)`;
        notificationElement.style.opacity = 1;
    }
  dragging.value = false;
  currentDragId.value = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
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
    text-align: left;
  }
  .notification-content {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .notification-close {
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 0px;
    box-shadow: none;
    width: 32px;
    padding: 0;
    height: 32px;
    opacity: 0.5;
  }
  
  .notification-close:hover {
    opacity: 1;
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

  </style>