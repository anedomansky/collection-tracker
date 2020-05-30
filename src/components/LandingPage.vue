<template>
    <article class="landing-page">
        <div class="landing-page__content">
            LandingPage works!
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LandingPage extends Vue {}
</script>

<style lang="scss" scoped>
.landing-page {
    display: grid;
    grid-template-areas:
    ". . . ."
    ". content content ."
    ". content content ."
    ". . . .";

    & .landing-page__content {
        grid-area: content;
    }
}
</style>
