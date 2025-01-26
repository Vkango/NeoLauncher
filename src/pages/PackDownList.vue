<template>
    <div id="ver-list">
      <Transition name="fade1">
        <div v-show="IsLoaded" style="overflow-y: scroll; height: 100%; width: 100%; position: absolute;">
          <ul v-show="IsLoaded">
            <li v-for="item in items" :key="item.text" :class="{ active: item.id === activeItem }" @click="handleClick(item)"> 
                <img :src="item.background_image" id="background-image" :class="{ gallery: item.gallery }" style="filter: blur(20px);">
                <img :src="item.background_image" id="background-image" :class="{ gallery: item.gallery }">
                <div id="mask"></div>
                <span id="icon_container">
                <img :src="item.icon" id="icon">
                </span>
                <div id="version-info">
                    <div id="ver-name">{{ item.name }}</div>
                    <div id="desc">{{ item.desc }}</div>
                    <div id="tags">
                        <Tag v-for="tagname in item.tags" :title="tagname.charAt(0).toUpperCase() + tagname.slice(1)" style="margin: 0;"></Tag>
                    </div>
                </div>
            </li>
          </ul>
        </div>
      </Transition>
      <Transition name="fade1">
        <div id="tip2" v-if="!IsLoaded" style="display: flex; align-items: center;"><Loading :line-width="8" ringColor="rgba(255, 255, 255, 0.5)" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
      </Transition>

      <Drawer :ctitle="'下载 ' + activeItem.name">
        <div id="drawer-content">
          <img :src="activeItem.icon" width="45px" id="mod-icon">
          <div id="banner-text">
            <div id="mod-name">{{ activeItem.name }}</div>
            <div id="desc1">{{ activeItem.desc }}</div>
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
          </div>

        </div>
        <RippleButton id="download-button"><img src="../assets/download.svg" style="margin-right: 10px;">开始下载</RippleButton>
      </Drawer>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, getCurrentInstance } from 'vue';
const instance = getCurrentInstance();
let isDrawerOpen = instance.appContext.config.globalProperties.$IsDrawerOpen;
const activeItem = ref(-1);
const IsLoaded = ref(false);
const items = ref({ });
const worker = new Worker(new URL('../scripts/packListWorker.js', import.meta.url));
const fetchVersions = () => {
  IsLoaded.value = false;
  worker.postMessage({ });
  worker.onmessage = (event) => {
    if (event.data.error) {
      console.error('Error fetching versions:', event.data.error);
    } else {
      items.value = event.data.items;
      IsLoaded.value = true;
    }

  };
};

onMounted(() => {
  fetchVersions();
});
const handleClick = (item) => {
    activeItem.value = item; 
    /*sendNotification(
      '正在下载米米世界模组……',
      LoadingWithTip,
      { Tip: item.name },
      3000)
    setTimeout(() => {
      sendNotification(
      '米米世界模组以下载完成\n' + item.name,
      ImageWithTip,
      { showImage: item.background_image, Tip: item.desc },
      5000)
    }, 3000);*/
    isDrawerOpen.state = true;

};

</script>

<style scoped>
#ver-list
{
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
#download-button {
  position: fixed;
  right: 15px;
  bottom: 15px;
  
}

#detail-info {
  display: flex;
  align-content: center;
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
  position: relative;
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


#desc1 {
  color: white;
  line-height: 20px;
  font-size: 13px;
  opacity: 0.5;
  height: fit-content;
}
#mod-icon {
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 5px;
}
#mask
{
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    width: 100%;
    height: 200px;
    border-radius: 5px 5px 0px 0px;
}
#background-image
{
    position: fixed;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 5px 5px 0px 0px;
}
#background-image.gallery
{
  filter: blur(100px);
  overflow: hidden;
  width: 100%;
  height: 160px;
}
#tags
{
    position: absolute;
    top: 220px;
    left: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: calc(100% - 45px);
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
#ver-name
{
    position: relative;
    color: white;
    font-weight: bold;
    font-size: 15px;
    bottom: 0px;
}
#desc
{
    color: rgba(255, 255, 255, 0.5);
    top: 165px;
    height: 85px;
    overflow-y: hidden;

    width: calc(100% - 35px);
    margin-top: 5px;
}
#container
{
    left: 0px;
    top: 80px;
    position: absolute;
    width: 100%;
    height: calc(100% - 80px);
}
#icon_container {
  margin-right: 14px;
  margin-top: 6px;
}
#icon {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 150px;
}
#version-info {
    height: auto;
    position: absolute;
    left: 0px;
    height: 100%;
    width: 100%;
    padding: 10px;
}
ul {
  list-style-type: none;
  font-size: 12px; 
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  margin-top: 30;
  width: calc(100% - 70px);
}

li {
  display: flex;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.3);
  width: 100%;
  top: 5px;
  height: 300px;
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  backdrop-filter: blur(0px);
  transition: top 0.2s ease, background-color 0.2s ease, background-filter 0.2s ease;
  overflow: hidden;
}


li:hover {
  background-color: rgba(255, 255, 255, 0.2);
  top: 0px;
  backdrop-filter: blur(20px);
}

</style>