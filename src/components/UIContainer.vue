<template>
    <div id="ui-container">
        <slot></slot>
    </div>
</template>
<style>
#ui-container
{
  left: 225px;
  top: 0px;
  position: absolute;
  width: calc(100% - 220px);
  height: 100%;
  overflow-y: scroll;
}
</style>