<template>
    <Navbar />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar/Navbar.vue";

export default defineComponent({
    name: "App",
    components: {
        Navbar,
    },
});
</script>

<style lang="scss">
@use "./assets/scss/fonts";
@use "./assets/scss/variables";
@use "./assets/scss/colors";

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
.page {
    width: 100vw;
    height: variables.$page-height;
    overflow: scroll;
    background-color: colors.$dark-main-background;
    color: colors.$dark-text-color;
}
html {
    font-size: 16px;
}
@media screen and (max-width: 960px) {
    html {
        font-size: 14px;
    }
}
@media screen and (max-width: 768px) {
    html {
        font-size: 13px;
    }
}
@media screen and (max-width: 410px) {
    html {
        font-size: 11.5px;
    }
}
</style>
