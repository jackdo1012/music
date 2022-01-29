<template>
    <div class="musics page">
        <div class="music" v-for="music in musics" v-bind:key="music.id">
            <div class="music__title" @click="redirectToUrl(music.url)">
                {{ music.name }}
            </div>
            <div class="music__artist">{{ music.artist }}</div>
            <img
                class="music__thumbnail"
                v-bind:src="
                    'https://img.youtube.com/vi/' + music.vidId + '/0.jpg'
                "
                alt="music-thumbnail"
            />
        </div>
    </div>
</template>

<script lang="ts">
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
            .get<IMusic[]>(`${serverUrl}/musics`)
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
</script>

<style scoped lang="scss">
@use "../assets/scss/variables";
@use "../assets/scss/colors";

.musics {
    .music {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50vw;
        margin: 1.2rem 0 1.2rem 25vw;
        border: 5px solid colors.$dark-border;
        border-radius: 1rem;

        &__title {
            font-size: 1.3rem;
            margin: 1rem;
            color: colors.$dark-primary-color;
            max-width: 100%;
            word-break: break-all;
            text-align: center;
            user-select: none;
            cursor: pointer;
        }

        &__artist {
            font-style: italic;
            text-align: center;
            margin: 0.5rem;
        }

        &__thumbnail {
            user-select: none;
        }
    }
}
</style>
