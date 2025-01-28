<template>
    <Transition name="fade1">
        <div id="tip2" v-if="IsLoading" style="display: flex; align-items: center;"><Loading :line-width="8" ringColor="rgba(255, 255, 255, 0.5)" :width="16" :height="16" style="display: inline-block; margin-right: 20px;"></Loading>正在加载……</div>
    </Transition>
    <Transition name="fade1">
        <div id="description" v-show="!IsLoading"></div>
    </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Loading from '../components/Loading.vue';
import { marked } from '../scripts/marked.esm.js';
const description = ref('')
const IsLoading = ref(true)
// API: 
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
onMounted(async () => {
    IsLoading.value = true
    const response = await fetch('https://api.modrinth.com/v2/project/' + props.id);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    const data = await response.json();
    //console.log(data);
    document.getElementById('description').innerHTML = '        <strong>详细信息</strong>' + marked.parse(data.body);
    IsLoading.value = false;
})

</script>
<style scoped>
#title {
    padding: 10px;
    font-weight: bold;
}
#tip2 {
  position: absolute;
  width: fit-content;
  margin-left: 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  padding: 10px 0;
  border-radius: 30px;
}
</style>
<style>
#description {
    padding: 10px;
    width: calc(100% - 20px);
    line-height: 25px;
}
#description img{
    max-width: 100%;
    border-radius: 5px;
}
#description a{
    color: aqua;
}
#description h1 {
    font-size: 24px;
}
</style>