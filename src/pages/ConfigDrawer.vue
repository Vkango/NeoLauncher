<template>
  <div id="drawer-mask">
    <div id="config-drawer">

      <div id="line">
      </div>
      <div id="control">
        <img src="../assets/back.svg" id="back">
        <span id="drawer-title">WorldEdit - [创世神] worldedit-mod-7.2.10</span>
      </div>
      <div id="detail">
        <img src="../assets/worldedit.png" width="45px" id="mod-icon">
        <div id="banner-text">
          <div id="mod-name">WorldEdit</div>
          <div id="desc">WorldEdit is an easy-to-use in-game world editor for Minecraft, supporting both single- and multi-player.</div>
        </div>
        <div id="details">
          <div id="detail-head">
            <img src="../assets/setting.svg">
            <span id="head-text">内部信息</span>
          </div>
          <div id="detail-info">
            <img id="detail-icon" src="../assets/note.svg">
            <span id="detail-name">名称</span>
            <span id="detail-detail">WorldEdit</span>
          </div>

          <div id="detail-info">
            <img id="detail-icon" src="../assets/note.svg">
            <span id="detail-name">版本</span>
            <span id="detail-detail">7.2.5+57d5ac9
            </span>
          </div>
          <div id="detail-info">
            <img id="detail-icon" src="../assets/note.svg">
            <span id="detail-name">加载器</span>
            <span id="detail-detail">Fabric</span>
            
          </div>
          <div id="detail-info">
            <img id="detail-icon" src="../assets/note.svg">
            <span id="detail-name">主页</span>
            <span id="detail-detail">https://enginehub.org/worldedit/</span>
          </div>
          <div id="detail-info">
            <img id="detail-icon" src="../assets/note.svg">
            <span id="detail-name">开源协议</span>
            <span id="detail-detail">GPL3</span>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<script setup>

</script>

<style scoped>
#detail-icon {
  width: 14px;
  margin-top: 10px;
  opacity: 0.5;

}
#detail-name {
  color: white;
  font-size: 12px;
  position: absolute;
  margin: 8px 10px;
  opacity: 0.5;
}
#detail-detail {
  position: absolute;
  left: 100px;
  margin-top: 8px;
  font-size: 12px;
}
#head-text {
  
  font-size: 12px;
  position: relative;
  left: 10px;
  top: -5px;

}
#details {

  flex-grow: 1; 
  padding: 10px;
  color: white;
}
#detail-head {
  opacity: 0.5;
  margin-top: 15px;
}
#banner-text {
  margin: 0 10px;
}
#mod-name {
  font-weight: bold;
  color: white;
}
#control {
  height: auto;
  display: flex;
  align-items: center;
}
#detail {
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 5px;

}
#desc {
  color: white;
  line-height: 20px;
  font-size: 13px;
  opacity: 0.5;
}
#mod-icon {
  width: 40px;
  height: 40px;
  margin: 10px
}
#line {
  left: 0px;
  top: 0px;
  height: 2px;
  width: 100%;
  background-color: rgba(242, 93, 49, 0.5);
}
#back {

  padding: 15px;
}
#drawer-title {
  left: 35px;
  top: 8px;
  width: calc(100% - 60px);
  color: white;
  font-size: 12px;
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