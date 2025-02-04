<template>
    <UIContainer>
      <RippleButton id="container" @click="launch">
        <div id="config-title">开始游戏</div>
        <div id="tags" @click.stop @mousedown.stop>
            <RippleButton id="RippleButton">▶ default</RippleButton>
            <RippleButton id="RippleButton">▶ 基岩版</RippleButton>
            <RippleButton id="RippleButton" class="launch-config-manage-button" @click="ToggleConfig"><div style="display: flex; align-content: center;"><img class="icon" src="../assets/add.svg"></div></RippleButton>
        </div>
        <div id="tip">🌸 已选择 2 个配置，可继续添加</div>
        <div id="tip2">🚀 点击页面任意空白处启动选定配置</div>
        <Transition name="fade">
          <ConfigSelect v-if="ToggleConfigSelect" @click.stop @mousedown.stop @blur.capture.native="ToggleConfig" tabindex="0"/>
        </Transition>
      </RippleButton>
  </UIContainer>
</template>

<script setup>
import { invoke } from '@tauri-apps/api/core';
import ConfigSelect from '../components/ConfigSelect.vue';
import { ref } from 'vue';
const ToggleConfigSelect = ref(false);
const ToggleConfig = () => {
    ToggleConfigSelect.value = !ToggleConfigSelect.value;
}
/*
const launch = async () => {
    try {
        const greeting = await invoke('greet', { name: 'liigo' });
        console.log(greeting);
    } catch (error) {
        console.error('调用命令时出错:', error);
    }
}*/
</script>

<style scoped>
.config-up-enter-active, .config-up-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.config-up-enter, .config-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.config-up-enter-active {
  animation: fadeInUp 0.2s;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
#tip {
  opacity: 0.5;
  margin-left: 30px;
  margin-top: 5px;
  font-size: 12px;
}
#tip2 {
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  color: rgba(var(--text-color), 0.5);
  background-color: rgba(var(--background-color), 0.3);
  backdrop-filter: blur(var(--blur-value));
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.6);
}
#config-title {
  color: rgba(var(--text-color));
  font-size: 24px;
  margin-left: 30px;
  position: relative;
  display: inline-block;
  margin-top: 40px;
  font-weight: bold;
}
#tags {
  position: relative;
  display: inline-flex;
  margin-left: 10px;
  top: -3px;
  cursor: default;
  gap: 5px;
}
#RippleButton {
  padding: 4px 7px;
  border-radius: 5px;
  color: rgba(var(--text-color));
  font-size: 12px;
  margin: 0px 3px;
  background-color: rgba(var(--text-color), 0.2);
  height: auto;
  align-items: center;
  box-shadow: none;
}
#RippleButton:hover {
  text-decoration: line-through;
}
#container
{
  left: 0px;
  top: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 0.2s ease;
  text-align: left;
  padding: 0;
}
#container:hover
{
  background-color: rgba(var(--text-color), 0.025);
}
</style>