<template>
    <div id="back_container">
        <div id="banner">
            <div id="config-title">default</div>
            <div id="tags">
                <Tag title="最近启动"></Tag>
                <Tag title="1.16.5"></Tag>
                <Tag title="Fabric"></Tag>
                <Tag title="Java 16 x64"></Tag>
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
        <div id="manage"><ModManage></ModManage></div>
        <!--<div id="drawer"><ConfigDrawer></ConfigDrawer></div>-->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ModManage from './ModManage.vue';
import Tag from '../components/Tag.vue'
import ConfigDrawer from './ConfigDrawer.vue'
const items = ref([
    { id: 1, text: '摘要', clickable: true, icon: 'home.svg' },
    { id: 2, text: '安装', clickable: true, icon: 'setting.svg' },
    { id: 3, text: '模组', clickable: true, icon: 'download.svg' },
    { id: 4, text: '材质', clickable: true, icon: 'color.svg' },
    { id: 5, text: '光影', clickable: true, icon: 'light.svg'},   
    { id: 6, text: '世界存档', clickable: true, icon: 'world.svg'},   
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