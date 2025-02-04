<template>
    <div id="back-container" @click.stop>
      <div id="title">启动配置</div>
      <Tip style="margin: 5px 0px;" title="多实例配置单次添加只能启动其中的一个实例，如有需要请多次添加。"></Tip>
      <div style="display: flex; gap: 5px; flex-wrap: wrap; height: calc(100% - 150px);">
        <div id="added-content">
          <Tag id="Tag" style="margin-bottom: 10px;" title="🚀 已添加"></Tag>
          <RippleButton id="RippleButton" @click="onSelect" v-for="item in items">
            <div id="title">{{ item.name }}</div>
            <div id="tags">
              <Tag id="Tag" v-for="tag in item.tags" :title="tag"></Tag>
            </div>
          </RippleButton>
        </div>
        <div id="added-content">
          <Tag id="Tag" style="margin-bottom: 10px;" title="🚀 未添加"></Tag>
          <RippleButton id="RippleButton" @click="onSelect" v-for="item in items1">
            <div id="title">{{ item.name }}</div>
            <div id="tags">
              <Tag id="Tag" v-for="tag in item.tags" :title="tag"></Tag>
            </div>
          </RippleButton>
        </div>
      </div>
      <RippleButton id="button" style="margin-top: 20px;" @click="onClick">OK</RippleButton>
    </div>
</template>
<script setup>
import { defineEmits, onMounted, ref } from 'vue';
import Tip from './Tip.vue';
import Tag from './Tag.vue';
const onSelect = () => {
  console.log('selected');
}
const emit = defineEmits(['click']);
const items = ref([
  { name: 'default', selected: false, tags: ['🕖 最近启动', '🎲 单实例'] },
  { name: '基岩版', selected: false, tags: ['🎈 基岩版', '🎲 单实例']  },
  { name: '测试配置', selected: false, tags: ['🕖 最近启动', '🎲 单实例']  },
])
const items1 = ref([
{ name: 'default', selected: false, tags: ['🕖 最近启动', '🎲 单实例'] },
  { name: '基岩版', selected: false, tags: ['🎈 基岩版', '🎲 单实例']  },
  { name: '测试配置', selected: false, tags: ['🕖 最近启动', '🎲 单实例']  },
  { name: 'default', selected: false, tags: ['🕖 最近启动', '🎲 单实例'] },
  { name: '基岩版', selected: false, tags: ['🎈 基岩版', '🎲 单实例']  },
  { name: '测试配置', selected: false, tags: ['🕖 最近启动', '🎲 单实例']  },
  { name: 'default', selected: false, tags: ['🕖 最近启动', '🎲 单实例'] },
  { name: '基岩版', selected: false, tags: ['🎈 基岩版', '🎲 单实例']  },
  { name: '测试配置', selected: false, tags: ['🕖 最近启动', '🎲 单实例']  },
  { name: 'default', selected: false, tags: ['🕖 最近启动', '🎲 单实例'] },

])
defineProps({
})
const onClick =() => {
  emit('click');
}
onMounted(() => {
  const addbutton = document.getElementsByClassName('launch-config-manage-button')[0];
  const backcontainer = document.getElementById('back-container');
  const rect = addbutton.getBoundingClientRect()
  backcontainer.style.setProperty('--back-container-left', rect.left - 225 + "px");
  backcontainer.style.setProperty('--back-container-top', rect.top + "px");
})
</script>
<style scoped>
#Tag {
  margin: 0;
}
#back-container {
  --back-container-left: 0;
  --back-container-top: 100;
  position: absolute;
  padding: 10px 20px;
  border-radius: 5px;
  max-width: 600px;
  background-color: rgba(var(--background-color), 0.7);
  backdrop-filter: blur(var(--blur-value));
  height: 60%;
  overflow: hidden;
  cursor: default;
  left: var(--back-container-left);
  top: var(--back-container-top);
  box-shadow: 0px 3px 10px -3px rgba(0, 0, 0, 0.6);
}
#title {
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  padding: 5px 0px;
  margin-bottom: 5px;
}
#added-content {
  width: calc(50% - 23px);
  text-align: left;
  opacity: 1;
  background-color: rgba(var(--text-color), 0.1);
  padding: 10px;
  border-radius: 5px;
  height: 100%;
  overflow-y: auto;
}
#RippleButton {
  background-color: transparent;
  width: 100%;
  box-shadow: none;
  padding: 5px 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
#tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>