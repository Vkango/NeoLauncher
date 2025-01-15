<template>
  <div id="container1">
  <div id="back_container">
      <div id="config-title">开始游戏</div>
      <div id="tags">
          <Tag title="▶ default"></Tag>
          <Tag title="▶ 25 寒假考研休息区"></Tag>
      </div>
      <div id="tip">🌸 已选择 2 个配置，可继续添加</div>
      <div id="tip2">🚀 点击页面任意空白处启动选定配置</div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Tag from './Tag.vue'

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
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px -3px rgba(0,0,0,0.6);
}
#config-title {
  color: white;
  font-size: 24px;
  margin-left: 30px;
  position: relative;
  display: inline-block;
  margin-top: 20px;
  font-weight: bold;
}
#tags {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  top: -3px;
}
#container1
{
  left: 225px;
  top: 0px;
  position: absolute;
  width: calc(100% - 225px);
  height: 100%;
  cursor: pointer;

}
#back_container
{
  left: 0px;
  top: 0px;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
#back_container:hover
{
  background-color: rgba(255, 255, 255, 0.025);
}
</style>