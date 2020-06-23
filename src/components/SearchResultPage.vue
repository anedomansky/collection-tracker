<template>
    <article class="search-result-page">
        <div class="search-result-page__content">
            <div>CollectionItem1 {{ category }}</div>
            <div>CollectionItem3 {{ type }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem4</div>
            <div>CollectionItem5</div>
            <div>CollectionItem6</div>
            <div>CollectionItem7</div>
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SearchResultPage extends Vue {
    @Prop() private category!: string;

    @Prop() private type!: string;

    @Prop() private term!: string;
}
</script>

<style lang="scss" scoped>
.search-result-page {
    & .search-result-page__content {
        display: flex;
        flex-wrap: wrap;
        color: #ffffff;

        & div {
            flex: 0 0 21%;
            margin: 5px;
        }
    }
}
</style>
