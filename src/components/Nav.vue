<template>
    <nav>
        <ul>
            <li>
                <NavIcon
                    icon="home.svg"
                    altText="Home"
                    to="/"
                />
            </li>
            <li>
                <NavIcon
                    icon="videos.svg"
                    altText="Shows"
                    to="/collection/list/shows"
                />
            </li>
            <li>
                <NavIcon
                    icon="games.svg"
                    altText="Games"
                    to="/collection/list/games"
                />
            </li>
            <li>
                <NavIcon
                    icon="books.svg"
                    altText="Books"
                    to="/collection/list/books"
                />
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavIcon from '@/components/NavIcon.vue';

export default defineComponent({
    name: 'Nav',
    components: {
        NavIcon,
    },
});
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
