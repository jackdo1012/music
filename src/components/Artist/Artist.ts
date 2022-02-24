import { defineComponent, ref, onUpdated, watch } from "vue";
import axios from "axios";
import { IArtist } from "@/types/data";
import { IError } from "@/types/error";
import { serverUrl } from "@/app.config";

export default defineComponent({
    name: "Artist",
    setup() {
        const artists = ref<IArtist[]>([]);
        const error = ref<IError>({
            error: false,
            message: "",
        });
        const searchValue = ref<string>("");
        const artistRefs = ref<HTMLFormElement[]>([]);

        const moveToUrl = (url: string): void => {
            window.location.href = url;
        };

        watch(searchValue, (searchValue, prevSearchValue) => {
            if (searchValue !== prevSearchValue) {
                axios
                    .get<IArtist[]>(`${serverUrl}/api/artists/${searchValue}`)
                    .then((data) => {
                        artists.value = data.data;
                    })
                    .catch((err) => {
                        if (
                            err.response &&
                            err.isAxiosError &&
                            err.response.status === 404
                        ) {
                            artists.value = [];
                        }
                    });
            }
        });
        onUpdated(() => {
            Array.from(artistRefs.value).forEach((element: HTMLElement) => {
                if (element && element.nextElementSibling) {
                    const nextEle = element.nextElementSibling as HTMLElement;
                    const arr: HTMLElement[] = Array.from(
                        nextEle.childNodes,
                    ) as HTMLElement[];
                    arr.pop();
                    arr.shift();

                    let height = "0";
                    if (arr.length > 1) {
                        arr.forEach((ele) => {
                            height = (
                                Number(height) + ele.offsetHeight
                            ).toString();
                        });
                    } else {
                        height = arr[0].offsetHeight.toString();
                    }
                    height = height + "px";
                    element.onclick = function () {
                        if (nextEle && nextEle.style.height === height) {
                            element.classList.remove("open");
                            nextEle.style.height = "0";
                        } else {
                            element.classList.add("open");
                            nextEle.style.height = height;
                        }
                    };
                }
            });
        });

        axios
            .get<IArtist[]>(`${serverUrl}/api/artists`)
            .then((data) => {
                artists.value = data.data;
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
            artists,
            error,
            moveToUrl,
            artistRefs,
            searchValue,
        };
    },
});
