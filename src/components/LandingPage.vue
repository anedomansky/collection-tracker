<template>
    <article class="landing-page">
        <div class="landing-page__content">
            <Search />
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Search from './Search.vue';

@Component({
    components: {
        Search,
    },
})
export default class LandingPage extends Vue {}
</script>

<style lang="scss" scoped>
.landing-page {
    display: grid;
    grid-template-areas:
    ". . . . . ."
    ". content content content content ."
    ". content content content content ."
    ". . . . . .";
    grid-template-rows: 1fr 1fr 1fr 1fr;

    & .landing-page__content {
        grid-area: content;
    }
}
</style>
