import {createApp} from 'vue'
//引入router组件

import App from './App.vue'

//全量引入忍不了了
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from "./config/route.ts";
import * as VueRouter from 'vue-router';
import '../global.css';

const app = createApp(App);

app.use(Vant);

const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router);
app.mount('#app')


