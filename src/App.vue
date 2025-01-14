<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import Navi from "./main/Navi.vue";
import HomeUI from "./pages/HomeUI.vue";
import DownloadUI from './pages/DownloadUI.vue';
import ConfigManage from "./pages/ConfigManage.vue";
import ModDownloadUI from './pages/ModDownloadUI.vue';
</script>
<template>
  <div id="container"></div>
  <div id="overlay"></div>
  <Navi></Navi>
  <!--<ConfigManage></ConfigManage>-->
  <!--<DownloadUI></DownloadUI>-->
  <!--<HomeUI></HomeUI>-->
  <ModDownloadUI></ModDownloadUI>
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
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
background: rgba(16, 31, 28, 0.1);
border-radius: 0;
}

::-webkit-scrollbar-thumb {
background-color: rgba(255, 255, 255, 0.3);
border-radius: 0;
transition: background-color 0.3s;
cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
background-color: rgba(255, 255, 255, 0.5);
}
</style>