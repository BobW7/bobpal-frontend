<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import 'vant/es/toast/style';
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref('');
//跳转到加入队伍页
const toAddTeam = () =>{
  router.push({
    path: "/team/add"
  })
}

//只会在页面加载时触发一次
onMounted(  () =>{
 listTeam();
})

const onSearch =async (val) => {
  listTeam(val)
};
/**
 * 搜索队伍
 * @param val
 * @param status
 */
const listTeam =async (val = '' , status = 0)=>{
  const res = await myAxios.get("/team/list",{
    params: {
      searchText:val,
      pageNum:1,
      status,
    }
  });
  if(res?.code === 0){
    teamList.value=res.data;
  }else {
    Toast.fail('加载队伍失败！');
  }
}
const active = ref('public')
const onTabChange = (name)=>{
  //查公开
  if(name === 'public'){
    listTeam(searchText.value,0);
  }else {
    //查加密
    listTeam(searchText.value,2);
  }
}
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"></van-tab>
      <van-tab title="加密" name="secret"></van-tab>
    </van-tabs>
    <div>
      <team-card-list :team-list="teamList"/>
    </div>
    <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam"/>
    <van-empty v-if=" teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>