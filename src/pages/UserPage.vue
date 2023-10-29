<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {UserType} from "../modules/user";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";
import {Toast} from "vant";
import axios from "axios";

const user = {
  id: 1,
  username: 'Bob',
  userAccount: 'kingBob',
  avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F30%2F20200430162112_GjeHt.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700897506&t=25064d1a432e83f1e671aebedfea6043',
  gender: '男',
  phone: '66185',
  email: '12366@qq.com',
  planetCode: 6666,
  createTime: new Date(),
}

const router = useRouter();

const toEdit = (editKey: string,editName: string,currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('nickName',  '昵称', user.username)"/>
  <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount" @click="toEdit('account',  '账号', user.userAccount)"/>
  <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatar','头像',user.avatarUrl)">
    <img style="height: 100px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender',  '性别', user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phoneNum',  '电话', user.phone)"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email',  '邮箱', user.email)"/>
  <van-cell title="星球编号" :value="user.planetCode" />
  <van-cell title="注册时间" :value="user.createTime.toDateString()" />

</template>

<style scoped>

</style>