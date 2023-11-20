<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async (values) => {
const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录');
  if(res.code === 0 && res.data){
    Toast.success('登录成功');
    // 跳转到之前的页面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href=redirectUrl;
  }else {
    Toast.fail('登录失败');
  }
};

</script>

<template>
  <van-nav-bar title="登录" />
  <van-row justify="center">
    <van-image
        width="343"
        src="../src/assets/celtics_secondary.svg"
        style="background-position:center"
    />
  </van-row>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="userPassword"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 30px 16px 16px;">
      <van-button style="margin-top: 10px" round block type="primary" native-type="submit">
        登录
      </van-button>
      <van-button style="margin-top: 10px" color="#FFA034" round block type="primary"
                  to="/user/register">
        注册
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>