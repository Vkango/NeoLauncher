<template>
    <div id="ver-list1" class="configlist">
      <Transition name="fade1">
        <div id="tip2" v-if="!IsLoaded" style="display: flex; align-items: center;"><Loading :line-width="8" ringColor="rgba(var(--text-color), 0.5)" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
      </Transition>
      <Transition name="fade1">
        <ul v-show="IsLoaded">
        <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
            <div v-if="item.clickable">
                <span id="icon_container">
                <img src="../assets/run.svg" id="icon" class="icon">
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
      <Drawer ctitle="" width="70%" :top_position="true">
        <div id="drawer-content" style="padding: 0;">
          <div style="padding-top: 45px; gap: 10px; display: flex; flex-direction: row; align-items: center; flex-wrap: wrap; background-color: rgba(var(--background-color), 0.1);">
            <div id="config-title">{{ activeItem }}</div>
            <div id="tags" style="">
              <Tag title="🚀 最近启动"></Tag>
              <Tag title="🎲 多实例"></Tag>
              <Tag title="🕖 3 天前"></Tag>
              <Tag title="👹 Vkango"></Tag>
              <Tag title="☕ Java 16"></Tag>
            </div>
            <ul class="horizontal-list" style="padding: 0 20px; margin: 0; width: 100%;">
            <RippleButton id="RippleButton" v-for="item in drawer_items" :key="item.text" :class="{ active: item.id === currentTabID }" @click="handleClick1(item)">
              <div style="display: flex; align-items: center; gap: 10px">
                <img class="icon" :src="getIconPath(item.icon)" id="icon">
                <span style="font-size: 12px;">{{ item.text }}</span>
              </div>
          </RippleButton>
          </ul>
          </div>

          <div id="manage">
            <Transition name="fade" mode="in">
              <component :is="drawer_items[currentTabID].component" :key="currentTabID"/>
            </Transition>
          </div>
        </div>

        <RippleButton id="download-button" @click="sendToast('稍等片刻', 10000);"><img src="../assets/download.svg" style="margin-right: 10px;">开始下载</RippleButton>
      </Drawer>
      <Transition name="fade1">
        <div v-if="isLoadingFailed" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <Card icon="offline.svg" title="加载失败" content="不知道怎么回事就似了😭" @click="fetchVersions"></Card>
        </div>
      </Transition>
    </div>

</template>

<script setup>
import { ref, onMounted, defineProps, watch, getCurrentInstance, inject } from 'vue';
import ConfigVerList from './ConfigVerList.vue';
const sendToast = inject("sendToast");
const isLoadingFailed = ref(false);
const props = defineProps({
    currentTabID: {
        type: Number,
        default: 0
    }
});
const types = ['release', 'snapshot', 'old_beta', 'old_alpha'];
const IsLoaded = ref(false); // <!!>
const instance = getCurrentInstance();
let isDrawerOpen = instance.appContext.config.globalProperties.$IsDrawerOpen;
const items = ref([]);
const activeItem = ref(-1);
const worker = new Worker(new URL('../scripts/versionWorker.js', import.meta.url));
const currentTabID = ref(0);
const drawer_items = ref([
  { id: 0, text: '游戏核心', clickable: true, icon: 'game.svg', component: ConfigVerList, tabID: 0},
  { id: 1, text: '模组', clickable: true, icon: 'setting.svg', component: ConfigVerList, tabID: 0},
  { id: 2, text: '材质', clickable: true, icon: 'color.svg', component: ConfigVerList, tabID: 1},
  { id: 3, text: '光影', clickable: true, icon: 'light.svg', component: ConfigVerList, tabID: 2},
  { id: 4, text: '世界存档', clickable: true, icon: 'world.svg', component: ConfigVerList, tabID: 0}, 
  { id: 5, text: '截图', clickable: true, icon: 'camera.svg', component: ConfigVerList, tabID: 0}, 
  { id: 6, text: '设置', clickable: true, icon: 'set-up.svg', component: ConfigVerList, tabID: 0}, 
  ]);
  const getIconPath = (icon) => {
  return new URL(`../assets/${icon}`, import.meta.url).href;
};

onMounted(() => {
  fetchVersions();
});




const fetchVersions = () => {
  IsLoaded.value = false;
  isLoadingFailed.value = false;
  worker.postMessage({ currentTabID: props.currentTabID, types });
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

const handleClick1 = (item) => {
  currentTabID.value = item.id
}
</script>

<style scoped>
#manage {
  flex: 1;
  position: relative;
  overflow-x: hidden;
}
#drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#drawer-content #tags {
  position: relative;
  display: inline-block;
}
#config-title {
  color: rgba(var(--text-color));
  font-size: 24px;
  position: relative;
  display: inline-block;
  font-weight: bold;
  margin-left: 15px;
}
#drawer-content #icon_container {
  margin-right: 30px;
  margin-left: 0px;
}
#drawer-content #icon {
  width: 16px;
  height: 16px;
  border-radius: 0;
  position: relative;
}
#drawer-content #RippleButton {
  padding: 10px 0px;
  margin-right: 30px;

  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  transition: opacity 0.2s ease;
}
#RippleButton.clickable {
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;
  opacity: 0.5;
}
#RippleButton.clickable:hover {
  opacity: 0.5;
}
#RippleButton.active {
  color: rgba(var(--text-color));
  border-bottom: 2px solid rgba(var(--text-color));
  font-weight: bold;
}
#download-button {
  position: fixed;
  right: 15px;
  bottom: 15px;
  
}
#detail {
  height: calc(100% - 40px);
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