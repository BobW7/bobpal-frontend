<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

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
const fileList = ref([]);
const imgSrc = ref('')
const router = useRouter();
const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

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

const afterRead = async () => {
  let formData = new FormData();
  formData.append("file", fileList.value[0].file)
  const res = await myAxios.post("/common/upload", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  if (res?.code === 0) {
    Toast.success("头像更新成功")
    imgSrc.value = res?.data
  } else {
    Toast.fail("头像更新失败" + (res.description ? `,${res.description}` : ''))
  }
  fileList.value = []
}
</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username',  '昵称', user.username)"/>
    <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"
              @click="toEdit('userAccount',  '账号', user.userAccount)"/>
    <!--    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
          <img style="height: 100px" :src="user.avatarUrl">
        </van-cell>-->
    <van-cell title="头像" is-link center>
      <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" preview-size="60px">
        <template #preview-delete/>
        <img :src="imgSrc" style="width: 60px;height: 60px;border-radius: 50%" alt=""/>
      </van-uploader>
    </van-cell>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone',  '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email',  '邮箱', user.email)"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>


</template>

<style scoped>

</style>