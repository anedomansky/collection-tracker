<template>
    <article class="search-result-page">
        <div class="search-result-page__content">
            <div>CollectionItem1 {{ category }}</div>
            <div>CollectionItem3 {{ type }}</div>
            <div>CollectionItem2 {{ term }}</div>
        </div>
        <div class="search-result-page__search">
            <Search />
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import Search from './Search.vue';
import RootStore from '../stores/RootStore';

@Observer
@Component({
    components: {
        Search,
    },
})
export default class SearchResultPage extends Vue {
    @Prop() private category!: string;

    @Prop() private type!: string;

    @Prop() private term!: string;

    store = RootStore.resultStore;

    addToCollection(item: any) {
        // TODO: implement me - @onAdd="addToCollection" on ResultItem
    }

    // TODO: create ResultStore and add all fetched items
}
</script>

<style lang="scss" scoped>
.search-result-page {
    display: grid;
    grid-template-areas:
    "content content content content"
    "search search search search";
    grid-template-rows: auto min-content;
    height: 100%;
    position: absolute;

    & .search-result-page__content {
        grid-area: content;
        max-height: 100%;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        color: #ffffff;

        & div {
            flex: 0 1 21%;
            margin: 1rem;
            height: 200px;
        }
    }

    & .search-result-page__search {
        grid-area: search;
        padding: 1rem;
    }
}
</style>
