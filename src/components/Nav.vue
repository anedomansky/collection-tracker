<template>
    <nav>
        <ul>
            <li>
                <Icon icon="home.svg" altText="Home" to="/" />
            </li>
            <li>
                <Icon icon="videos.svg" altText="Videos" to="/collection/list/videos" />
            </li>
            <li>
                <Icon icon="games.svg" altText="Games" to="/collection/list/games" />
            </li>
            <li>
                <Icon icon="books.svg" altText="Books" to="/collection/list/books" />
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from './Icon.vue';

@Component({
    components: {
        Icon,
    },
})
export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
nav {
    grid-area: nav;
    background-color: #FFFFFF;

    & ul {
        padding: 0;
        list-style-type: none;

        & li {
            margin: 0 1rem 3rem 1rem;
        }

        & li:last-of-type {
            margin-bottom: 0;
        }
    }
}
</style>
