<template>
    <div id="ui-container">
        <slot></slot>
    </div>
</template>
<style scoped>
#ui-container
{
  left: 225px;
  top: 0px;
  position: absolute;
  width: calc(100% - 225px);
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>