<template>
    <article class="search-details-page">
        <div class="search-details-page__content">
            {{ title }}
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SearchDetailsPage extends Vue {
    @Prop() private title!: string;

    // TODO: get item by title from ResultStore and display it
}
</script>

<style lang="scss" scoped>
.search-details-page {
    color: white;
    display: grid;

    & .search-details-page__content {}
}
</style>
