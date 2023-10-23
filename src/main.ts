import { createApp } from 'vue'
import { NavBar } from 'vant';
import { Button } from 'vant';

import App from './App.vue'

const app = createApp(App);
app.use(NavBar);
app.use(Button);
app.mount('#app')
