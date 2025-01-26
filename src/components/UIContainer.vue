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
  width: calc(100% - 219px);
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>