<template>
    <div id="loading-with-tip">
        <Loading :line-width="8" ringColor="rgba(var(--text-color), 0.5)" :width="16" :height="16" id="loading"></Loading>
        <div id="content">{{ Tip }}</div>
    </div>
</template>
<script setup>
defineProps ({
    Tip: {
        type: String,
        required: true
    }
})
</script>
<style scoped>
    #loading-with-tip {
        height: fit-content;
        width: 100%;
        display: flex;
        align-items: center ;
    }
    #loading {
        display: inline-block;
    }
    #content {
        position: absolute;
        left: 32px;
        display: inline-block;
        width: calc(100% - 60px);
        height: fit-content;
        margin-left: 10px;
    }
</style>