<template>
    <div id="ver-list">
      <Transition name="fade1">
        <div id="listview" v-show="IsLoaded" @scroll="handleScroll" style="overflow-y: auto; height: 100%; width: 100%; position: absolute;">
          <ul v-show="IsLoaded">
            <li ref="item" class="item" v-for="item in items" :key="item.text" :class="{ active: item.id === activeItem }" @click="handleClick(item)"> 
              <div v-if="item.gallery" >
                <img :src="item.background_image" id="background-image" :class="{ gallery: item.gallery }" style="filter: blur(20px); position: absolute;">
                <img :src="item.background_image" id="background-image" :class="{ gallery: item.gallery }">
              </div>
                <div id="mask"></div>
                <img :src="item.icon" id="icon" :class="{ gallery: item.gallery }">
                <div id="version-info" :style="{ position: item.gallery ? 'absolute' : 'relative' }">
                    <div id="ver-name" :class="{ gallery: item.gallery }" :style="{ width: item.gallery ? '100%' : 'calc(100% - 70px)' }">{{ item.name }}</div>
                    <div id="desc" :class="{ gallery: item.gallery }">{{ item.desc }}</div>
                </div>
                <div id="tags">
                    <Tag v-for="tagname in item.tags" :title="tagname.charAt(0).toUpperCase() + tagname.slice(1)" style="margin: 0;"></Tag>
                </div>
            </li>
          </ul>
        </div>
      </Transition>
      <Transition name="fade1">
        <div id="tip2" v-if="IsLoading" style="display: flex; align-items: center;"><Loading :line-width="8" ringColor="rgba(var(--text-color), 0.5)" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
      </Transition>
     
      <Drawer :ctitle="showFilter ? ('筛选器') : ('下载 ' + activeItem.name) " :top_position="showFilter ? false : activeItem.gallery">
        <div v-if="!showFilter">
        <div id="drawer-content">
          <div id="background-image1" v-if="activeItem.gallery">
            <Carousel id="background_image" :images="activeItem.gallerys" :interval="5000"/>
            <div id="background_image" style="background: linear-gradient(180deg, rgba(var(--background-color), 0.8), transparent); position: absolute; top: 2px"></div>
          </div>
          <img :src="activeItem.icon" id="mod-icon" :class="{ gallery: activeItem.gallery }">
          <div style="padding: 0 5px;">
            <div id="banner-text">
              <div id="mod-name">{{ activeItem.name }}</div>
              <div id="desc1">{{ activeItem.desc }}</div>
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
            </div>
            <ModInfo :id="activeItem.id"></ModInfo>
          </div>
        </div>
        <RippleButton id="download-button"><img class="icon" src="../assets/download.svg" style="margin-right: 10px;">开始下载</RippleButton>
      </div>
      <div v-if="showFilter">
        <RippleButton>
          <div style="width: 100%; height: 24px; display: flex;">
            <div id="icon" style="width: 24px; height: 24px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            </div>
            <div>Adventure</div>
            
          </div>
        </RippleButton>
      </div>
      </Drawer>
      
      <Transition name="fade1">
        <div v-if="isLoadingFailed" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <Card icon="offline.svg" title="加载失败" content="可能是网络有问题" @click="fetchVersions"></Card>
        </div>
      </Transition>
      <RippleButton id="filter-button" @click="onFilterButtonClicked"><img class="icon" src="../assets/filter.svg"></RippleButton>
    </div>
    
</template>

<script setup>
import { ref, onMounted, inject, getCurrentInstance, watch, nextTick, onUnmounted } from 'vue';
import ModInfo from '../components/ModInfo.vue';
const instance = getCurrentInstance();
let isDrawerOpen = instance.appContext.config.globalProperties.$IsDrawerOpen;
const activeItem = ref(-1);
const showFilter = ref(false);
const isLoadingFailed = ref(false);
const IsLoaded = ref(false);
const IsLoading = ref(true);
const currentPage = ref(0);
const items = ref({ });
const worker = new Worker(new URL('../scripts/packListWorker.js', import.meta.url));
const props = defineProps({
  currentTabID: {
    type: String
  }
})
const onFilterButtonClicked = () => {
  showFilter.value = true;
  isDrawerOpen.state = true;
}
const fetchVersions = () => {
  IsLoaded.value = false;
  IsLoading.value = true;
  isLoadingFailed.value = false;
  worker.postMessage({ currentTabID: props.currentTabID, page: currentPage.value });
  worker.onmessage = (event) => {
    if (event.data.error) {
      console.error('Error fetching versions:', event.data.error);
      isLoadingFailed.value = true;
      IsLoading.value = false;
    } else {
      items.value = event.data.items;
      IsLoaded.value = true;
      IsLoading.value = false;
      nextTick(() => {
        const container = document.getElementById('listview');
        if (container.scrollHeight <= container.clientHeight) {
          nextPage();
          nextTick(() => {
              if (container.scrollHeight <= container.clientHeight) {
                nextPage();
              }
          })
        }
      });
    }
    
  };
};

onMounted(() => {
  fetchVersions()
  window.addEventListener('resize', handleResize)
  document.getElementById('ver-list').addEventListener('scroll', console.log('shenbi'))
});
const nextPage = () => {
    IsLoading.value = true;
    currentPage.value++;
    worker.postMessage({ currentTabID: props.currentTabID , page: currentPage.value });
    worker.onmessage = (event) => {
    if (event.data.error) {
      console.error('Error fetching versions:', event.data.error);
    } else {
      items.value = [...items.value, ...event.data.items];
      IsLoading.value = false;
    }
  }
}
const handleScroll = (event) => {
  const container = event.target;
  if ((container.scrollTop + container.clientHeight + 20 >= container.scrollHeight)) {
    if (IsLoading.value) {
      return;
    }
    nextPage();
}
};
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.getElementById('ver-list').addEventListener('scroll', console.log('shenbi'))
})
const handleResize = (() => {
  nextTick(() => {
    const el = ref(null);
    el.value = document.querySelectorAll('.item');
    if (el.value) {
      el.value.forEach((li, index) => {
        const rows = Math.ceil(li.clientHeight / 2) + 4;
        li.style.gridRowEnd = `span ${rows}`;
      });
    }
  });
})
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
    showFilter.value = false;
    isDrawerOpen.state = true;

};


watch(items, (newItems, oldItems) => {
  nextTick(() => {
    const el = ref(null);
    el.value = document.querySelectorAll('.item');
    if (el.value) {
      el.value.forEach((li, index) => {
        const rows = Math.ceil(li.clientHeight / 2) + 4;
        li.style.gridRowEnd = `span ${rows}`;
      });
    }
  });
}, { immediate: true, deep: true });
</script>

<style scoped>

#filter-button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
}
#background_image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
#background-image1 {
  width: 100%;
  padding-top: 2px;
}

#ver-list
{
    position: relative;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
  color: rgba(var(--text-color));
  font-size: 12px;
  position: relative;
  margin: 8px 10px;
  opacity: 0.5;
}
#detail-detail {
  position: relative;
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
  margin-top: 15px;
}


#desc1 {
  color: rgba(var(--text-color));
  line-height: 20px;
  font-size: 13px;
  opacity: 0.5;
  height: fit-content;
}
#mod-icon {
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 5px;
  position: relative;
}
#mod-icon.gallery {
  width: 60px;
  height: 60px;
  margin: 10px;
  border-radius: 5px;
  position: absolute;
  top: 190px;
  right: 5px;
}
#mask
{
    background-color: rgba(var(--background-color), 0.3);
    position: fixed;
    width: 100%;
    height: fit-content;
    border-radius: 5px 5px 0px 0px;
}
#background-image
{
    position: relative;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 5px 5px 0px 0px;
    object-fit: cover;
}
#background-image.gallery
{
  overflow: hidden;
  width: 100%;
  height: 160px;
}
#tags
{
    position: relative;
    padding: 15px;
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
  color: rgba(var(--text-color), 0.5);
  background-color: rgba(var(--background-color), 0.3);
  backdrop-filter: blur(20px);
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.6);
}
#ver-name
{
    position: relative;
    color: rgba(var(--text-color));
    font-weight: bold;
    font-size: 15px;
    bottom: 0px;
    width: fit-content;
}
#ver-name.gallery
{
  color: white;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
}
#desc
{
    color: rgba(var(--text-color), 0.5);
    top: 165px;
    width: calc(100% - 60px);
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; 
    overflow: hidden;
    text-overflow: ellipsis;
}
#desc.gallery
{
    color: rgba(255, 255, 255, 0.5);
    width: calc(100% - 35px);
    text-shadow: 0px 2px 8px rgba(0, 0, 0, 1);
}
#container
{
    left: 0px;
    top: 80px;
    position: relative;
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
  top: 10px;
}
#icon.gallery {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 130px;
}
#version-info {
    height: fit-content;
    position: absolute;
    left: 0px;
    width: 100%;
    padding: 10px;
}
ul {
  list-style-type: none;
  font-size: 12px; 
  display: grid;
  grid-auto-rows: 2px;
  gap: 0 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 修改了列的最小宽度 */
  align-items: start;
  justify-content: space-between;
  padding: 0 40px;
}

li {
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 5px;
  height: fit-content;
  position: relative;
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;
  background-color: rgba(var(--text-color), 0.1);
  border-radius: 5px;
  backdrop-filter: blur(0px);
  transition: top 0.2s ease, background-color 0.2s ease, background-filter 0.2s ease;
  overflow: hidden;
}

li:hover {
  background-color: rgba(var(--text-color), 0.2);
  top: 0px;
  backdrop-filter: blur(20px);
}

</style>