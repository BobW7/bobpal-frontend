<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >

    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <div id="content">
    <template v-if="active === 'index'">
      <Index/>
    </template>
    <template v-if="active === 'team'">
      <Team/>
    </template>
  </div>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team">队伍页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup>
import {Toast} from "vant";
import {ref} from "vue";
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";

const onClickLeft = () => alert('left');
const onClickRight = () => alert('right');

const value = ref('');
const active = ref("index");
const onChange = (index) => Toast(`标签 ${index}`);
</script>
<style scoped>

</style>