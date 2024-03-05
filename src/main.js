import "@/styles/common.scss";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { lazyPlugin } from "@/directives";
// 引入全局组件插件
import { componentPlugin } from "@/components";
// pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");

// 定义全局指令
app.use(lazyPlugin);

// 组件全局化注册
app.use(componentPlugin);
