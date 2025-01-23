<script setup>
import { ref, shallowRef } from "vue";
import { invoke } from "@tauri-apps/api/core";
import Navi from "./main/Navi.vue";
import HomeUI from "./pages/HomeUI.vue";
import DownloadUI from './pages/DownloadUI.vue';
import ConfigManage from "./pages/ConfigManage.vue";
import ModDownloadUI from './pages/ModDownloadUI.vue';
import Settings from './pages/Settings.vue';
import TitleBar from './components/TitleBar.vue';
import Notification from "./components/Notification.vue";
import AddConfigUI from "./pages/AddConfigUI.vue";
import Loading from './components/Loading.vue';

let currentComponent = shallowRef(HomeUI);

const componentsMap = {
  1: HomeUI,
  2: Settings,
  3: DownloadUI,
  4: ModDownloadUI,
  5: AddConfigUI,
  6: ConfigManage,
};

const notificationComponent = ref(null);

// 定义显示通知的方法
const showNotification = () => {
  
  if (notificationComponent.value) {
    notificationComponent.value.addNotification(
      '正在下载 1.12.2', // 标题
      Loading, // 组件
      { lineWidth: 8, ringColor: 'rgba(255, 255, 255, 0.5)', width: 16, height: 16 }, // 组件属性
      5000 // 持续时间（毫秒）
    );
  }
};

const changePage = (pageId) => {
  currentComponent.value = componentsMap[pageId] || HomeUI;
};
</script>

<template>
  <div id="container"></div>
  <div id="overlay"></div>
  <TitleBar title="NeoLauncher" style="z-index: 1;" />
  <Navi @changePage="changePage"></Navi>
  <transition name="fade-up" mode="in">
      <component :is="currentComponent"></component>
  </transition>

  <div style="position: absolute; left: 30px; top: 30px">
    <RippleButton @click="showNotification">显示通知</RippleButton>
  </div>
    <Notification ref="notificationComponent"/>

</template>
<style>
#notifications {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  position: fixed; /* 固定位置 */
  top: 20px; /* 距离顶部的距离 */
  right: 20px; /* 距离右侧的距离 */
  gap: 10px; /* 通知之间的间距 */

}
.fade-up-enter-active, .fade-up-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-up-enter, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-enter-active {
  animation: fadeInUp 0.2s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
button {
  background-color: rgba(0, 0, 0, 0.5);
  border: 0;
  padding: 10px 15px;
  border-radius: 3px;
  color: white;
  box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.6);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  align-content: center;
}
button:hover {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.6);
}
#container
{
  background: url('./assets/background.jpg');
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
}

#overlay
{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
}
:root
{
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  padding-right: 10px;
}

::-webkit-scrollbar-track {
background: rgba(16, 31, 28, 0.1);
border-radius: 0;
}

::-webkit-scrollbar-thumb {
background-color: rgba(255, 255, 255, 0.3);
border-radius: 0;
transition: background-color 0.2s;
cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
background-color: rgba(255, 255, 255, 0.5);
}
</style>