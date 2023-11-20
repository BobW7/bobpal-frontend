<!--suppress TypeScriptValidateTypes -->
<script setup lang="ts">
import {TeamType} from "../modules/team";
import {teamStatusEnum} from "../constants/teamConstants.ts";
import CelticsStamp from '../assets/CelticsStamp.png';
import myAxios from "../plugins/myAxios.ts";
import {Dialog, Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const VanDialog = Dialog.Component;
const router = useRouter();

const currentUser = ref();
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

interface TeamCardListProps {
  teamList: TeamType[];
}

//props中能得到父组件传递来的属性，比如teamList
const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType,
})

/**
 * 加入队伍
 * @param id
 * @param password
 */
const doJoinTeam = async () => {
  if(!joinTeamId.value){
    return;
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password:password.value,
  })
  //@ts-ignore
  if (res?.code === 0) {
    Toast.success('加入成功！');
    doClear();
      window.location.reload();
  } else {
    //@ts-ignore
    Toast.fail('加入失败！' + (res.description ? `,${res.description}` : ''));
    doClear();
  }
}

const preJoinTeam = (team:TeamType)=>{
  joinTeamId.value = team.id;
  if(team.status === 0){
    doJoinTeam();
  }else {
    showPasswordDialog.value = true;
  }
}
const doClear = ()=>{
  joinTeamId.value = 0;
  password.value = '';

}

/**
 * 跳转至更新队伍页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
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
  //@ts-ignore
  if (res.code === 0) {
    Toast.success('退出成功！');
    window.location.reload();
  } else {
    //@ts-ignore
    Toast.fail('退出失败！' + (res.description ? `,${res.description}` : ''));
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    id
  });
  //@ts-ignore
  if (res.code === 0) {
    Toast.success('解散成功！');
    window.location.reload();
  } else {
    //@ts-ignore
    Toast.fail('解散失败！' + (res.description ? `,${res.description}` : ''));
  }

}
</script>

<template>
  <div id="teamCardList">
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
          {{ `队伍人数:${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div v-if="team.createTime">
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.createUser?.id !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.createUser?.id === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.createUser?.id !== currentUser?.id && team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.createUser?.id === currentUser?.id" size="small" type="danger"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>

    </van-card>
    <van-dialog v-model:show=showPasswordDialog title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doClear">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>

</template>

<style scoped>

</style>