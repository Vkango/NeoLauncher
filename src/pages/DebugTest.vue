<template>
    <UIContainer>
      <div id="config-title">调教刑具</div>
      <div style="display: flex; gap: 5px; margin: 20px; flex-wrap: wrap;">
        <RippleButton @mousedown.stop @click="onclick1()">MessageBox</RippleButton>
        <RippleButton @mousedown.stop @click="onclick1()">Toast</RippleButton>
        <RippleButton @mousedown.stop @click="onclick1()">Notification</RippleButton>
      </div>
  </UIContainer>
</template>

<script setup>
import { ref, inject } from 'vue';
import Loading from '../components/Loading.vue';
const showMessageBox = inject('messageBox');
const onclick1 = (() => {
  showMessageBox(
    "哦还有",
    Loading
  );
})
</script>

<style scoped>
#tip {
  opacity: 0.5;
  margin-left: 30px;
  margin-top: 5px;
  font-size: 12px;
}
#tip2 {
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.6);
}
#config-title {
  color: white;
  font-size: 24px;
  margin-left: 30px;
  position: relative;
  display: inline-block;
  margin-top: 40px;
  font-weight: bold;
}
#tags {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  top: -3px;
  cursor: default;
}
#container
{
  left: 0px;
  top: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease;
  text-align: left;
  padding: 0;
}
#container:hover
{
  background-color: rgba(255, 255, 255, 0.025);
}
</style>