<template>
<Transition name="drawer" mode="out-in">
    <div id="drawer-mask" v-if="isDrawerOpen.state">
    </div>
  </Transition>
  <Transition name="drawer1" mode="out-in">
    <div id="drawer-container" v-if="isDrawerOpen.state" @click="closeDrawer">
        <div id="config-drawer" @click.stop :style="{ width: props.width }">
            <div id="detail" @click.stop :style="{ top: top_position ? '0px' : '40px', height: top_position ? '100%' : 'calc(100% - 40px)'}">
                <slot></slot>
            </div>
            <div id="line"></div>
            <div id="control">
                <RippleButton style="padding: 0; box-shadow: none; background-color: transparent; border-radius: 0;"><img class="icon" src="../assets/back.svg" id="back" @click="closeDrawer"></RippleButton>
                <span id="drawer-title">{{ ctitle }}</span>
            </div>
        </div>

    </div>
  </Transition> 
</template>
<script setup>
import { getCurrentInstance, defineProps } from 'vue';
let isDrawerOpen = getCurrentInstance().appContext.config.globalProperties.$IsDrawerOpen;
const closeDrawer = () => {
  isDrawerOpen.state = false;
};
const props = defineProps({
  ctitle: {
    type: String,
    required: true
  },
  top_position: {
    type: Boolean,
    required: false,
    default: false
  },
  width: {
    type: String,
    required: false,
    default: '400px',
  }
});
</script>
<style scoped>
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
  background-color: rgba(var(--background-color), 0.5);
  backdrop-filter: blur(var(--blur-value));
  box-shadow: 0px 10px 60px 30px rgba(0, 0, 0, 0.4);

}
#line {
  left: 0px;
  top: 0px;
  height: 2px;
  width: 100%;
  background-color: rgba(124, 162, 64, 0.5);
}
#detail {
  position: absolute;
  overflow-y: auto;
  width: 100%;
}
#back {

  padding: 15px;
}
#drawer-title {
  left: 45px;
  top: 16px;
  position: absolute;
  width: calc(100% - 47px);
  color: rgba(var(--text-color));
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
  z-index: 2;
}

</style>