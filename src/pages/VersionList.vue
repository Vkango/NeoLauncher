<template>
    <div id="ver-list">
      <Transition name="fade1">
        <div id="tip2" v-if="!IsLoaded" style="display: flex; align-items: center;"><Loading :line-width="8" ringColor="rgba(var(--text-color), 0.5)" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
      </Transition>
      <Transition name="fade1">
        <ul v-show="IsLoaded">
        <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
            <div v-if="item.clickable">
                <span id="icon_container">
                <img :src="getIconPath(item.icon)" id="icon">
                </span>
                <div id="version-info">
                    <div id="ver-name">{{ item.name }}</div>
                    <div id="tags">
                        <Tag v-for="tagname in item.tags" :title="tagname"></Tag>
                    </div>
                </div>
            </div>
            <div v-if="!item.clickable">
                <div id="head-name"><div id="head-item">{{ item.name }}
                    <Tag v-for="tagname in item.tags" :title="tagname"></Tag></div>
                </div>
            </div>
        </li>
        </ul>
      </Transition>
      <Drawer :ctitle="'下载 ' + activeItem">
        <div id="drawer-content" style="padding: 0 5px;">
          <img src="../assets/minecraft.png" width="45px" id="mod-icon">
          <div id="banner-text">
            <div id="mod-name">{{ activeItem }}</div>
            <div id="desc">设置下载选项</div>
          </div>
          <div id="details">
            <div id="detail-head">
              <img class="icon" src="../assets/setting.svg">
              <span id="head-text">自动安装</span>
            </div>
            <div id="detail-info">
              <img class="icon" id="detail-icon" src="../assets/forge.svg">
              <span id="detail-name">Forge</span>
              <span id="detail-detail">51.0.33</span>
            </div>
            <div id="detail-info">
              <img class="icon" id="detail-icon" src="../assets/note.svg">
              <span id="detail-name">Fabric</span>
              <span id="detail-detail">不兼容
              </span>
            </div>
            <div id="detail-info">
              <img class="icon" id="detail-icon" src="../assets/note.svg">
              <span id="detail-name">NeoForge</span>
              <span id="detail-detail">不兼容</span>
              
            </div>
            <div id="detail-info">
              <img class="icon" id="detail-icon" src="../assets/note.svg">
              <span id="detail-name">OptiFine</span>
              <span id="detail-detail">不兼容</span>
            </div>
            <div id="detail-head">
              <img class="icon" src="../assets/setting.svg">
              <span id="head-text">安装信息</span>
            </div>
            <div id="detail-info">
              <img class="icon" id="detail-icon" src="../assets/forge.svg">
              <span id="detail-name">配置名</span>
              <span id="detail-detail">default</span>
              
            </div>
            <div id="detail-info">
              <img class="icon" id="detail-icon" src="../assets/note.svg">
              <span id="detail-name">显示名称</span>
              <span id="detail-detail">1.21-Forge_51.0.33
              </span>
            </div>
          </div>

        </div>
        <RippleButton id="download-button" @click="sendToast('稍等片刻', 10000);"><img src="../assets/download.svg" style="margin-right: 10px;">开始下载</RippleButton>
      </Drawer>
      <Transition name="fade1">
        <div v-if="isLoadingFailed" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <Card icon="offline.svg" title="加载失败" content="可能是网络有问题" @click="fetchVersions"></Card>
        </div>
      </Transition>
    </div>

</template>

<script setup>
import { ref, onMounted, defineProps, watch, getCurrentInstance, inject } from 'vue';
import { fetchData } from '../scripts/request.js'
const sendToast = inject("sendToast");
const isLoadingFailed = ref(false);
const props = defineProps({
    currentTabID: {
        type: Number,
        default: 0
    },
    currentSelected: {
      type: Number,
      default: 0
    }
});
const types = ['release', 'snapshot', 'old_beta', 'old_alpha', 'release'];
const IsLoaded = ref(false); // <!!>
const instance = getCurrentInstance();
let isDrawerOpen = instance.appContext.config.globalProperties.$IsDrawerOpen;
const items = ref([]);
const activeItem = ref(-1);
const worker = new Worker(new URL('../scripts/versionWorker.js', import.meta.url));



onMounted(() => {
  fetchVersions();
});




const fetchVersions = async () => {
  IsLoaded.value = false;
  isLoadingFailed.value = false;
  let responseData;
  switch (props.currentSelected)
  {
    case 1:
      responseData = await fetchData('https://piston-meta.mojang.com/mc/game/version_manifest.json');
      break;
    case 2:
      responseData = await fetchData('https://bmclapi2.bangbang93.com/mc/game/version_manifest.json');
      break;
    case 3:
      responseData = await fetchData('https://mrarm.io/r/w10-vdb');
  }
  worker.postMessage({ responseData: responseData, currentTabID: props.currentTabID, currentSelected: props.currentSelected, types });
  worker.onmessage = (event) => {
    if (event.data.error) {
      console.error('Error fetching versions:', event.data.error);
      isLoadingFailed.value = true;
      IsLoaded.value = true;
    } else {
      items.value = event.data.items;
      IsLoaded.value = true;
    }

  };
};


const handleClick = (item) => {
  if (item.clickable) {
    activeItem.value = item.id;
    isDrawerOpen.state = true;
    

  }
};

const closeDrawer = () => {
  isDrawerOpen.state = false;
};
const getIconPath = (icon) => {
    return new URL(`../assets/${icon}`, import.meta.url).href;
};

</script>

<style scoped>

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
  color: rgba(var(--text-color));
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
  color: rgba(var(--text-color));
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
  color: rgba(var(--text-color));
}


#desc {
  color: rgba(var(--text-color));
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

#tip2 {
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  color: rgba(var(--text-color), 0.5);
  background-color: rgba(var(--background-color), 0.3);
  backdrop-filter: blur(var(--blur-value));
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.6);
}


#head-item
{
    width: fit-content;
    background-color: rgba(var(--background-color), 0.3);
    padding: 8px;
    border-radius: 5px;
}
#head-name
{
    color: rgba(var(--text-color));
    font-weight: bold;
    font-size: 15px;
}
#load-status
{
    position: absolute;
    right: 0px;
}
#tags
{
    margin-top: 3px;
}
#ver-name
{
    font-size: 15px;
    display: inline-block;
}

#ver-list
{
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}


#icon_container {
  margin-left: 10px;
  margin-top: 6px;
}
#icon {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  position: relative;
}
#version-info {
    height: auto;
    position: relative;
    top: -50px;
    left: 70px;
}
ul {
  list-style-type: none;
  padding: 0;
  font-size: 12px; 
  display: flex;
  flex-wrap: wrap;
}

li {
  padding: 20px 15px;
  color: rgba(var(--text-color), 0.3);
  width: 100%;
}

li.clickable {
  top: 0px;
  width: 200px;
  height: 60px;
  position: relative;
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;
  transition: top 0.2s ease;
}

li.clickable:hover {
  top: -5px;
}


</style>