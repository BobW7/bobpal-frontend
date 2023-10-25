import { createApp } from 'vue'
import { NavBar } from 'vant';
import { Button } from 'vant';
//引入router组件
import * as VueRouter from 'vue-router';

import App from './App.vue'
import routes from "./config/route.ts";
const app = createApp(App);
app.use(NavBar);
app.use(Button);
const router = VueRouter.createRouter({
    //内部提供history模式的实现
    history:VueRouter.createMemoryHistory(),
    routes,
})
app.use(router);
app.mount('#app')


