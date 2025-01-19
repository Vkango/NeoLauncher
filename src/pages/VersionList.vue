<template>
    <div id="ver-list">
      <Transition name="fade1">
        <div id="tip2" v-if="!IsLoaded" style="display: flex; align-items: center;"><Loading :line-width="8" line-color="#ffffff" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
      </Transition>
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
        <transition name="drawer" mode="in">
          <div id="drawer-mask" v-if="isDrawerOpen" >
            <transition name="drawer" mode="in">
                  <DownloadDrawer v-if="isDrawerOpen" @close="closeDrawer"></DownloadDrawer>
            </transition> 
          </div>
        </transition>
    </div>

</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Tag from '../components/Tag.vue';
import DownloadDrawer from './DownloadDrawer.vue';
import Loading from '../components/Loading.vue';
  
const props = defineProps({
    currentTabID: {
        type: Number,
        default: 0
    }
});
const types = ['release', 'snapshot', 'old_beta', 'old_alpha'];
const IsLoaded = ref(false); // <!!>
const isDrawerOpen = ref(false);
const items = ref([]);
const activeItem = ref(-1);
const worker = new Worker(new URL('./versionWorker.js', import.meta.url));



onMounted(() => {
  fetchVersions();
});




const fetchVersions = () => {
  IsLoaded.value = false;
  worker.postMessage({ currentTabID: props.currentTabID, types });
  worker.onmessage = (event) => {
    if (event.data.error) {
      console.error('Error fetching versions:', event.data.error);
    } else {
      items.value = event.data.items;
      IsLoaded.value = true;
    }

  };
};


const handleClick = (item) => {
  if (item.clickable) {
    activeItem.value = item.id;
    isDrawerOpen.value = true;
  }
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};
const getIconPath = (icon) => {
    return new URL(`../assets/${icon}`, import.meta.url).href;
};

</script>

<style scoped>
.fade1-enter-active,
.fade1-leave-active {
  transition: opacity 0.5s ease;
}

.fade1-enter-from,
.fade1-leave-to {
  opacity: 0;
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
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
#drawer-mask
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
}
#head-item
{
    width: fit-content;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 8px;
    border-radius: 5px;
}
#head-name
{
    color: white;
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
    overflow-y: scroll;
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
  color: rgba(255, 255, 255, 0.3);
  width: 100%;
}

li.clickable {
  width: 200px;
  height: 60px;
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 12px;
}

li.clickable:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

</style>