import { createApp } from 'vue'
//引入router组件

import App from './App.vue'

//全量引入忍不了了
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from "./config/route.ts";
const app = createApp(App);

app.use(Vant);

app.use(routes);
app.mount('#app')


