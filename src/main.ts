import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import YoutubeIframe from "@techassi/vue-youtube-iframe";

createApp(App).use(router).use(YoutubeIframe).mount("#app");
