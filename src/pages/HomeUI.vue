<template>
    <UIContainer>
      <RippleButton id="container">
        <div id="config-title">开始游戏</div>
        <div id="tags" @click.stop @mousedown.stop>
            <RippleButton id="RippleButton">▶ default</RippleButton>
            <RippleButton id="RippleButton">▶ 基岩版</RippleButton>
            <RippleButton id="RippleButton"><img src="../assets/add.svg"></RippleButton>
        </div>
        <div id="tip">🌸 已选择 2 个配置，可继续添加</div>
        <div id="tip2">🚀 点击页面任意空白处启动选定配置</div>
      </RippleButton>
  </UIContainer>
</template>

<script setup>

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
  color: #fff;
  font-size: 12px;
  margin: 0px 3px;
  background-color: rgba(255, 255, 255, 0.2);
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
  background-color: rgba(255, 255, 255, 0.025);
}
</style>