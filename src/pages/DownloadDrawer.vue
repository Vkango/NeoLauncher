<template>
  <div id="config-drawer">
    <div id="line">
    </div>
    <div id="control">
      <img src="../assets/back.svg" id="back" @click="closeDrawer">
      <span id="drawer-title">下载 {{ verName }}</span>
    </div>
    <div id="detail">
      <img src="../assets/minecraft.png" width="45px" id="mod-icon">
      <div id="banner-text">
        <div id="mod-name">1.21</div>
        <div id="desc">设置下载选项</div>
      </div>
      <div id="details">
        <div id="detail-head">
          <img src="../assets/setting.svg">
          <span id="head-text">自动安装</span>
        </div>
        <div id="detail-info">
          <img id="detail-icon" src="../assets/forge.svg">
          <span id="detail-name">Forge</span>
          <span id="detail-detail">51.0.33</span>
        </div>
        <div id="detail-info">
          <img id="detail-icon" src="../assets/note.svg">
          <span id="detail-name">Fabric</span>
          <span id="detail-detail">不兼容
          </span>
        </div>
        <div id="detail-info">
          <img id="detail-icon" src="../assets/note.svg">
          <span id="detail-name">NeoForge</span>
          <span id="detail-detail">不兼容</span>
          
        </div>
        <div id="detail-info">
          <img id="detail-icon" src="../assets/note.svg">
          <span id="detail-name">OptiFine</span>
          <span id="detail-detail">不兼容</span>
        </div>
        <div id="detail-head">
          <img src="../assets/setting.svg">
          <span id="head-text">安装信息</span>
        </div>
        <div id="detail-info">
          <img id="detail-icon" src="../assets/forge.svg">
          <span id="detail-name">配置名</span>
          <span id="detail-detail">default</span>
          
        </div>
        <div id="detail-info">
          <img id="detail-icon" src="../assets/note.svg">
          <span id="detail-name">显示名称</span>
          <span id="detail-detail">1.21-Forge_51.0.33
          </span>
        </div>
      </div>

    </div>
    <RippleButton id="download-button" @click="console.log('hello')"><img src="../assets/download.svg" style="margin-right: 10px;">开始下载</RippleButton>
  </div>


</template>

<script setup>
import Tag from '../components/Tag.vue';
import { defineEmits } from 'vue';
import RippleButton from '../components/RippleButton.vue';
const verName = defineProps(['verName']);
const emit = defineEmits(['close']);

const closeDrawer = () => {
  emit('close');
};

</script>

<style scoped>
#download-button {
  position: fixed;
  right: 15px;
  bottom: 15px;
  
}
#config-drawer {
  transform: translateX(0);
  transition: transform 0.2s ease;
}
#detail-icon {
  width: 14px;
  height: 14px;
  margin-top: 10px;
  opacity: 0.5;

}
#detail-name {
  color: white;
  font-size: 12px;
  position: absolute;
  margin: 8px 10px;
  opacity: 0.5;
}
#detail-detail {
  position: absolute;
  left: 100px;
  margin-top: 8px;
  font-size: 12px;
}
#head-text {
  
  font-size: 12px;
  position: relative;
  left: 10px;
  top: -5px;

}
#details {

  flex-grow: 1; 
  padding: 10px;
  color: white;
}
#detail-head {
  opacity: 0.5;
  margin-top: 15px;
}
#banner-text {
  margin: 0 10px;
}
#mod-name {
  font-weight: bold;
  color: white;
}
#control {
  height: auto;
  display: flex;
  align-items: center;
}
#detail {
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 5px;

}
#desc {
  color: white;
  line-height: 20px;
  font-size: 13px;
  opacity: 0.5;
}
#mod-icon {
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
}
#line {
  left: 0px;
  top: 0px;
  height: 2px;
  width: 100%;
  background-color: rgba(124, 162, 64, 0.5);
}
#back {

  padding: 15px;
}
#drawer-title {
  left: 35px;
  top: 8px;
  width: calc(100% - 60px);
  color: white;
  font-size: 12px;
}
#config-drawer {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 400px;
  background-color: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(20px);
  box-shadow: 0px 10px 50px 0px rgba(0,0,0,0.8);
}

</style>