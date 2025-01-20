<template>
  <div id="back_container">
      <div id="banner">
          <div id="config-title">浏览平台</div>
          <div id="tags">
              <Tag title="🔗 Modrinth"></Tag>
              <textarea placeholder="🔍 Search"></textarea>
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
      <div id="manage"><ModDownList></ModDownList></div>
      <!--<div id="drawer"><ModDownloadDrawer></ModDownloadDrawer></div>-->
  </div>
</template>

<script setup>
//https://api.modrinth.com/v2/search?limit=20&index=relevance&facets=%5B%5B%22project_type%3Amod%22%5D%5D&offset=0
import { ref } from 'vue';
import VersionList from './VersionList.vue';
import Tag from '../components/Tag.vue'
import ConfigDrawer from './DownloadDrawer.vue'
import ModDownloadDrawer from './ModDownloadDrawer.vue';
import ModDownList from './ModDownList.vue';

const items = ref([
  { id: 0, text: '模组', clickable: true, icon: 'setting.svg'},
  { id: 1, text: '材质', clickable: true, icon: 'color.svg'},
  { id: 2, text: '光影', clickable: true, icon: 'light.svg'},
  { id: 3, text: '整合包', clickable: true, icon: 'liteloader.svg'}, 
  ]);
const activeItem = ref(0);

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
textarea{
  position: absolute;
  height: 20px;
  border-radius: 5px;
  resize: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: left;
  color: white;
  font-size: 12px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
#manage {
  position: absolute;
  left: -10px;
  top: 120px;
  width: calc(100% + 10px);
  height: calc(100% - 120px);
  overflow-y: scroll;
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
  top: 40px;
}
#tags {
  position: relative;
  display: inline-block;
  left: 40px;
  top: 36px;
}
#banner {
  position: absolute;
  width: 100%;
  height: 120px;
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