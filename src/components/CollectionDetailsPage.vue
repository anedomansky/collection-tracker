<template>
    <article class="collection-details-page">
        <div class="collection-details-page__content">
            
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CollectionDetailsPage extends Vue {
    @Prop() private title!: string;

    // TODO: get item by title from CollectionStore and display it
}
</script>

<style lang="scss" scoped>
.collection-details-page {
    display: grid;

    & .collection-details-page__content {}
}
</style>
