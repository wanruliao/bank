import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

const app = createApp(App);

app.use(router);

app.component("Multiselect", Multiselect);

app.mount("#app");
