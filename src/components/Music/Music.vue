<template>
    <div class="musics page">
        <div class="music" v-for="music in musics" v-bind:key="music.id">
            <div class="music__title" @click="redirectToUrl(music.url)">
                {{ music.name }}
            </div>
            <div class="music__artist">{{ music.artist }}</div>
            <img
                class="music__thumbnail"
                v-bind:src="music.thumbnail"
                alt="music-thumbnail"
            />
        </div>
    </div>
</template>

<script lang="ts" src="@/components/Music/Music.ts"></script>

<style scoped lang="scss">
@use "../../assets/scss/variables";
@use "../../assets/scss/colors";

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
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: center;
            user-select: none;
            cursor: pointer;
        }

        &__artist {
            font-style: italic;
            text-align: center;
            margin: 0.5rem;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &__thumbnail {
            width: calc(50vw - 4rem);
            user-select: none;
        }
    }
}
@media screen and (max-width: 960px) {
    .musics {
        .music {
            width: 60vw;
            margin-left: 20vw;
            &__title {
            }

            &__artist {
            }

            &__thumbnail {
                width: calc(60vw - 4rem);
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .musics {
        .music {
            width: 70vw;
            margin-left: 15vw;
            &__title {
            }

            &__artist {
                width: calc(70vw - 4rem);
            }

            &__thumbnail {
                width: calc(70vw - 4rem);
            }
        }
    }
}
@media screen and (max-width: 350px) {
    .musics {
        .music {
            width: 80vw;
            margin-left: 10vw;
            &__title {
            }

            &__artist {
            }

            &__thumbnail {
                width: calc(80vw - 4rem);
            }
        }
    }
}
</style>
