<template>
    <div class="artists page">
        <input class="artist-search" v-model="searchValue" type="text" />
        <div
            class="artist"
            v-for="(artist, i) in artists"
            v-bind:key="artist.id"
        >
            <div
                v-bind:for="'toggle-song-' + artist.id"
                class="artist__name"
                :ref="
                    (el) => {
                        artistRefs[i] = el;
                    }
                "
            >
                {{ artist.name }}
            </div>
            <div class="artist__songs">
                <div
                    class="artist__songs--song"
                    v-for="song in artist.songs"
                    v-bind:key="song.id"
                >
                    <div
                        class="song__clickable-img"
                        @click="moveToUrl(song.url)"
                    >
                        <img
                            v-bind:src="
                                'https://img.youtube.com/vi/' +
                                song.vidId +
                                '/0.jpg'
                            "
                            class="song__clickable-img--thumbnail"
                        />
                    </div>
                    <div class="song__name">{{ song.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
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
        let artistRefs = ref<HTMLFormElement[]>([]);

        const moveToUrl = (url: string): void => {
            window.location.href = url;
        };

        watch(searchValue, (searchValue, prevSearchValue) => {
            if (searchValue !== prevSearchValue) {
                axios
                    .get<IArtist[]>(`${serverUrl}/artists/${searchValue}`)
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
            .get<IArtist[]>(`${serverUrl}/artists`)
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
</script>

<style scoped lang="scss">
@use "../assets/scss/variables";
@use "../assets/scss/colors";

.artists {
    .artist-search {
        width: 50vw;
        margin: 1rem auto 1rem 25vw;
        background-color: colors.$dark-nav;
        border: 2px solid colors.$dark-border;
        font-size: 1.5rem;
        color: colors.$dark-text-color;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
    }
    .artist {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 50vw;
        margin: 1.2rem 0 1.2rem 25vw;
        border: 5px solid colors.$dark-border;
        border-radius: 1rem;

        &__name {
            padding: 0.5rem;
            font-size: 1.2rem;
            user-select: none;
            cursor: pointer;
            color: colors.$dark-primary-color;
            width: calc(50vw - 5rem);
            word-break: break-all;

            &::after {
                content: "";
                display: inline-block;
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;

                border-left: 6px solid colors.$dark-primary-color;
                margin-left: 0.5rem;
                transform: rotate(0);
                transition: transform 0.3s ease-in-out;
            }
            &.open {
                &::after {
                    transform: rotate(90deg);
                }
            }
        }
        &__songs {
            overflow: hidden;
            width: 100%;
            height: 0;
            transition: height 0.5s ease-in-out;

            &--song {
                height: 100px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                padding: 1rem;
                gap: 0.3rem;

                .song__clickable-img {
                    height: 100px;
                    cursor: pointer;
                    &--thumbnail {
                        height: 100px;
                        object-fit: cover;
                    }
                }
                .song__name {
                    word-break: break-all;
                }
            }
        }
    }
}
</style>
