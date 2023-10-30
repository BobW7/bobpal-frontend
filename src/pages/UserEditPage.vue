<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {getCurrentUserState} from "../states/user.ts";
const route = useRoute();
const router = useRouter();
console.log(route.query)

//从路由参数中获取编辑信息，存储在 editUser 中
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})



const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    Toast.fail('用户未登录！');
    return;
  }
 const res = await myAxios.post('/user/update',{
   'id':currentUser.id,
    [editUser.value.editKey as string]:editUser.value.currentValue,
  })
  console.log(res,'更新请求');
  if(res.code === 0 && res.data > 0){
    Toast.success('修改成功');
    router.back();
  }else{
    Toast.fail('更新失败');
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="`${editUser.editKey}`"
          :label="`${editUser.editName}`"
          :placeholder="`请输入${editUser.editName}`"
      />

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

<style scoped>

</style>