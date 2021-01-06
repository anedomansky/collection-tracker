<template>
    <article class="landing-page">
        <div class="landing-page__content">
            <Search />
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Search from '@/components/Search.vue'; // @ is an alias to /src

export default defineComponent({
    name: 'LandingPage',
    components: {
        Search,
    },
});
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
