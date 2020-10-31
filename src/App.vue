<template>
    <div id="content" role="application">
        <Nav />
        <main>
        <router-view />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from '@/components/Nav.vue';

export default defineComponent({
    name: 'App',
    components: {
        Nav,
    },
});
</script>

<style lang="scss">
*:focus {
    outline: none;
}

body {
    margin: 0;
    box-sizing: border-box;
    min-width: 500px;
}

#content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #1e0237;
    width: 100vw;
    min-width: 650px;
    height: 100vh;
    margin: 0;
    display: grid;
    grid-template-areas: "nav main main main";
    grid-template-columns: 125px auto;

    & main {
        grid-area: main;
        background-color: #1e0237;
        display: grid;
    }
}
</style>
