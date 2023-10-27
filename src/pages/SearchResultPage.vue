<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js"
import {Toast} from "vant";
import qs from 'qs';

const route = useRoute()
const {tags} = route.query


onMounted(()=>{
  myAxios.get('/user/search/tags',{
    params:{
      tagNameList:tags
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices:false})
    }
  }).then(function (response){
    console.log('/user/search/tags success',response);
    Toast.success('请求成功');
  }).catch(function (error){
    console.log('/user/search/tags error',error);
    Toast.fail('请求失败');
  })
})
//取到传来的标签

//假数据
const MockUser = {
  id: 6668,
  username: 'Jayson Tatum',
  userAccount: 'string',
  avatarUrl: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png',
  profile: 'Celtics Forward',
  gender:1,
  phone: '131313131',
  email: 'string',
  userStatus: 0,
  userRole: 0,
  planetCode: '0',
  tags: ['SF','PF','NO-THREE','老寒腿','黄油手','神经刀','喂史者','YouKnow哥'],
  createTime: new Date(),
}
//用户列表
const userList = ref([MockUser]);

</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="`${user.username} (#${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>


</template>

<style scoped>

</style>