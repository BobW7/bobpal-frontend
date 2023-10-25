<script setup>
const user = {
  id: 1,
  username: 'Bob',
  userAccount: 'kingBob',
  avatarUrl: 'https://nimg.ws.126.net/?url=https%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0727%2F19b6bd99j00ryg52n005kd000sg00wqp.jpg&thumbnail=300x190&quality=95&type=jpg',
  gender: '男',
  phone: '66185',
  email: '12366@qq.com',
  planetCode: 6666,
  createTime: new Date(),
}
</script>

<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username" />
  <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount" />
  <van-cell title="头像" is-link to="/user/edit">
    <img style="height: 100px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="性别" is-link to="/user/edit" :value="user.gender" />
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone" />
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" />
  <van-cell title="星球编号" :value="user.planetCode" />
  <van-cell title="注册时间" :value="user.createTime" />

</template>

<style scoped>

</style>