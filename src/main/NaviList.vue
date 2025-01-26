<template>
  <ul>
    <RippleButton id="RippleButton" v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
      <span v-if="item.clickable" id="icon_container">
        <img :src="getIconPath(item.icon)" id="icon">
      </span>
      {{ item.text }}
    </RippleButton>
  </ul>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['changePage']);

const items = ref([
  { text: '开始', clickable: false },
  { id: 1, text: '启动', clickable: true, icon: 'home.svg' },
  { id: 2, text: '设置', clickable: true, icon: 'setting.svg' },
  { id: 0, text: '调教刑具', clickable: true, icon: 'set-up.svg' },
  { text: '下载', clickable: false },
  { id: 3, text: '游戏', clickable: true, icon: 'game.svg' },
  { id: 4, text: '浏览平台', clickable: true, icon: 'download.svg' },

  { text: '配置列表', clickable: false },
  { id: 5, text: '创建新配置', clickable: true, icon: 'add.svg' },
  { id: 6, text: 'default', clickable: true, icon: 'run.svg' },
]);
const activeItem = ref(1);

const handleClick = (item) => {
  if (item.clickable) {
    activeItem.value = item.id; 
    console.log("chanpage", item.id);
    emit('changePage', item.id);
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

#RippleButton {
  padding: 10px 15px;
  color: rgba(255, 255, 255, 0.3);
  width: 100%;
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
  border-radius: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#RippleButton.clickable {
  cursor: pointer;
  color: white;
  font-size: 12px;
  pointer-events: all;
  background-color: rgba(0, 0, 0, 0);
}

#RippleButton.clickable:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
#RippleButton.active {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  border-left: 2px solid white;
  padding-left: 13px;
}
</style>