<template>
  <Transition name="mask" mode="out-in" appear leave>
    <div id="mask" v-if="!isClosed" @click="closeEvent">
    </div>
  </Transition>
  <Transition name="mask1" mode="out-in" appear leave>
    <div v-if="!isClosed" id="container" @click="closeEvent">
      <div id="search-result" @click.stop>
        <SearchResult id="result-content"></SearchResult>
      </div>
      <div v-if="!isClosed" id="searchbar-container" @click.stop>
        <div id="title-bar">
          <RippleButton style="background-color: transparent; box-shadow: none;" @click="closeEvent"><img src="../assets/chevronup.svg"></RippleButton>
          <span style="color: white">键入关键词后请按下回车键开始查找</span>
        </div>
        <input type="text" placeholder="搜索：库内容、设置、游戏核心、CurseForge & Modrinth、插件……">
      </div>

    </div>
  </Transition>

</template>
<script setup>
import { ref } from 'vue'
import SearchResult from './SearchResult.vue';
const emit = defineEmits(['onClose']);
const isClosed = ref(false);
const closeEvent = () => {
  isClosed.value = true;
  setTimeout(() => {
    emit('onClose');    
  }, 300);

}
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

.mask1-enter-active,
.mask1-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;

}

.mask1-enter-from,
.mask1-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
#mask
{
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: opacity 0.5s ease;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
input {
  position: relative;
  height: 25px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 20px 5px;
  border-radius: 5px;
  border: none;
  width: calc(100% - 30px);
  backdrop-filter: blur(var(--blur-value));
  background-color: rgba(var(--background-color), 0.5);
  padding: 10px 15px;
  color: rgba(var(--text-color), 1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
input::placeholder {
  color: rgba(var(--text-color), 0.3)
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
  z-index: 2;
}
#searchbar-container {
  width: 75%;
  height: fit-content;
  border-radius: 5px;
  align-self: center;
}
#search-result {
  flex: 1;
  width: 75%;
  align-self: center;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>