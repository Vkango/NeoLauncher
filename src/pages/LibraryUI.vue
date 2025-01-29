<template>
  <UIContainer>
      <div id="banner">
          <div id="config-title">库内容</div>
          <div id="tip">📂 查看和管理本地内容，支持拖放导入</div>
          <ul class="horizontal-list">
          <RippleButton id="RippleButton" v-for="item in items" :key="item.text" :class="{ active: item.id === currentTabID }" @click="handleClick(item)">
              <span id="icon_container">
              <img class="icon" :src="getIconPath(item.icon)" id="icon">
              </span>
              {{ item.text }}
          </RippleButton>
          </ul>
      </div>
      <div id="manage">
        <Transition name="fade" mode="in">
          <PackDownList :key="currentTabID" :currentTabID="currentTabID" />
        </Transition>
      </div>
      <!--<ComboBox :options="options" style="position: absolute; right: 0px; z-index: 1"/>-->
      
  </UIContainer>
</template>

<script setup>
import { ref } from 'vue';
import PackDownList from './PackDownList.vue';
const options = ref([
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
]);
const currentTabID = ref(0);
const items = ref([
  { id: 0, text: '配置', clickable: true, icon: 'run.svg'}, 
  { id: 1, text: '游戏核心', clickable: true, icon: 'game.svg'},
  { id: 2, text: '模组', clickable: true, icon: 'setting.svg'},
  { id: 3, text: '材质', clickable: true, icon: 'color.svg'},
  { id: 4, text: '光影', clickable: true, icon: 'light.svg'},
  { id: 5, text: '整合包', clickable: true, icon: 'liteloader.svg'}, 
  { id: 6, text: '世界存档', clickable: true, icon: 'world.svg'}, 
  { id: 7, text: '启动器插件', clickable: true, icon: 'plugin.svg'}, 
  ]);

const handleClick = (item) => {
if (item.clickable) {
  currentTabID.value = item.id; 
}
};
const getIconPath = (icon) => {
  return new URL(`../assets/${icon}`, import.meta.url).href;
};

</script>

<style scoped>
#tip {
  opacity: 0.5;
  margin-left: 30px;
  margin-top: 5px;
  font-size: 12px;
}
input{
  position: absolute;
  border-radius: 5px;
  resize: none;
  padding: 4px 7px;
  border: none;
  background-color: rgba(var(--text-color), 0.1);
  height: fit-content;
  color: rgba(var(--text-color));
  font-size: 12px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
input::placeholder {
  color: rgba(var(--text-color), 0.5);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.fade-enter-active {
  animation: fadeInLeft 0.2s;
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
#RippleButton {
  padding: 10px 0px;
  margin-right: 30px;

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
textarea{
  position: absolute;
  height: 20px;
  border-radius: 5px;
  resize: none;
  border: none;
  background-color: rgba(var(--text-color), 0.1);
  text-align: left;
  color: rgba(var(--text-color));
  font-size: 12px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
#manage {
  position: absolute;
  top: 140px;
  width: 100%;
  height: calc(100% - 140px);
  overflow-y: auto;
  overflow-x: hidden;
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
  color: rgba(var(--text-color));
  font-size: 24px;
  left: 30px;
  position: relative;
  display: inline-block;
  margin-top: 40px;
}
#banner {
  position: absolute;
  width: 100%;
  height: 140px;
  background-color: rgba(var(--background-color), 0.3);
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
  color: rgba(var(--text-color), 0.3);
  cursor: pointer;
  color: rgba(var(--text-color));
  font-size: 12px;
}

li:hover {
  opacity: 0.5;
}
li.active {
  color: rgba(var(--text-color));
  border-bottom: 2px solid rgba(var(--text-color));
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