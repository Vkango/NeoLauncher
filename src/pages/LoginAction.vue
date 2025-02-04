<template>
  <Transition name="mask" mode="out-in" appear leave>
    <div id="mask" v-if="!isClosed" @click="closeEvent">
    </div>
  </Transition>
  <Transition name="mask1" mode="out-in" appear leave>
    <div v-if="!isClosed" id="container" @click="closeEvent">
      <div v-if="!isClosed" id="searchbar-container" @click.stop>
        <div id="title-bar">
          <RippleButton style="background-color: transparent; box-shadow: none;" @click="closeEvent"><img src="../assets/chevronup.svg"></RippleButton>
          <span style="color: white">微软登录</span>
        </div>
        <Tip title="页面可能因网络问题无法加载，可单击此处在默认浏览器内访问。"/>
      </div>

    </div>
  </Transition>

</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import LoadingWithTip from '../components/Notification/LoadingWithTip.vue';
import ImageWithTip from '../components/Notification/ImageWithTip.vue';
import Tip from '../components/Tip.vue';
const emit = defineEmits(['onClose']);
const sendNotification = inject('sendNotification');
const isClosed = ref(false);
const closeEvent = () => {
  isClosed.value = true;
  setTimeout(() => {
    emit('onClose');    
  }, 300);

}
onMounted(() => {
  sendNotification(
      '正在加载微软登录页面...',
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
    
    const webview = new WebviewWindow("login-window", {
        url: "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=00000000402b5328&response_type=code&redirect_uri=https:%2F%2Flogin.live.com%2Foauth20_desktop.srf&response_mode=query&scope=service%3A%3Auser.auth.xboxlive.com%3A%3AMBI_SSL", 
        width: 800,
        height: 600,
        resizable: true,
        title: "登录到 Minecraft",
      });

      webview.once("tauri://created", () => {
        console.log("登录窗口已成功创建");
      });

      webview.once("tauri://error", (e) => {
        console.error("创建登录窗口时发生错误:", e);
      });
})
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