<template>
    <article class="search-details-page">
        <div class="search-details-page__content">
            <span>{{ category }}</span>
            <span>{{ title }}</span>
        </div>
    </article>
</template>

<script lang="ts">
import RootStore from '@/stores/RootStore';
import { Result } from '@/types/Result';
import { Observer } from 'mobx-vue';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Observer
@Component
export default class SearchDetailsPage extends Vue {
    @Prop() private category!: string;

    @Prop() private title!: string;

    private store = RootStore.resultStore;

    private result: Result = null;

    mounted(): void {
        this.result = this.store.getResultByTitle(this.category, this.title);
    }

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
