<!--suppress TypeScriptValidateTypes -->
<script setup lang="ts">
import {TeamType} from "../modules/team";
import {teamStatusEnum} from "../constants/teamConstants.ts";
import CelticsStamp from '../assets/CelticsStamp.png';
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {getCurrentUserState} from "../states/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const currentUser = ref();
onMounted(async ()=>{
  currentUser.value = await getCurrentUser();
})

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
  //@ts-ignore
  if(res?.code === 0){
    Toast.success('加入成功！');
  }else{
    //@ts-ignore
    Toast.fail('加入失败！' + (res.description ?`,${res.description}`:''));
  }
}
const router = useRouter();
/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number)=>{
  router.push({
    path:"/team/update",
    query:{
      id,
    }
  })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id
  });
  if(res.code === 0){
    Toast.success('退出成功！');
  }else{
    Toast.fail('退出失败！'+(res.description?`,${res.description}`:''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id :number)=>{
  const res = await myAxios.post("/team/delete", {
    id
  });
  if(res.code === 0){
    Toast.success('解散成功！');
  }else{
    Toast.fail('解散失败！'+(res.description?`,${res.description}`:''));
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
      <van-button v-if="team.createUser?.id === currentUser?.id" size="small" plain
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <van-button v-if="team.createUser?.id === currentUser?.id" size="small" plain
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.createUser?.id === currentUser?.id" size="small" plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>