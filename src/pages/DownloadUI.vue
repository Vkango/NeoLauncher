<template>
  <UIContainer>
      <div id="banner">
          <div id="config-title">下载游戏核心</div>
          <div id="tags">
              <Tag title="🔗 BUGJUMP"></Tag>
          </div>
          <ul class="horizontal-list">
          <RippleButton id="RippleButton" v-for="item in items" :key="item.id" :class="{ clickable: item.clickable, active: item.id === currentTabID }" @click="handleClick(item.id)">
            <div style="display: flex; align-items: center; gap: 10px">
                <img class="icon" :src="getIconPath(item.icon)" id="icon">
                <span style="font-size: 12px;">{{ item.text }}</span>
              </div>
          </RippleButton>
          </ul>
      </div>
      <div id="manage">
        <Transition name="fade" mode="in">
          <VersionList :key="currentTabID" :currentTabID="currentTabID" />
        </Transition>
      </div>
  </UIContainer>

</template>

<script setup>

import { ref } from 'vue';
import VersionList from './VersionList.vue';


const items = ref([
  { id: 0, text: '稳定版', clickable: true, icon: 'home.svg' },
  { id: 1, text: '快照版', clickable: true, icon: 'camera.svg' },
  { id: 2, text: 'Beta版', clickable: true, icon: 'beta.svg' },
  { id: 3, text: 'Alpha版', clickable: true, icon: 'bug.svg' },
  { id: 4, text: '基岩版', clickable: true, icon: 'light.svg'},   
  ]);
const currentTabID = ref(0);

const handleClick = (id) => {
  currentTabID.value = id;
  console.log(currentTabID.value);
};
const getIconPath = (icon) => {
  return new URL(`../assets/${icon}`, import.meta.url).href;
};

</script>

<style scoped>

#drawer-mask
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--background-color), 0.5);
  display: flex;
  justify-content: flex-end;
}
#manage {
  position: absolute;
  left: 0px;
  top: 120px;
  width: 100%;
  height: calc(100% - 120px);
}
.horizontal-list {
display: flex;
list-style-type: none;
position: absolute;
left: 30px;
bottom: -12px;
}
#config-title {
  color: rgba(var(--text-color));
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
  background-color: rgba(var(--background-color), 0.3);
  backdrop-filter: blur(20px);
}
#icon {
  width: 16px;
  height: 16px;
  position: relative;
}
ul {
  list-style-type: none;
  padding: 0;
  font-size: 12px;
}
#RippleButton {
  padding: 10px 0px;
  margin-right: 30px;
  color: rgba(var(--text-color), 0.3);
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  transition: opacity 0.2s ease;
}

#RippleButton.clickable {
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;

}
#RippleButton.clickable:hover {
  opacity: 0.5;
}
#RippleButton.active {
  color: rgba(var(--text-color));
  border-bottom: 2px solid rgba(var(--text-color));
  font-weight: bold;
}
#config-title
{
  font-weight: bold;
}

</style>