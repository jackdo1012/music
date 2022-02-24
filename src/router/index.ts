import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Home/Home.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/music",
        name: "Music",
        component: () => import("../components/Music/Music.vue"),
    },
    {
        path: "/artist",
        name: "Artist",
        component: () => import("../components/Artist/Artist.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
