<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";
const route = useRoute();
console.log(route.query)

//从路由参数中获取编辑信息，存储在 editUser 中
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})
const onSubmit = (values) => {
  // todo 把editKey,editName,currentValue提交到后台
  console.log('onSubmit',values)
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