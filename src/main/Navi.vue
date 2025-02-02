<template>
  <div id="background">
    <div id="user-info">
      <img id="avatar" src="../assets/avatar.png" @click="onLoginUI">
      <div id="user-name">Vkango</div>
      <div id="status">
        <div id="circle"></div>
        <div id="status-info">正版登录</div>
      </div>
    </div>
    <RippleButton id="RippleButton" @click="emit('onSearchUI')"><div style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">Search in web / local...</div></RippleButton>
    <div id="line"></div>
    <div id="list"><NaviList @changePage="handleChangePage"></NaviList></div>

  </div>         
</template>

<script setup>
import { defineEmits } from 'vue';
import NaviList from './NaviList.vue';
const emit = defineEmits(['changePage', 'onLoginUI', 'onSearchUI']);
const onLoginUI = () => {
  emit('onLoginUI');
}
const handleChangePage = (pageId) => {
  emit('changePage', pageId);
};
defineProps({
color: String,
})
</script>

<style scoped>

#list
{
  position: absolute;
  left: 0px;
  top: 140px;
  width: 225px;
  height: calc(100% - 140px);
  overflow-y: auto;
}

#line
{
  position: absolute;
  left: 15px;
  top: 133px;
  width: 195px;
  height: 2px;
  background-color: rgba(var(--text-color), 0.1);
}
#RippleButton{
  position: absolute;
  left: 15px;
  top: 100px;
  width: 191px;
  height: 22px;
  border-radius: 5px;
  resize: none;
  box-shadow: none;
  border: none;
  padding: 0;
  background-color: rgba(var(--text-color), 0.1);
  text-align: center;
  color: rgba(var(--text-color), 0.5);
  font-size: 12px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
input::placeholder {
  color: rgba(var(--text-color), 0.5);
}

#user-info #avatar
{
  position: absolute;
  top: 50px;
  left: 15px;
  width: 40px;
  height: 40px;
}
#user-info #status
{
  opacity: 0.5;
}
#user-info #status-info
{
  color: rgba(var(--text-color));
  font-size: 10px;
  left: 83px;
  top: 76px;
  position: absolute;
}
#user-info #user-name
{
  position: absolute;
  left: 71px;
  top: 48px;
  color: rgba(var(--text-color));
  font-size: 17px;
}
#user-info #circle
{
  background-color: rgba(var(--text-color));
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 5px;
  left: 71px;
  top: 80px;
}
#background
{
  background-color: rgba(var(--background-color), 0.1);
  width: 225px;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  backdrop-filter: blur(var(--blur-value));
}
</style>