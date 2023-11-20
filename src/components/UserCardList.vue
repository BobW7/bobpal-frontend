<!--suppress TypeScriptValidateTypes -->
<script setup lang="ts">
import {UserType} from "../modules/user";

interface UserCardListProps{
  loading:boolean;
  userList: UserType[];
}
//props中能得到父组件传递来的属性，比如userList
 const props =withDefaults(defineProps<UserCardListProps>() , {
   loading:true,
   userList: [] as UserType[],
 })
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
      :desc="user.profile"
      :title="`${user.username} (#${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<style scoped>

</style>