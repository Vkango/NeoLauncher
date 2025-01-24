<template>
    <div id="image-with-tip">
        <img id="image-with-tip-background-image" :src="showImage">
        <div id="image-with-tip-content">{{ Tip }}</div>
    </div>
</template>
<script setup>
defineProps ({
    showImage: {
        type: String,
        required: true
    },
    Tip: {
        type: String,
        required: true
    }
})

</script>
<style scoped>
#image-with-tip {
    height: fit-content;
    width: 100%;
}
#image-with-tip-background-image {
    width: 100%;
    border-radius: 5px;
    margin: 5px 0px;
    user-select: none;
    -webkit-user-drag: none;
}

#image-with-tip-content {
    margin: 5px 0px;
    left: 0px;
    width: 100%;
    height: fit-content;
}
</style>