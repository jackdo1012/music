<template>
    <div class="homepage page">
        <h1 class="title">Jack Do's Music Page</h1>
        <p class="description">
            Hi, I'm Jack Do and this is some of my favorite music.
        </p>
        <div class="main-page">
            <div class="player">
                <div class="player__muted" @click="handleMuteUnmute">
                    <BIconVolumeMuteFill v-if="muted" />
                    <BIconVolumeUpFill v-else />
                </div>
                <youtube-iframe
                    class="player__iframe"
                    v-if="musics[0] !== undefined"
                    :video-id="musics[0].vidId"
                    :player-parameters="plyerParam"
                    ref="player"
                    @state-change="handleStateChange"
                ></youtube-iframe>
                <div
                    v-if="musics[musicIndex] !== undefined"
                    class="player__title"
                    :key="musicIndex"
                >
                    {{ musics[musicIndex].name }}
                </div>
            </div>
            <div class="musics">
                <div
                    class="music"
                    v-for="music in musics"
                    v-bind:key="music.id"
                >
                    <img
                        class="music__thumbnail"
                        v-bind:src="
                            'https://img.youtube.com/vi/' +
                            music.vidId +
                            '/0.jpg'
                        "
                        alt="music-thumbnail"
                    />
                    <div class="music__info">
                        <div class="music__info--title">
                            {{ music.name }}
                        </div>
                        <div class="music__info--artist">
                            {{ music.artist }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import axios from "axios";
import { IMusic } from "@/types/data";
import { IError } from "@/types/error";
import { BIconVolumeMuteFill, BIconVolumeUpFill } from "bootstrap-icons-vue";
import { Player } from "@techassi/vue-youtube-iframe";
import { serverUrl } from "@/app.config";

interface IIframeData {
    data: number;
    target: HTMLIFrameElement;
}

export default defineComponent({
    name: "Home",
    components: {
        BIconVolumeMuteFill,
        BIconVolumeUpFill,
    },
    setup() {
        const musics = ref<IMusic[]>([]);
        const error = ref<IError>({
            error: false,
            message: "",
        });
        const windowWidth = ref<number>(window.innerWidth);
        const musicIndex = ref<number>(0);
        const muted = ref<boolean>(true);
        const player = ref<typeof Player>();

        const handleStateChange = (data: IIframeData): void => {
            if (data.data === 0) {
                const now = musicIndex.value;
                const next = (now + 1) % musics.value.length;
                musicIndex.value = next;
                player.value &&
                    player.value.loadVideoById(musics.value[next].vidId);
            }
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
        const handleResize = () => {
            windowWidth.value = window.innerWidth;
        };
        const handleMuteUnmute = () => {
            if (player.value) {
                if (player.value.isMuted()) {
                    player.value.unMute();
                    player.value.setVolume(100);
                    muted.value = false;
                } else {
                    player.value.mute();
                    muted.value = true;
                }
            }
        };
        window.addEventListener("resize", handleResize);
        onUnmounted(() => {
            window.removeEventListener("resize", handleResize);
        });
        return {
            musics,
            error,
            musicIndex,
            plyerParam: {
                autoplay: 1,
                disablekb: 1,
                rel: 0,
                fs: 0,
                modestbranding: 1,
                controls: 0,
                loop: musics.value.length === 1 ? 1 : 0,
            },
            handleStateChange,
            muted,
            player,
            handleMuteUnmute,
        };
    },
});
</script>

<style lang="scss">
@use "../assets/scss/colors";
@use "../assets/scss/variables";
@use "../assets/scss/fonts";

.homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        text-align: center;
        padding: 2rem;
        font-size: 2.5rem;
        color: colors.$dark-primary-color;
        font-family: "Roboto Mono", monospace;
        user-select: none;
    }
    .description {
        text-align: center;
        font-style: italic;
        user-select: none;
    }
    .main-page {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        width: 100vw;
        max-width: 1600px;
        margin-top: 2rem;

        .player {
            height: calc(variables.$page-height - 20vh);
            width: clamp(240px, 50vw, 800px);
            border: 5px solid colors.$dark-border;
            border-radius: 1rem;
            padding: 1rem;
            &__muted {
                user-select: none;
                cursor: pointer;
                width: 3rem;
                height: 3rem;
                position: relative;
                svg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }
            }
            &__iframe {
                user-select: none;
                pointer-events: none;
                user-select: none;
                width: 100%;
                height: 0;
                position: relative;
                padding-bottom: 56.25%;
                border: 1px solid colors.$dark-border;

                iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
            &__title {
                font-size: 1.5rem;
                font-family: "Roboto Mono", monospace;
                padding: 1rem;
                text-align: center;
                word-break: break-all;
            }
        }

        .musics {
            height: calc(variables.$page-height - 20vh);
            background-color: colors.$dark-grey;
            border-radius: 1rem;
            padding: 1rem;
            overflow: scroll;
            width: clamp(160px, 30vw, calc(1600px / 3));

            .music {
                height: 8rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.5rem;

                &__thumbnail {
                    height: 5rem;
                    user-select: none;
                }
                &__info {
                    &--title {
                        width: calc(
                            clamp(160px, 30vw, calc(1600px / 3)) - 2.5rem -
                                (5rem * 1.33325)
                        );
                        overflow: hidden;
                        font-size: 1.1rem;
                        text-overflow: ellipsis;
                    }
                    &--artist {
                        width: calc(
                            clamp(160px, 30vw, calc(1600px / 3)) - 2.5rem -
                                (5rem * 1.33325)
                        );
                        overflow: hidden;
                        text-overflow: ellipsis;
                        opacity: 0.8;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 960px) {
    .homepage {
        .title {
            font-size: 3rem;
        }
        .description {
            font-size: 1.2rem;
        }
        .main-page {
            .player {
                width: 55vw;
                &__muted {
                    width: 2.5rem;
                    height: 2.5rem;
                }
            }
            .musics {
                width: 35vw;
                .music {
                    flex-direction: column;
                    height: auto;
                    padding: 1rem 0;
                    &__thumbnail {
                        height: 6rem;
                    }
                    &__info {
                        width: 100%;
                        text-align: center;
                        height: 6rem;
                        &--title {
                            width: calc(35vw - 2.5rem);
                            text-align: center;
                            margin-bottom: 0.5rem;
                        }
                        &--artist {
                            width: calc(35vw - 2.5rem);
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .homepage {
        .title {
            font-size: 2.5rem;
        }
        .main-page {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;

            .player {
                width: 90vw;
                height: fit-content;
                &__muted {
                    width: 4rem;
                    height: 4rem;
                }
                &__title {
                    font-size: 1.6rem;
                }
            }
            .musics {
                width: 90vw;
                .music {
                    flex-direction: row;
                    justify-content: space-around;

                    &__thumbnail {
                        height: 7rem;
                    }
                    &__info {
                        height: 7rem;
                        &--title {
                            text-align: left;
                            width: calc(90vw - 2.5rem - (7rem * 1.33325));
                        }

                        &--artist {
                            text-align: left;
                            width: calc(90vw - 2.5rem - (7rem * 1.33325));
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 350px) {
    .homepage {
        .main-page {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;

            .player {
                width: 90vw;
                height: fit-content;
                &__muted {
                    width: 4rem;
                    height: 4rem;
                }
                &__title {
                    font-size: 1.6rem;
                }
            }
            .musics {
                width: 90vw;
                .music {
                    flex-direction: row;
                    justify-content: space-around;

                    &__thumbnail {
                        height: 7rem;
                    }
                    &__info {
                        &--title {
                            text-align: left;
                            max-height: 4rem;
                            width: calc(90vw - 2.5rem - (7rem * 1.33325));
                        }

                        &--artist {
                            text-align: left;
                            max-height: 3rem;
                            width: calc(90vw - 2.5rem - (7rem * 1.33325));
                        }
                    }
                }
            }
        }
    }
}
</style>
