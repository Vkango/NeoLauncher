<template>
  <ul>
    <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
      <span v-if="item.clickable" id="icon_container">
        <img :src="getIconPath(item.icon)" id="icon">
      </span>
      {{ item.text }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const items = ref([
  { text: '开始', clickable: false },
  { id: 1, text: '首页', clickable: true, icon: 'home.svg' },
  { text: '导航', clickable: false },
  { id: 2, text: '游戏', clickable: true, icon: 'game.svg' },
  { id: 3, text: '联机', clickable: true, icon: 'live.svg' },
  { id: 4, text: '模组下载', clickable: true, icon: 'download.svg' },
  { id: 5, text: '材质包', clickable: true, icon: 'color.svg'},
  { text: '配置列表', clickable: false },
  { id: 6, text: 'default', clickable: true, icon: 'run.svg' },
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
#icon_container {
  margin-right: 30px;

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
  padding: 10px 15px;
  color: rgba(255, 255, 255, 0.3);
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