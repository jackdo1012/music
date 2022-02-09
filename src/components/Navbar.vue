<template>
    <div class="navbar">
        <a class="navbar-item" href="/">Home</a>
        <router-link class="navbar-item" to="/music">Music</router-link>
        <router-link class="navbar-item" to="/artist">Artist</router-link>
    </div>
</template>

<script lang="ts" src="@/components/Navbar.ts"></script>

<style scope lang="scss">
@use "../assets/scss/variables";
@use "../assets/scss/colors";

.navbar {
    width: 100vw;
    height: variables.$nav-height;
    background-color: colors.$dark-nav;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    user-select: none;

    a {
        font-size: 1.25rem;
        color: colors.$dark-text-color;
        text-decoration: none;
        font-family: "Roboto Mono", monospace;
        &:visited {
            color: colors.$dark-text-color;
            text-decoration: none;
        }
    }
}
</style>
