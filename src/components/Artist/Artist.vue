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
                            v-bind:src="song.thumbnail"
                            class="song__clickable-img--thumbnail"
                        />
                    </div>
                    <div class="song__name">{{ song.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="@/components/Artist/Artist.ts"></script>

<style scoped lang="scss">
@use "../../assets/scss/variables";
@use "../../assets/scss/colors";

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
                padding: 1rem 0;
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
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
}
@media screen and (max-width: 960px) {
    .artists {
        .artist-search {
            width: 60vw;
            margin-left: 20vw;
        }
        .artist {
            width: 60vw;
            margin-left: 20vw;
        }
    }
}
@media screen and (max-width: 768px) {
    .artists {
        .artist-search {
            width: 70vw;
            margin-left: 15vw;
        }
        .artist {
            width: 70vw;
            margin-left: 15vw;
            &__songs {
                &--song {
                    gap: 0.4rem;
                    .song__clickable-img {
                        height: 80px;
                        &--thumbnail {
                            height: 80px;
                        }
                    }
                    .song__name {
                        width: calc(80vw - 5rem - (80px * 1.765432));
                    }
                }
            }

        }
    }
}
@media screen and (max-width: 350px) {
    .artists {
        .artist-search {
            width: 80vw;
            margin-left: 10vw;
        }
        .artist {
            width: 80vw;
            margin-left: 10vw;
            &__songs {
                &--song {
                    .song__clickable-img {
                        height: 80px;
                        &--thumbnail {
                            height: 80px;
                        }
                    }
                    .song__name {
                        width: calc(80vw - 5rem - (80px * 1.765432));
                    }
                }
            }
        }
    }
}
</style>
