<template>
    <div id="mask" @click="emit('onClose');">
    </div>
    <div id="container" @click="emit('onClose');">
      <div id="login-container" @click.stop>
        <div id="title-bar">
          <RippleButton style="background-color: transparent; box-shadow: none;" @click="emit('onClose');"><img class="icon" src="../assets/back.svg"></RippleButton>
          <span>账户列表</span>
          <div id="add-user">
            <div style="padding-left: 10px; font-size: 12px; opacity: 0.5;">添加</div>
            <RippleButton id="add-user-btn">
              <div style="display: flex; align-items: center; gap: 10px">
                <img class="icon" src="../assets/done.svg">
                <span>正版</span>
              </div>
            </RippleButton>
            <RippleButton id="add-user-btn">            
              <div style="display: flex; align-items: center; gap: 10px">
                <img class="icon" src="../assets/offline.svg">
                <span>离线</span>
              </div>
            </RippleButton>
            <RippleButton id="add-user-btn">            
              <div style="display: flex; align-items: center; gap: 10px">
                <img class="icon" src="../assets/link.svg">
                <span>购买正版</span>
              </div>
            </RippleButton>
          </div>
        </div>

        <div id="accounts">
          <RippleButton id="account-btn" style="display: block; width: 180px;" v-for="item in accounts">
            <div id="account">
              <img id="avatar" src="../assets/avatar.png">
              <div id="user-name">{{ item.userName }}</div>
              <div id="email">{{ item.email }}</div>
            </div>
          </RippleButton>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
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
#account-btn {
  background-color: rgba(var(--text-color), 0.1);
  box-shadow: none;
}
#add-user-btn {
  padding: 3px;
  align-items: center;
  background-color: transparent;
  font-size: 12px;
  box-shadow: none;
}
#add-user-btn img {
  width: 13px;
  height: 13px;
}
#avatar {
  width: 30px;
  height: 30px;
}
#add-user {
  position: absolute;
  right: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
}
#accounts {
  display: flex;
  padding: 0 5px;
  gap: 10px;
  flex-wrap: wrap;
  overflow-y: auto;
  flex: 1;
}
#account-button {
  display: block;
  padding: 0;
  width: 100%;
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
#account {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
}
#user-name {
  font-size: 14px;
}
#email {
  opacity: 0.5;
  font-size: 12px;
}
#title-bar {
  display: flex;
  align-items: center;
  font-size: 12px;
}
#container {
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
#login-container {
  width: 400px;
  display: flex;
  flex-direction: column;
  height: 400px;
  backdrop-filter: blur(20px);
  background-color: rgba(var(--background-color), 00.5);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 10px 10px;
  border-radius: 5px;
}
</style>