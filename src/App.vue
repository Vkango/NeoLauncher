<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import Navi from "./main/Navi.vue";
import DownloadUI from './pages/DownloadUI.vue'
import ConfigManage from "./pages/ConfigManage.vue";
</script>
<template>
  <div id="container"></div>
  <div id="overlay"></div>
  <Navi></Navi>
  <!--<ConfigManage></ConfigManage>-->
  <DownloadUI></DownloadUI>
</template>
<style>

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
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
::-webkit-scrollbar {
width: 10px; /* 纵向滚动条宽度 */
height: 10px; /* 横向滚动条高度 */
}

::-webkit-scrollbar-track {
background: rgba(16, 31, 28, 0.1);
border-radius: 2em;
}

::-webkit-scrollbar-thumb {
background-color: rgba(255, 255, 255, 0.3);
border-radius: 2em;
transition: background-color 0.3s;
cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
background-color: rgba(255, 255, 255, 0.5);
}
</style>