<template>
  <UIContainer>
    <div id="back_container">
        <div id="config-title">创建新配置</div>
        <div id="tip"></div>
        <div id="settings-container">
          <h1>启动行为</h1>
          <div id="config-name">游戏窗口标题</div>
          <div id="config-name">自定义信息</div>
          <div id="config-name">启动器可见性</div>
          <div id="config-name">进程优先级</div>
          <div id="config-name">窗口大小</div>
          <div id="config-name">Java 版本</div>
          <div id="config-name">JVM 参数</div>
          <h1>内存分配</h1>
          <div id="config-name">游戏窗口标题</div>
          <div id="config-name">自定义信息</div>
          <div id="config-name">最大实例数</div>
        </div>
        <div id="config-title">启动器设置</div>
        <div id="tags">
            <Tag title="全局"></Tag>
        </div>
        
        <div id="tip">🔧 个性化启动器</div>
        <div id="settings-container">
          <h1>创建配置</h1>
          <div id="config-name">允许最大实例数</div>
          <h1>插件</h1>
          <div id="config-name">已加载 20 个插件</div>
          <h1>视觉</h1>
          <div id="config-name">不透明度</div>
          <div id="config-name">背景图片</div>
          <div id="config-name">背景音乐</div>
          <div id="config-name">标题栏</div>
          <div id="config-name">主题颜色</div>
          <div id="config-name">粒子</div>
        </div>


        <div id="config-title">关于</div>
        <div id="tags">
            <Tag title="添加 QQ 群组"></Tag>
            <Tag title="添加 Telegram 群组"></Tag>
        </div>

        <div id="settings-container">
          <h1>版本</h1>
          <div id="config-name">启动器: 0.2 | build 1</div>
          <div id="config-name">Node: v22.13.0</div>
          <div id="config-name">Tauri: v22.13.0</div>
          <div id="config-name">WebView: 131.0.2903.146</div>
          <div id="config-name">OS: Windows_NT x64 10.0.26100</div>

          <div id="config-name">开发版通道</div>
          <div id="config-name">没有可用的新版本</div>
          <h1>作者</h1>
          
          <div id="config-name">Vkango (Lonyou)</div>
          <h1>鸣谢</h1>
          
          <div id="config-name">bangbang93</div>
          <div id="config-name">MC 百科</div>
          <h1>开源许可</h1>
          
          <div id="config-name">作者：Vkango (Lonyou)</div>
          <div id="config-name">开发版通道</div>
          <div id="config-name">没有可用的新版本</div>
        </div>
    </div>
  </UIContainer>
</template>

<script setup>
</script>

<style scoped>
#config-name {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 30px;
}
#settings-container {
  padding: 10px 30px;
  width: 100%;
  height: fit-content;
  position: relative;
}
h1 {
  font-size: 16px;
}
#tip {
  opacity: 0.5;
  margin-left: 30px;
  margin-top: 5px;
  font-size: 12px;
}
#tip2 {
  position: relative;
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
  margin-top: 10px;
  font-weight: bold;
}
#tags {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  top: -3px;
}

#back_container
{
  left: 0px;
  top: 0px;
  position: relative;
  padding-top: 30px;
  width: calc(100% - 60px);
  height: 100%;
}
#container1{
  position: absolute;
  left: 225px;
  top: 30px;
  width: calc(100% - 225px);
  height: 100%;
  overflow-y: auto;
}
</style>