<template>
    <div id="ver-list">
        <ul>
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tag from './Tag.vue';
import { useDrawerStore } from '../stores/drawerStore';



const items = ref([
    { id: 0, clickable: false, name: '1.21.x', tags: ['🚀 1.21.4', '💕 最新版本'] },
    { id: 1, clickable: true, name: '1.21.4', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.21.3', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.21.2', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.21.1', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.21', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 0, clickable: false, name: '1.20.x', tags: ['🚀 1.20.6'] },
    { id: 1, clickable: true, name: '1.20.6', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.20.5', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.20.4', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.20.3', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.20.2', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.20.1', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.20', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },

    { id: 0, clickable: false, name: '1.19.x', tags: ['🚀 1.19.2'] },
    { id: 1, clickable: true, name: '1.19.2', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.19.1', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },
    { id: 1, clickable: true, name: '1.19', icon: 'minecraft.png', tags: ['2024/12/03 18:02'] },

]);
const activeItem = ref(-1);
const drawerStore = useDrawerStore();

const handleClick = (item) => {
if (item.clickable) {
    activeItem.value = item.id; 
    drawerStore.openDrawer();
}
};
const getIconPath = (icon) => {
    return new URL(`../assets/${icon}`, import.meta.url).href;
};

</script>

<style scoped>
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
#title {
    color: white;
    opacity: 0.5;
    font-size: 10px;
    left: 30px;
    position: absolute;
    top: 10px
}
#banner {
    position: absolute;
    width: 100%;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
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
  margin-left: 10px;
  margin-right: 14px;
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
  padding: 10px 15px;
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