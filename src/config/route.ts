import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";


const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: Index},
        {path: '/team', component: TeamPage},
        {path: '/user', component: UserPage},
        {path: '/user/update', component: UserUpdatePage},
        {path: '/search', component: SearchPage},
        {path: '/user/list', component: SearchResultPage},
        {path: '/user/edit', component: UserEditPage},
        {path: '/user/login', component: UserLoginPage},
        {path: '/team/add', component: TeamAddPage},
        {path: '/team/update', component: TeamUpdatePage},
        {path: '/user/team/create', component: UserTeamCreatePage},
        {path: '/user/team/join', component: UserTeamJoinPage},

    ]
})
//定义一些路由


export default routes;