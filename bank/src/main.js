import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const app = createApp(App);

app.use(router);

app.component("v-select", vSelect);

app.mount("#app");
