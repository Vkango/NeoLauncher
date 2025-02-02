<template>
  <UIContainer>
      <div id="banner">
          <div id="config-title">CurseForge & Modrinth</div>
          <div id="tags" style="">

              <Tag title="🔗 Modrinth"></Tag>
              <input placeholder="🔍 Search"></input>
          </div>
          <ul class="horizontal-list">
          <RippleButton id="RippleButton" v-for="item in items" :key="item.text" :class="{ active: item.id === currentTabID }" @click="handleClick(item)">
            <div style="display: flex; align-items: center; gap: 10px">
                <img class="icon" :src="getIconPath(item.icon)" id="icon">
                <span style="font-size: 12px;">{{ item.text }}</span>
              </div>
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
  { id: 0, text: '模组', clickable: true, icon: 'setting.svg'},
  { id: 1, text: '材质', clickable: true, icon: 'color.svg'},
  { id: 2, text: '光影', clickable: true, icon: 'light.svg'},
  { id: 3, text: '整合包', clickable: true, icon: 'liteloader.svg'}, 
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
  top: 120px;
  width: 100%;
  height: calc(100% - 120px);
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
  backdrop-filter: blur(var(--blur-value));
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