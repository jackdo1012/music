import { defineComponent, ref } from "vue";
import axios from "axios";
import { IMusic } from "@/types/data";
import { IError } from "@/types/error";
import { serverUrl } from "@/app.config";

export default defineComponent({
    name: "Music",
    setup() {
        const musics = ref<IMusic[]>([]);
        const error = ref<IError>({
            error: false,
            message: "",
        });
        const redirectToUrl = (url: string): void => {
            window.location.href = url;
        };
        axios
            .get<IMusic[]>(`${serverUrl}/api/musics`)
            .then((data) => {
                musics.value = data.data;
            })
            .catch((err) => {
                if (
                    err.response &&
                    err.isAxiosError &&
                    err.response.status === 404
                ) {
                    error.value = {
                        error: true,
                        message: "Musics not found",
                    };
                }
            });
        return {
            musics,
            error,
            redirectToUrl,
        };
    },
});
