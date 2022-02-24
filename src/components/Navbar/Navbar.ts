import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Navbar",
    setup() {
        const router = useRouter();

        const currentRoute = ref<string>(window.location.pathname);

        const changeRoute = (path: string) => {
            currentRoute.value = path;
            if (path === "/") {
                window.location.replace("/");
            } else {
                router.push(path);
            }
        };
        return {
            changeRoute,
            currentRoute,
        };
    },
});
