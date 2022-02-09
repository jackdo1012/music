import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
if (firstScriptTag !== null && firstScriptTag.parentNode !== null) {
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

createApp(App).use(router).mount("#app");
