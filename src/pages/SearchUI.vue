<template>
  <Transition name="mask" mode="out-in">
    <div id="mask" @click="emit('onClose');">
    </div>
  </Transition>

    <div id="container" @click="emit('onClose');">
      <div id="search-result" @click.stop>
        <SearchResult id="result-content"></SearchResult>
      </div>
      <Transition name="mask" mode="out-in">
      <div id="searchbar-container" @click.stop>
        <div id="title-bar">
          <RippleButton style="background-color: transparent; box-shadow: none;" @click="emit('onClose');"><img class="icon" src="../assets/chevronup.svg"></RippleButton>
          <span>键入关键词后请按下回车键开始查找</span>
        </div>
        <input type="text" placeholder="搜索：库内容、设置、游戏核心、CurseForge & Modrinth、插件……">
      </div>
    </Transition>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import SearchResult from './SearchResult.vue';
const emit = defineEmits(['onClose']);

const accounts = ref([
  { userName: 'Vkango', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango21', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango1', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango1', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango1', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango1', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
  { userName: 'Vkango1', avatar: 'avatar.png', email: 'hivkan@outlook.com' },
])
</script>
<style scoped>
.mask-enter-active,
.mask-leave-active {
  transition: opacity 0.2s ease;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.drawer1-enter-active,
.drawer1-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;

}

.drawer1-enter-from,
.drawer1-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
#mask
{
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}
input {
  position: relative;
  height: 30px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 20px 5px;
  border-radius: 5px;
  border: none;
  width: calc(100% - 20px);
  backdrop-filter: blur(20px);
  background-color: rgba(var(--text-color), 0.1);
  padding: 10px;
  color: rgba(var(--text-color), 1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
input::placeholder {
  color: rgba(var(--text-color), 0.2)
}
#title-bar {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 20px;
}
#container {
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
}
#searchbar-container {
  width: 60%;
  height: fit-content;
  border-radius: 5px;
  align-self: center;
}
#search-result {
  flex: 1;
  width: 60%;
  align-self: center;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>