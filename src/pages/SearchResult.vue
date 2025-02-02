<template>
    <div id="ver-list">
      <Transition name="fade1">
        <div id="tip2" v-if="!IsLoaded" style="display: flex; align-items: center;"><Loading :line-width="8" ringColor="rgba(var(--text-color), 0.5)" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
      </Transition>
      <Transition name="fade1">
        <ul v-show="IsLoaded">
        <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }">
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
      <Transition name="fade1">
        <div v-if="isLoadingFailed" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <Card icon="offline.svg" title="加载失败" content="可能是网络有问题" @click="fetchVersions"></Card>
        </div>
      </Transition>
    </div>

</template>

<script setup>
import { ref, onMounted, defineProps, watch, getCurrentInstance, inject } from 'vue';
import Tip from '../components/Tip.vue';
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
  left: 15px;
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
    width: auto;
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
  gap: 10px;
}

li {
  padding: 20px 0px;
  color: rgba(var(--text-color), 0.3);
  width: 100%;

}

li.clickable {
  top: 0px;
  width: 24%;
  height: 60px;
  position: relative;
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;
  transition: top 0.2s ease;
  backdrop-filter: blur(var(--blur-value));
  border-radius: 5px;
  background-color: rgba(var(--background-color), 0.4);
}

li.clickable:hover {
  top: -5px;
}


</style>