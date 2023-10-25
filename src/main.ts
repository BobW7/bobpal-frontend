import { createApp } from 'vue'
//引入router组件
import * as VueRouter from 'vue-router';
import App from './App.vue'
import routes from "./config/route.ts";
//全量引入忍不了了
import Vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App);

app.use(Vant);
const router = VueRouter.createRouter({
    //内部提供history模式的实现
    history:VueRouter.createMemoryHistory(),
    routes,
})
app.use(router);
app.mount('#app')


