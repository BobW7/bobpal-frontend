import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserRegistSelectTag from "../pages/UserRegistSelectTag.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import UserTagPage from "../pages/UserTagPage.vue";


// @ts-ignore
const routes =
    [
        {path: '/', title: '找队友', component: Index},
        {path: '/user/login', component: UserLoginPage},
        {path: '/team', title: '找队伍', component: TeamPage},
        {path: '/user', title: '个人中心', component: UserPage},
        {path: '/user/update', title: '修改信息', component: UserUpdatePage},
        {path: '/user/updateTags', title: '修改信息', component: UserTagPage},
        {path: '/search', title: '查找用户', component: SearchPage},
        {path: '/user/list', component: SearchResultPage},
        {path: '/user/edit', title: '编辑', component: UserEditPage},
        {path: '/team/add', title: '创建队伍', component: TeamAddPage},
        {path: '/team/update', component: TeamUpdatePage},
        {path: '/user/team/create', title: '我创建的', component: UserTeamCreatePage},
        {path: '/user/team/join', title: '我加入的', component: UserTeamJoinPage},
        {path: '/user/register/selectTags', title: '选择标签', component: UserRegistSelectTag},
        {path: '/user/register', title: '注册', component: UserRegisterPage},

    ]

//定义一些路由
export default routes;