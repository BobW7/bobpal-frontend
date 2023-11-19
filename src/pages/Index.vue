<!--suppress TypeScriptValidateTypes -->
<script setup lang="ts">

import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.ts"
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<boolean>(false);
const userList = ref([]);
const loading = ref(true);

const loadData = async () =>{
  let userListData;
  loading.value = true;
//匹配（心动）模式，根据标签匹配用户
  if(isMatchMode.value){
    const num = 10;
    userListData = await myAxios.get("/user/match",{
      params:{
        num,
      }
    })
        .then(function (response){
          console.log('/user/match succeed',response)
          Toast.success('请求成功！');
          return response?.data;
        })
        .catch(function (error){
          console.log('/user/match failed',error)
          Toast.success('请求失败！');
        })
  }else{
//普通模式，直接分页查询用户
    userListData = await myAxios.get('/user/recommend',{
      params:{
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response){
          console.log('/user/recommend succeed',response);
          Toast.success('请求成功');
          console.log(response);
          return response?.data?.records;
        })
        .catch(function (error){
          console.log('/user/recommend error',error);
          Toast.fail('请求失败');
        })
    console.log(userListData);
  }
  if(userListData){
//字符串转JSON
// 定义用户类型时: tags: string[]; 是字符串数组
//@ts-ignore
    userListData.forEach((user:UserType) =>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    loading.value = false;
  }
}
watchEffect(() => {
  loadData();
})
</script>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<style scoped>

</style>