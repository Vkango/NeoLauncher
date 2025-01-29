<template>
    <UIContainer>
      <div id="config-title">调教刑具</div>
      <div style="display: flex; gap: 5px; margin: 20px; flex-wrap: wrap;">
        <RippleButton @mousedown.stop @click="onclick1()">MessageBox</RippleButton>
        <RippleButton @mousedown.stop @click="onclick1()">Toast</RippleButton>
        <RippleButton @mousedown.stop @click="onclick3()">Notification</RippleButton>
        <RippleButton @mousedown.stop @click="onclick2()">切换主题喵</RippleButton>
      </div>
  </UIContainer>
</template>

<script setup>
import { ref, inject } from 'vue';
import Loading from '../components/Loading.vue';
import LoadingWithTip from '../components/Notification/LoadingWithTip.vue';
import ImageWithTip from '../components/Notification/ImageWithTip.vue';
const sendNotification = inject('sendNotification');
const showMessageBox = inject('messageBox');
const theme = ref(true);
const onclick1 = (() => {
  showMessageBox(
    "哦还有",
    Loading
  );
})
const onclick3 = (() => {
    sendNotification(
      '正在下载米米世界模组……',
      LoadingWithTip,
      { Tip: '你难道不知道我是玩米米世界的？' },
      3000)
    setTimeout(() => {
      sendNotification(
      '米米世界模组以下载完成',
      ImageWithTip,
      { showImage: 'https://res.9game.cn/community/forum/202106/25/095103z6lhssy7khhbapa7.jpg', Tip: '你难道不知道我是玩米米世界的？' },
      5000)
    }, 3000);
})
const onclick2 = (() => {
  // 修改反色逻辑
  console.log(theme.value)
  const root = document.documentElement;
  if (theme.value) {
    root.style.setProperty('--text-color', '0, 0, 0');
    root.style.setProperty('--background-color', '255, 255, 255');
    root.style.setProperty('--invert-percent', '100%');
  }
  else {
    root.style.setProperty('--text-color', '255, 255, 255');
    root.style.setProperty('--background-color', '0, 0, 0');
    root.style.setProperty('--invert-percent', '0%');
  }
  theme.value = !theme.value;
})
</script>

<style scoped>
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
  backdrop-filter: blur(20px);
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px -3px rgba(var(--background-color),0.6);
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
  display: inline-block;
  margin-left: 10px;
  top: -3px;
  cursor: default;
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