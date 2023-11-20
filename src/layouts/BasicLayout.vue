<template>
  <van-nav-bar v-if="route.path !== '/user/login'"
      :title=title
      left-text=""
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >

    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>
  <van-tabbar v-if="route.path !== '/user/login'" route>
    <van-tabbar-item icon="home-o" to="/" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/team" name="team">队伍页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/user" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">
import {Toast} from "vant";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import routes from "../config/route.ts";

const router = useRouter();
const route = useRoute();
const DEFAULT_TITLE = 'BobPal';
const title = ref(DEFAULT_TITLE);

router.beforeEach((to,from)=>{
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  if(!route?.title){
    title.value = DEFAULT_TITLE;
  }else{
    title.value = route.title;
  }
})

const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push('/search')
};

const value = ref('');


const active = ref("index");
</script>

<style scoped>
#content {
  padding-bottom: 60px
}
</style>