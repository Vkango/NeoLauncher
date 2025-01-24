<template>
  <div id="background">
    <div id="user-info">
      <img id="avatar" src="../assets/avatar.png">
      <div id="user-name">Vkango</div>
      <div id="status">
        <div id="circle"></div>
        <div id="status-info">正版登录</div>
      </div>
    </div>
    <input type="text" placeholder="Search in web / local..."></input>
    <div id="line"></div>
    <div id="list"><NaviList @changePage="handleChangePage"></NaviList></div>
  </div>         
</template>

<script setup>
import { defineEmits } from 'vue';
import NaviList from './NaviList.vue';
const emit = defineEmits(['changePage']);

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
  top: 130px;
  width: 225px;
  height: calc(100% - 130px);

}

#line
{
  position: absolute;
  left: 15px;
  top: 133px;
  width: 195px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.1);
}
input{
  position: absolute;
  left: 15px;
  top: 100px;
  width: 191px;
  height: 22px;
  border-radius: 5px;
  resize: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  color: white;
  font-size: 12px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
input::placeholder {
  color: rgba(255, 255, 255, 0.5); /* 设置placeholder的颜色 */
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
  color: white;
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
  color: white;
  font-size: 17px;
}
#user-info #circle
{
  background-color: white;
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 5px;
  left: 71px;
  top: 80px;
}
#background
{
  background-color: rgba(0, 0, 0, 0.1);
  width: 225px;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  backdrop-filter: blur(20px);
}
</style>