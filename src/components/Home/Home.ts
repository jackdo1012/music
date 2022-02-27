import { defineComponent, ref, onUnmounted } from "vue";
import axios from "axios";
import { IMusic } from "@/types/data";
import { IError } from "@/types/error";
import { BIconVolumeMuteFill, BIconVolumeUpFill } from "bootstrap-icons-vue";
import { serverUrl } from "@/app.config";
import SockJS from "sockjs-client";
import Stomp, { Message } from "webstomp-client";

interface ICurrent {
    name: string;
    artist: string;
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
        const muted = ref<boolean>(true);
        const currentPlaying = ref<ICurrent>({} as ICurrent);
        // eslint-disable-next-line
        const player = ref<any>(null);

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

        const updateList = () => {
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
        };
        updateList();

        // eslint-disable-next-line
        const ytVidOnReady = (e: any) => {
            e.target.setVolume(100);
            e.target.playVideo();
        };

        window.addEventListener("resize", handleResize);
        onUnmounted(() => {
            window.removeEventListener("resize", handleResize);
        });

        const updateMusic = (music: Message) => {
            currentPlaying.value.name = JSON.parse(music.body).song.name;
            if (player.value !== null && player.value !== undefined) {
                player.value.loadVideoById(JSON.parse(music.body).song.vidId);
            } else {
                // eslint-disable-next-line
                player.value = new (window as any).YT.Player("player", {
                    width: 600,
                    height: 400,
                    videoId: JSON.parse(music.body).song.vidId,
                    playerVars: {
                        mute: 1,
                        autoplay: 1,
                        disablekb: 1,
                        rel: 0,
                        fs: 0,
                        modestbranding: 1,
                        controls: 0,
                        start: JSON.parse(music.body).duration,
                    },
                    event: {
                        onReady: ytVidOnReady,
                    },
                });
            }
        };

        // eslint-disable-next-line
        (window as any).onYouTubeIframeAPIReady = () => {
            const socket = new SockJS(`${serverUrl}/ws`);
            const stompClient = Stomp.over(socket, {
                debug: false,
            });

            stompClient.connect({}, () => {
                stompClient.subscribe("/topic/updateTrack", () => {
                    updateList();
                });
                stompClient.subscribe(
                    "/user/topic/playingVideo",
                    (music: Message) => {
                        updateMusic(music);
                    },
                );
                stompClient.subscribe(
                    "/topic/playingVideo",
                    (music: Message) => {
                        updateMusic(music);
                    },
                );
            });
        };

        return {
            musics,
            error,
            playerParam: {
                autoplay: 1,
                disablekb: 1,
                rel: 0,
                fs: 0,
                modestbranding: 1,
                controls: 0,
                start: 4,
                loop: musics.value.length === 1 ? 1 : 0,
            },
            currentPlaying,
            muted,
            player,
            handleMuteUnmute,
        };
    },
});
