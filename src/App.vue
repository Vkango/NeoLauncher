<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import Navi from "./main/Navi.vue";
import ConfigManage from "./pages/ConfigManage.vue";
</script>
<template>
  <div id="container"></div>
  <div id="overlay"></div>
  <Navi></Navi>
  <ConfigManage></ConfigManage>
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
  background-color: rgba(0, 0, 0, 0.3);
}
:root
{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>