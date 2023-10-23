<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />

</template>

<script setup>
const onClickLeft = () => alert('left');
const onClickRight = () => alert('right');

</script>
<style scoped>

</style>