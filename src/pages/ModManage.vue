<template>
    <div id="title">目录下共 1 个Mod，已载入 1 个。</div>
    <div id="mod-list">
        <ul>
        <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
            <span v-if="item.clickable" id="icon_container">
            <img :src="getIconPath(item.icon)" id="icon">
            </span>
            <div id="mod-info">
                <div id="mod-name">{{ item.name }}</div>
                <div id="mod-desc"> - {{ item.desc }}</div>
                <Tag id="load-status" v-if="item.loaded" title="已加载"></Tag>
                <Tag id="load-status" v-if="!item.loaded" title="未加载" bgColor="rgba(255,0,0,0.5)"></Tag>
                <div id="tags">
                    <Tag v-for="tagname in item.tags" :title="tagname"></Tag>
                </div>
            </div>

        </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Tag from '../components/Tag.vue';
const items = ref([
    { id: 1, name: 'WorldEdit', desc: '[创世神] worldedit-mod-7.2.10', clickable: true, icon: 'worldedit.png', loaded: true, tags: ['Fabric', '英语', '7.2.10 1742f98'] },
    { id: 2, name: 'WorldEdit', desc: '[创世神] worldedit-mod-7.2.10', clickable: true, icon: 'worldedit.png', loaded: false, tags: ['Fabric', '英语', '7.2.10 1742f98'] },
    { id: 3, name: 'WorldEdit', desc: '[创世神] worldedit-mod-7.2.10', clickable: true, icon: 'worldedit.png', loaded: true, tags: ['Fabric', '英语', '7.2.10 1742f98'] },
    { id: 4, name: 'WorldEdit', desc: '[创世神] worldedit-mod-7.2.10', clickable: true, icon: 'worldedit.png', loaded: true, tags: ['Fabric', '英语', '7.2.10 1742f98'] },
    { id: 5, name: 'WorldEdit', desc: '[创世神] worldedit-mod-7.2.10', clickable: true, icon: 'worldedit.png', loaded: true, tags: ['Fabric', '英语', '7.2.10 1742f98'] },
    ]);
const activeItem = ref(0);// 默认是首页

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
#mod-info
{
    position: absolute;
    width: 100%;
}
#load-status
{
    position: absolute;
    right: 0px;
}
#tags
{
    margin-top: 9px;
}
#mod-name
{
    font-size: 15px;
    display: inline-block;
}
#mod-desc
{
    font-size: 15px;
    opacity: 0.5;
    display: inline-block;
}
#mod-list
{
    position: absolute;
    left: 0px;
    top: 20px;
    width: 100%;
    height: calc(100% - 20px);
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
  position: relative;
}
#mod-info {
    left: 0px;
    height: auto;
    position: relative;
    top: 0px;
}
ul {
  list-style-type: none;
  padding: 0;
  font-size: 12px;
}

li {
  padding: 10px 15px;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  position: relative;
}

li.clickable {
  cursor: pointer;
  color: white;
  font-size: 12px;

}

li.clickable:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
li.active {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border-left: 2px solid white;
  padding-left: 13px;
}
</style>