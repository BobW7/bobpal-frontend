<!--suppress TypeScriptValidateTypes -->
<script setup lang="ts">
import {TeamType} from "../modules/team";
import {teamStatusEnum} from "../constants/teamConstants.ts";
import CelticsStamp from '../assets/CelticsStamp.png';
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

interface TeamCardListProps{
  teamList: TeamType[];
}
//props中能得到父组件传递来的属性，比如teamList
 const props =withDefaults(defineProps<TeamCardListProps>() , {
   teamList: [] as TeamType,
 })

/**
 * 加入队伍
 * @param id
 */
const doJoinTeam =async (id: number) =>{
 const res = await myAxios.post("/team/join",{
    teamId:id
  })
  if(res?.code === 0){
    Toast.success('加入成功！');
  }else{
    Toast.fail('加入失败！' + (res.description ?`,${res.description}`:''));
  }
}
</script>

<template>
  <van-card
      v-for="team in props.teamList"
      :thumb="CelticsStamp"
      :desc="team.description"
      :title="`${team.name}`"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{'最大人数: ' + team.maxNum}}
      </div>
      <div v-if="team.expireTime">
        {{'过期时间: ' + team.expireTime}}
      </div>
      <div v-if="team.createTime">
        {{'创建时间: ' + team.createTime}}
      </div>
    </template>
    <template #footer>
      <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>