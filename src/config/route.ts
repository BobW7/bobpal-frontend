import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import {createRouter, createWebHistory} from "vue-router";
import TeamAddPage from "../pages/TeamAddPage.vue";

const routes = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: Index},
        {path: '/team', component: Team},
        {path: '/user', component: User},
        {path: '/search', component: SearchPage},
        {path: '/user/list', component: SearchResultPage},
        {path: '/user/edit', component: UserEditPage},
        {path: '/user/login', component: UserLoginPage},
        {path: '/team/add', component: TeamAddPage},

    ]
})
//定义一些路由


export default routes;