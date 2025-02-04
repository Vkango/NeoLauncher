<template>
    <UIContainer>
      <div id="config-title">调教刑具</div>
      <div style="display: flex; gap: 5px; margin: 20px; flex-wrap: wrap;">
        <RippleButton @mousedown.stop @click="onclick1()">MessageBox</RippleButton>
        <RippleButton @mousedown.stop @click="onclick1()">Toast</RippleButton>
        <RippleButton @mousedown.stop @click="onclick3()">Notification</RippleButton>
        <RippleButton @mousedown.stop @click="onclick2()">切换主题喵</RippleButton>
        <RippleButton @mousedown.stop @click="onclick4()">OpenLoginAction</RippleButton>
      </div>
  </UIContainer>
</template>

<script setup>
import { ref, inject, defineEmits } from 'vue';
import Loading from '../components/Loading.vue';
import LoadingWithTip from '../components/Notification/LoadingWithTip.vue';
import ImageWithTip from '../components/Notification/ImageWithTip.vue';
import { webviewWindow } from '@tauri-apps/api';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { listen } from '@tauri-apps/api/event';
const sendNotification = inject('sendNotification');
const showMessageBox = inject('messageBox');
const theme = ref(true);
const emit = defineEmits('onLoginAction');
const onclick4 = async () => {
  sendNotification(
      '即将进行微软登录...',
      LoadingWithTip,
      { Tip: '3秒后弹出窗口，请在弹出的窗口中继续操作...' },
      3000)
    setTimeout(async () => {
      const webview = new WebviewWindow("login-window", {
        url: "https://www.baidu.com", 
        width: 800,
        height: 600,
        resizable: true,
        title: "登录到 Minecraft",
        incognito: true
      });

      webview.once("tauri://created", () => {
        console.log("登录窗口已成功创建");
      });

      const unlistenCloseRequested = await WebviewWindow.getCurrent().listen('tauri://close-requested', (event) => {
      if (event.payload.label === 'login-window') {
        console.log('登录窗口关闭请求已触发');
        sendNotification(
          '正在进行微软登录...',
          LoadingWithTip,
          { Tip: '正在进行登录验证...' },
          3000
        );
        // 确保窗口可以被关闭
        webview.close();
      }
    });

    // 监听窗口关闭事件
    const unlistenClosed = await WebviewWindow.getCurrent().listen('tauri://destroyed', (event) => {
      if (event.payload.label === 'login-window') {
        console.log('登录窗口已关闭');
        sendNotification(
          '正在进行微软登录...',
          LoadingWithTip,
          { Tip: '登录窗口已关闭' },
          3000
        );
        // 取消事件监听
        unlistenCloseRequested();
      }
    });

    // 监听地址变化事件
    const unlistenUrlChange = await WebviewWindow.getCurrent().listen('tauri://url-changed', (event) => {
      const newUrl = event.payload;
      console.log('地址已更改:', newUrl);
      if (newUrl.includes('https://login.live.com/oauth20_desktop.srf')) {
        console.log('用户已跳转到目标页面，可以执行后续操作');
        // 例如关闭窗口
        webview.close();
      }
    });

    // 在窗口关闭时取消监听事件
    webview.once('tauri://destroyed', () => {
      console.log('onclose');
      unlistenCloseRequested();
      unlistenClosed();
      unlistenUrlChange();
    });
    }, 3000);
}
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
    root.style.setProperty('--background-src',"url('/src/assets/background-light.jpg')");
  }
  else {
    root.style.setProperty('--text-color', '255, 255, 255');
    root.style.setProperty('--background-color', '0, 0, 0');
    root.style.setProperty('--invert-percent', '0%');
    root.style.setProperty('--background-src',"url('/src/assets/background-dark.jpg')");
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
  backdrop-filter: blur(var(--blur-value));
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