<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {UserType} from "../modules/user";
import myAxios from "../plugins/myAxios.ts";
import qs from "qs";
import {Toast} from "vant";
import axios from "axios";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: 'Bob',
//   userAccount: 'kingBob',
//   avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F30%2F20200430162112_GjeHt.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1700897506&t=25064d1a432e83f1e671aebedfea6043',
//   gender: '男',
//   phone: '66185',
//   email: '12366@qq.com',
//   planetCode: 6666,
//   createTime: new Date(),
// }

const router = useRouter();
const user = ref({});

onMounted(async ()=>{
user.value = await getCurrentUser();
})

const doLogOut =async ()=>{
  const res = await myAxios.post("/user/logout");
  if(res){
    alert("确认退出？");
    Toast.success("退出成功");
    window.location.reload();
  }else {
    Toast.fail("退出失败");
  }
}
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
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username"/>
  <van-cell title="修改信息" is-link to="/user/update"/>
  <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
  <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-button type="danger" @click="doLogOut" block>退出登录</van-button>

  </template>


</template>

<style scoped>

</style>