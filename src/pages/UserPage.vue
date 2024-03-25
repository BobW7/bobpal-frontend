<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
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

onMounted(async () => {
 let currentUser = await getCurrentUser();
 if(currentUser){
   if(currentUser.tags){
     currentUser.tags = JSON.parse(currentUser.tags);
   }
   user.value = currentUser;
 }
})

const doLogOut = async () => {
  const res = await myAxios.post("/user/logout");
  if (res) {
    alert("确认退出？");
    Toast.success("退出成功");
    window.location.reload();
  } else {
    Toast.fail("退出失败");
  }
}
const toEdit = (editKey: string, editName: string, currentValue: string) => {
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
    <van-cell title="头像">
      <img style="height: 100px" :src="user.avatarUrl">
    </van-cell>
    <van-cell title="我的标签" is-link to="/user/updateTags">
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{ tag }}
      </van-tag>
    </van-cell>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>

    <div style="margin: 30px 16px 16px;">
      <van-button style="margin-top:20px" type="danger" @click="doLogOut" block>退出登录</van-button>
    </div>


  </template>


</template>

<style scoped>

</style>