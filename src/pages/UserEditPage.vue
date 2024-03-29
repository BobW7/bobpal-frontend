<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {Toast} from "vant";
import myAxios from "../plugins/myAxios.ts";


const codeTime = ref(0)
const code = ref('')
const router = useRouter();
const route = useRoute();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.editValue
})
const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  let response = await myAxios.put("/user/update", {
    'id': currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue,
    code: code.value
  });
  if (response.data.code === 0) {
    Toast.success("修改成功")
    await router.replace("/user/update");
  } else {
    Toast.fail("修改失败" + (response.data.description ? `,${response.data.description}` : ''))
  }
};
const lock = ref(true)
</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue"
        :name="`${editUser.editKey}`"
        required
        :label="`新${editUser.editName}`"
        :placeholder="`请输入${editUser.editName}`"
        :rules="[{ required: true, message: `请填写${editUser.editName}` }]"
    >
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确定
      </van-button>
    </div>
  </van-form>


</template>

<style scoped>

</style>