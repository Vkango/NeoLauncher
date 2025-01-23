<template>
<Transition name="drawer" mode="in">
    <div id="drawer-mask" v-if="isDrawerOpen.state">
    </div>
  </Transition>
  <Transition name="drawer1" mode="in">
    <div id="drawer-container" v-if="isDrawerOpen.state" @click="closeDrawer">
        <div id="config-drawer" @click.stop>
            <div id="line"></div>
            <div id="control">
                <img src="../assets/back.svg" id="back" @click="closeDrawer">
                <span id="drawer-title">下载 {{ 1.21 }}</span>
            </div>
            <div id="detail" @click.stop style="overflow-y: scroll;">
                <slot></slot>
            </div>
        </div>

    </div>
  </Transition> 
</template>
<script setup>
import { getCurrentInstance } from 'vue';
let isDrawerOpen = getCurrentInstance().appContext.config.globalProperties.$IsDrawerOpen;
console.log("is_drawer_open", isDrawerOpen.state);
const closeDrawer = () => {
  isDrawerOpen.state = false;
};
</script>
<style>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
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
#config-drawer {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  width: 400px;
  background-color: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(20px);
  box-shadow: 0px 10px 60px 30px rgba(0,0,0,0.8);

}
#line {
  left: 0px;
  top: 0px;
  height: 2px;
  width: 100%;
  background-color: rgba(124, 162, 64, 0.5);
}
#detail {
    height: calc(100% - 50px);
    padding: 0 5px;
}
#back {

  padding: 15px;
}
#drawer-title {
  left: 50px;
  top: 16px;
  position: absolute;
  width: calc(100% - 47px);
  color: white;
  font-size: 12px;
}
#drawer-container
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 3;
}
#drawer-mask
{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
}

</style>