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
const loading = ref(false);

//url是后端接口地址
//@RequestMapping("/user")
//...
// @GetMapping("/search/tags")
// public BaseResponse<List<User>> searchUsersByTags(@RequestParam(required = false) List<String> tagNameList){
//     if (CollectionUtils.isEmpty(tagNameList)) {
//       throw new BusinessException(ErrorCode.PARAMS_ERROR);
//     }
//     List<User> userList = userService.searchUsersByTags(tagNameList);
//     return ResultUtils.success(userList);
//
//   }
onMounted(async ()=>{
 const userListData:UserType = await myAxios.get('/user/search/tags',{
    params:{
      tagNameList:tags,
    },
    paramsSerializer: params => {
      return qs.stringify(params,{indices:false})
    }
  }).then(function (response){
    console.log('/user/search/tags success',response);
    Toast.success('请求成功');
    console.log(response);
    return  response?.data;
  }).catch(function (error){
    console.log('/user/search/tags error',error);
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


</script>

<template>
 <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>


</template>

<style scoped>

</style>