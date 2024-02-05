import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(ElementPlus).use(store).use(router).mount("#app");
