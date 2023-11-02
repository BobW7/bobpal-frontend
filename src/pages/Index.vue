<!--suppress TypeScriptValidateTypes -->
<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts"
import {Toast} from "vant";
import qs from 'qs';
import {UserType} from "../modules/user";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()
const {tags} = route.query
//用户列表
//const userList = ref([MockUser]);
const userList = ref([]);

onMounted(async ()=>{
  const userListData:UserType = await myAxios.get('/user/recommend',{
    params:{
      pageSize: 8,
      pageNum: 1,
    },
  })
      .then(function (response){
    console.log('/user/recommend succeed',response);
    Toast.success('请求成功');
    console.log(response);
    return  response?.data?.records;
  })
      .catch(function (error){
    console.log('/user/recommend error',error);
    Toast.fail('请求失败');
  })
  console.log(userListData);
  if(userListData){
    //字符串转JSON
    //   定义用户类型时: tags: string[]; 是字符串数组
    //@ts-ignore
    userListData.forEach(user =>{
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})
//取到传来的标签


</script>

<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>


</template>

<style scoped>

</style>