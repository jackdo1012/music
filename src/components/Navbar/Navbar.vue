<template>
    <div class="navbar">
        <div
            class="navbar-item"
            v-bind:class="[currentRoute === '/' ? 'active' : '']"
            :onClick="() => changeRoute('/')"
        >
            Home
        </div>
        <div
            class="navbar-item"
            v-bind:class="[currentRoute === '/music' ? 'active' : '']"
            :onClick="() => changeRoute('/music')"
        >
            Music
        </div>
        <div
            class="navbar-item"
            v-bind:class="[currentRoute === '/artist' ? 'active' : '']"
            :onClick="() => changeRoute('/artist')"
        >
            Artist
        </div>
    </div>
</template>

<script lang="ts" src="@/components/Navbar/Navbar.ts"></script>

<style scope lang="scss">
@use "../../assets/scss/variables";
@use "../../assets/scss/colors";

.navbar {
    width: 100vw;
    height: variables.$nav-height;
    background-color: colors.$dark-nav;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;

    &-item {
        font-size: 1.25rem;
        color: colors.$dark-text-color;
        text-decoration: none;
        font-family: "Roboto Mono", monospace;
        cursor: pointer;
        &.active {
            color: colors.$dark-primary-color;
        }
    }
}
</style>
