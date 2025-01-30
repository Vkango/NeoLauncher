<template>
  <ul>
    <RippleButton id="RippleButton" v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
      <span v-if="item.clickable" id="icon_container">
        <img class="icon" :src="getIconPath(item.icon)" id="icon">
      </span>
      {{ item.text }}
    </RippleButton>
  </ul>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['changePage']);

const items = ref([
  { text: '首页', clickable: false },
  { id: 1, text: '开始游戏', clickable: true, icon: 'home.svg' },
  { id: 2, text: '库内容', clickable: true, icon: 'folder.svg' },
  { id: 3, text: '设置', clickable: true, icon: 'setting.svg' },
  { id: 0, text: '调教刑具', clickable: true, icon: 'set-up.svg' },
  { text: '创建', clickable: false },
  { id: 6, text: '新配置', clickable: true, icon: 'add.svg' },
  { id: 4, text: '游戏核心', clickable: true, icon: 'game.svg' },
  { id: 5, text: 'CurseForge & Modrinth', clickable: true, icon: 'download.svg' },
  { text: '插件', clickable: false },
  { id: 8, text: '游戏时间管理', clickable: true, icon: 'clock.svg' },
  { id: 9, text: '联机模块', clickable: true, icon: 'link.svg' },
]);
const activeItem = ref(1);

const handleClick = (item) => {
  if (item.clickable) {
    activeItem.value = item.id; 
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
  color: rgba(var(--text-color), 0.3);
  width: 100%;
  box-shadow: none;
  background-color: rgba(var(--background-color), 0);
  pointer-events: none;
  border-radius: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#RippleButton.clickable {
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;
  pointer-events: all;
  background-color: rgba(var(--background-color), 0);
}

#RippleButton.clickable:hover {
  background-color: rgba(var(--background-color), 0.05);
}
#RippleButton.active {
  background-color: rgba(var(--background-color), 0.1);
  color: rgba(var(--text-color));
  border-left: 2px solid rgba(var(--text-color));
  padding-left: 13px;
}
</style>