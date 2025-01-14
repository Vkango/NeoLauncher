<template>
  <div id="back_container">
      <div id="banner">
          <div id="config-title">下载游戏核心</div>
          <div id="tags">
              <Tag title="🔗 BUGJUMP"></Tag>
          </div>
          <ul class="horizontal-list">
          <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
              <span v-if="item.clickable" id="icon_container">
              <img :src="getIconPath(item.icon)" id="icon">
              </span>
              {{ item.text }}
          </li>
          </ul>
      </div>
      <div id="manage"><VersionList></VersionList></div>
      <!--<div id="drawer"><ConfigDrawer></ConfigDrawer></div>-->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VersionList from './VersionList.vue';
import Tag from './Tag.vue'
import ConfigDrawer from './DownloadDrawer.vue'
const items = ref([
  { id: 1, text: '稳定版', clickable: true, icon: 'home.svg' },
  { id: 2, text: '快照版', clickable: true, icon: 'camera.svg' },
  { id: 3, text: 'Beta版', clickable: true, icon: 'beta.svg' },
  { id: 4, text: 'Alpha版', clickable: true, icon: 'bug.svg' },
  { id: 5, text: '申必版', clickable: true, icon: 'light.svg'},   
  ]);
const activeItem = ref(1);// 默认是首页

const handleClick = (item) => {
if (item.clickable) {
  activeItem.value = item.id; 
}
};
const getIconPath = (icon) => {
  return new URL(`../assets/${icon}`, import.meta.url).href;
};

</script>

<style scoped>
#manage {
  position: absolute;
  left: 0px;
  top: 100px;
  width: 100%;
  height: calc(100% - 100px);
}
.horizontal-list {
display: flex;
list-style-type: none;
position: absolute;
left: 30px;
bottom: -12px;
}
#icon_container {
  margin-right: 30px;

}
#config-title {
  color: white;
  font-size: 24px;
  left: 30px;
  position: relative;
  display: inline-block;
  top: 20px;
}
#tags {
  position: relative;
  display: inline-block;
  left: 40px;
  top: 16px;
}
#banner {
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
}
#icon {
  width: 16px;
  height: 16px;
  position: absolute;
}
ul {
  list-style-type: none;
  padding: 0;
  font-size: 12px;
}

li {
  padding: 10px 0px;
  margin-right: 30px;
  color: rgba(255, 255, 255, 0.3);
}

li.clickable {
  cursor: pointer;
  color: white;
  font-size: 12px;

}

li.clickable:hover {
  opacity: 0.5;
}
li.active {
  color: white;
  border-bottom: 2px solid white;
  font-weight: bold;
}
#config-title
{
  font-weight: bold;
}
#back_container
{
  left: 225px;
  top: 0px;
  position: absolute;
  width: calc(100% - 225px);
  height: 100%;
}
</style>