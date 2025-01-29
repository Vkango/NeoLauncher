<template>
  <Transition name="msgbox" mode="in">
      <div id="msgbox-mask" v-if="isMessageBoxOpen">
      </div>
    </Transition>
    <Transition name="msgbox1" mode="in">
      <div id="msgbox-container" v-if="isMessageBoxOpen" @click="closeMessageBox">
          <div id="msgbox-content" @click.stop>
              <div id="line"></div>
              <div id="control">
                  
                  <span id="msgbox-title">{{ messageBoxTitle }}</span>
                  <RippleButton style="position: absolute; padding: 0; box-shadow: none; background-color: transparent; border-radius: 0; right: 0px; top: 0px"><img src="../assets/close.svg" id="back" @click="closeMessageBox"></RippleButton>
                  <!--无法使用插槽-->
                  <component style="margin-top: 60px;" :is="messageBoxComponent" v-bind="messageBoxComponentProps"></component>
                  <div id="control-buttons">
                    <RippleButton id="RippleButton">确定</RippleButton>
                    <RippleButton id="RippleButton">取消</RippleButton>
                  </div>

              </div>
          </div>
  
      </div>
    </Transition> 
  </template>
  <script setup>
  import { ref, defineExpose } from 'vue';
  const isMessageBoxOpen = ref(false);
  const messageBoxTitle = ref('');
  const messageBoxComponent = ref();
  const messageBoxComponentProps = ref( {} );
  const showMessageBox = (title, component, props) => {
    isMessageBoxOpen.value = true;
    messageBoxTitle.value = title;
    messageBoxComponent.value = component;
    messageBoxComponentProps.value = props;
  };
  const closeMessageBox = () => {
    isMessageBoxOpen.value = false;
    messageBoxTitle.value = "";
    messageBoxComponent.value = null;
    messageBoxComponentProps.value = {};
  }
  defineProps({
    color: {
      type: String,
      required: true
    },
  });

  defineExpose({
    showMessageBox
  })
  </script>
  <style scoped>
  .msgbox-enter-active,
  .msgbox-leave-active {
    transition: opacity 0.2s ease;
  }
  
  .msgbox-enter-from,
  .msgbox-leave-to {
    opacity: 0;
  }
  
  .msgbox1-enter-active,
  .msgbox1-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  
  }
  
  .msgbox1-enter-from,
  .msgbox1-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  #msgbox-content {
    height: fit-content;
    min-width: 300px;
    background-color: rgba(30, 30, 30, 0.5);
    backdrop-filter: blur(20px);
    box-shadow: 0px 10px 30px 0px rgba(var(--background-color),0.8);
  
  }
  #control-buttons {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    flex: 1 1 auto;
    margin-top: 10px;
  }
  #RippleButton {
    flex: 1;
    box-sizing: border-box;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    border-top: 1px solid rgba(var(--text-color), 0.03);
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
  #msgbox-title {
    left: 16px;
    top: 16px;
    position: absolute;
    width: calc(100% - 47px);
    color: rgba(var(--text-color));
    font-size: 13px;
    font-weight: bold;

  }
  #msgbox-container
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: 3;
    padding: 20px;
  }
  #msgbox-mask
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--background-color), 0.5);
  }
  
  </style>