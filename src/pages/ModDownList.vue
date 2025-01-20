<template>
    <div id="ver-list">
        <ul>
        <li v-for="item in items" :key="item.text" :class="{ clickable: item.clickable, active: item.id === activeItem }" @click="handleClick(item)">
            <img :src="item.background_image" id="background-image">
            <div id="mask"></div>
            <span id="icon_container">
            <img :src="item.icon" id="icon">
            </span>
            <div id="version-info">
                <div id="ver-name">{{ item.name }}</div>
                <div id="desc">{{ item.desc }}</div>
                <div id="tags">
                    <Tag v-for="tagname in item.tags" :title="tagname"></Tag>
                </div>
            </div>
        </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Tag from '../components/Tag.vue';
const listItems = ref(null);
const activeItem = ref(-1);
const items = ref([
    { id: 1, clickable: true, name: 'Fabric API' , background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', desc: "Lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric toolchain.", icon: 'https://cdn.modrinth.com/data/P7dR8mSH/icon.png', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Sodium' , 
    background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', 
    desc: "The fastest and most compatible rendering optimization mod for Minecraft. Now available for both NeoForge and Fabric!", 
    icon: 'https://cdn.modrinth.com/data/AANobbMI/295862f4724dc3f78df3447ad6072b2dcd3ef0c9_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Cloth Config API' , 
    background_image: 'https://cdn.modrinth.com/data/9s6osm5g/images/baa0dc605540953f5262f24109ec7837c090a04c.png', 
    desc: "Configuration Library for Minecraft Mods", 
    icon: 'https://cdn.modrinth.com/data/9s6osm5g/ed8a2316cbb6f4fc5f510e8e13a59a85cbbbff4d_96.webp', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Iris Shaders' , 
    background_image: 'https://cdn.modrinth.com/data/YL57xq9U/images/d69f13ea9889652c02f8cf91a3e55c8ef7cd6316_350.webp', 
    desc: "A modern shader pack loader for Minecraft intended to be compatible with existing OptiFine shader packs", 
    icon: 'https://cdn.modrinth.com/data/YL57xq9U/18d0e7f076d3d6ed5bedd472b853909aac5da202_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Fabric API' , background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', desc: "Lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric toolchain.", icon: 'https://cdn.modrinth.com/data/P7dR8mSH/icon.png', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Sodium' , 
    background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', 
    desc: "The fastest and most compatible rendering optimization mod for Minecraft. Now available for both NeoForge and Fabric!", 
    icon: 'https://cdn.modrinth.com/data/AANobbMI/295862f4724dc3f78df3447ad6072b2dcd3ef0c9_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Cloth Config API' , 
    background_image: 'https://cdn.modrinth.com/data/9s6osm5g/images/baa0dc605540953f5262f24109ec7837c090a04c.png', 
    desc: "Configuration Library for Minecraft Mods", 
    icon: 'https://cdn.modrinth.com/data/9s6osm5g/ed8a2316cbb6f4fc5f510e8e13a59a85cbbbff4d_96.webp', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Iris Shaders' , 
    background_image: 'https://cdn.modrinth.com/data/YL57xq9U/images/d69f13ea9889652c02f8cf91a3e55c8ef7cd6316_350.webp', 
    desc: "A modern shader pack loader for Minecraft intended to be compatible with existing OptiFine shader packs", 
    icon: 'https://cdn.modrinth.com/data/YL57xq9U/18d0e7f076d3d6ed5bedd472b853909aac5da202_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Fabric API' , background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', desc: "Lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric toolchain.", icon: 'https://cdn.modrinth.com/data/P7dR8mSH/icon.png', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Sodium' , 
    background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', 
    desc: "The fastest and most compatible rendering optimization mod for Minecraft. Now available for both NeoForge and Fabric!", 
    icon: 'https://cdn.modrinth.com/data/AANobbMI/295862f4724dc3f78df3447ad6072b2dcd3ef0c9_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Cloth Config API' , 
    background_image: 'https://cdn.modrinth.com/data/9s6osm5g/images/baa0dc605540953f5262f24109ec7837c090a04c.png', 
    desc: "Configuration Library for Minecraft Mods", 
    icon: 'https://cdn.modrinth.com/data/9s6osm5g/ed8a2316cbb6f4fc5f510e8e13a59a85cbbbff4d_96.webp', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Iris Shaders' , 
    background_image: 'https://cdn.modrinth.com/data/YL57xq9U/images/d69f13ea9889652c02f8cf91a3e55c8ef7cd6316_350.webp', 
    desc: "A modern shader pack loader for Minecraft intended to be compatible with existing OptiFine shader packs", 
    icon: 'https://cdn.modrinth.com/data/YL57xq9U/18d0e7f076d3d6ed5bedd472b853909aac5da202_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Fabric API' , background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', desc: "Lightweight and modular API providing common hooks and intercompatibility measures utilized by mods using the Fabric toolchain.", icon: 'https://cdn.modrinth.com/data/P7dR8mSH/icon.png', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Sodium' , 
    background_image: 'https://cdn.modrinth.com/data/AANobbMI/images/b681a9e87daa53a0e85336a894db70427007149b_350.webp', 
    desc: "The fastest and most compatible rendering optimization mod for Minecraft. Now available for both NeoForge and Fabric!", 
    icon: 'https://cdn.modrinth.com/data/AANobbMI/295862f4724dc3f78df3447ad6072b2dcd3ef0c9_96.webp', tags: ['Optimization','Fabric'] },
    { id: 1, clickable: true, name: 'Cloth Config API' , 
    background_image: 'https://cdn.modrinth.com/data/9s6osm5g/images/baa0dc605540953f5262f24109ec7837c090a04c.png', 
    desc: "Configuration Library for Minecraft Mods", 
    icon: 'https://cdn.modrinth.com/data/9s6osm5g/ed8a2316cbb6f4fc5f510e8e13a59a85cbbbff4d_96.webp', tags: ['Library','Fabric'] },
    { id: 1, clickable: true, name: 'Iris Shaders' , 
    background_image: 'https://cdn.modrinth.com/data/YL57xq9U/images/d69f13ea9889652c02f8cf91a3e55c8ef7cd6316_350.webp', 
    desc: "A modern shader pack loader for Minecraft intended to be compatible with existing OptiFine shader packs", 
    icon: 'https://cdn.modrinth.com/data/YL57xq9U/18d0e7f076d3d6ed5bedd472b853909aac5da202_96.webp', tags: ['Optimization','Fabric'] },


]);
const syncItemWidths = () => {
  if (listItems.value && listItems.value.length > 0) {
    const firstItemWidth = listItems.value[0].offsetWidth;
    listItems.value.forEach((item) => {
      item.style.width = `${firstItemWidth}px`;
    });
  }
};
onMounted(() => {
  nextTick(syncItemWidths);
});




const handleClick = (item) => {
if (item.clickable) {
    activeItem.value = item.id; 
}
};

</script>

<style scoped>
#mask
{
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    width: 100%;
    height: 160px;
    border-radius: 5px 5px 0px 0px;
}
#background-image
{
    position: fixed;
    width: 100%;
    height: 160px;
    background-size: cover;
    background-position: center;
    border-radius: 5px 5px 0px 0px;
}
#tags
{
    position: absolute;
    bottom: 20px;
    left: 0px;
}
#ver-name
{
    position: relative;
    color: white;
    font-weight: bold;
    font-size: 15px;
    bottom: 0px;
}
#desc
{
    color: rgba(255, 255, 255, 0.5);
    top: 155px;
    height: 85px;
    overflow-y: hidden;
    position: absolute;
    width: calc(100% - 20px);
    margin-top: 5px;
}
#container
{
    left: 0px;
    top: 80px;
    position: absolute;
    width: 100%;
    height: calc(100% - 80px);
}
#icon_container {
  margin-right: 14px;
  margin-top: 6px;
}
#icon {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 150px;
}
#version-info {
    height: auto;
    position: absolute;
    left: 0px;
    height: 100%;
    width: 100%;
    margin: 10px;
}
ul {
  list-style-type: none;
  font-size: 12px; 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30;
  
}

li {
  color: rgba(255, 255, 255, 0.3);
  width: 100%;
}

li.clickable {
  flex: 1 1 auto; /* 适应宽度 */
  
  width: 200px;
  height: 300px;
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin: 20px;
  margin-top: 0px;
  margin-left: 0px;
  backdrop-filter: blur(0px);
  transition: top 0.2s ease, background-color 0.2s ease, background-filter 0.2s ease;
  top: 5px;
}

li.clickable:hover {
  background-color: rgba(255, 255, 255, 0.2);
  top: 0px;
  backdrop-filter: blur(20px);
}

</style>