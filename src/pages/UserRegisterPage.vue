<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const route = useRoute();
const router = useRouter();
console.log(route.query)
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
    planetCode: planetCode.value,
  })
  console.log(res, '注册请求');
  //@ts-ignore
  if (res.code === 0 && res.data > 0) {
    Toast.success('注册成功');
    router.back();
  } else {
    //@ts-ignore
    Toast.fail('注册失败！' + (res.description ? `${res.description}` : ''));
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="userAccount"
        name="userAccount"
        label="账号"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写账号' }]"
    />

    <van-field
        v-model="userPassword"
        name="userPassword"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
    />

    <van-field
        v-model="checkPassword"
        name="checkPassword"
        label="确认密码"
        placeholder="请确认密码"
        :rules="[{ required: true, message: '请确认密码' }]"
    />

    <van-field
        v-model="planetCode"
        name="planetCode"
        label="星球编号"
        placeholder="请填写星球编号"
        :rules="[{ required: true, message: '请填写星球编号' }]"
    />

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>


</template>

<style scoped>

</style>