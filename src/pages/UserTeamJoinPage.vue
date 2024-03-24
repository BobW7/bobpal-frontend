<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import 'vant/es/toast/style';
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();
const teamList = ref([]);
const searchText = ref('');


//只会在页面加载时触发一次
onMounted(() => {
  listTeam();
})

const onSearch = async (val) => {
  listTeam(val)
};
/**
 * 搜索队伍
 * @param val
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/joined", {
    params: {
      searchText: val,
    }
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
  }
}

</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if=" teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>