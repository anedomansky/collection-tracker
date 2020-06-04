<template>
    <nav>
        <ul>
            <li>
                <Icon icon="home.svg" altText="Home" to="/" />
            </li>
            <li>
                <Icon icon="videos.svg" altText="Videos" to="/collection/list/videos" />
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
}
</style>
