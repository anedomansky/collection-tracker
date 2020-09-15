<template>
    <article class="search-result-page">
        <div class="search-result-page__content">
            <div class="loading" v-if="store.currentUpdatingData">
                <BeatLoader color="#ffffff" :size="loadingSpinnerSize" />
            </div>
            <div v-if="noResults">No Results</div>
            <Item
                v-for="book in store.currentBooks"
                :key="book.cover_i"
                :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                category="Books"
                :title="book.title"
                @onAdd="addToCollection"
                :result="true"
            />
            <Item
                v-for="game in store.currentGames"
                :key="game.id"
                :imageSrc="game.background_image"
                category="Games"
                :title="game.name"
                @onAdd="addToCollection"
                :result="true"
            />
            <Item
                v-for="show in store.currentShows"
                :key="show.show.id"
                :imageSrc="show.show.image && show.show.image.medium"
                category="Shows"
                :title="show.show.name"
                @onAdd="addToCollection"
                :result="true"
            />
        </div>
        <div class="search-result-page__search">
            <Search />
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { Route, NavigationGuardNext } from 'vue-router';
import { BeatLoader } from '@saeris/vue-spinners';
import Search from './Search.vue';
import RootStore from '../stores/RootStore';
import { IResultInfo } from '../interfaces/IResultInfo';
import { IBookResult } from '../interfaces/IBookResult';
import { IGameResult } from '../interfaces/IGameResult';
import { IShowResponse } from '../interfaces/IShowResponse';
import Categories from '../enums/Categories';
import Item from './Item.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

@Observer
@Component({
    components: {
        Search,
        Item,
        BeatLoader,
    },
})
export default class SearchResultPage extends Vue {
    @Prop() private category!: string;

    @Prop() private type!: string;

    @Prop() private term!: string;

    private store = RootStore.resultStore;

    private noResults = false;

    private loadingSpinnerSize = 32;

    mounted(): void {
        this.getResults(this.category, this.type, this.term);
    }

    beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext): void {
        this.getResults(to.params.category, to.params.type, to.params.term);
        next();
    }

    getResults(category: string, type: string, term: string): void {
        console.log(category, type, term);
        this.store.reset();
        this.store.setUpdatingData(true);
        this.noResults = false;
        const resultInfo: IResultInfo = {
            type,
            term,
        };
        if (category === Categories.BOOKS) {
            ipcRenderer.invoke(`/get${category}`, resultInfo)
                .then((results: IBookResult[]) => {
                    this.store.setUpdatingData(false);
                    this.store.setBooks(results);
                })
                .catch((error: Error) => {
                    this.store.setUpdatingData(false);
                    this.noResults = true;
                    console.error(error);
                });
        }
        if (category === Categories.GAMES) {
            ipcRenderer.invoke(`/get${category}`, resultInfo)
                .then((results: IGameResult[]) => {
                    this.store.setUpdatingData(false);
                    this.store.setGames(results);
                })
                .catch((error: Error) => {
                    this.store.setUpdatingData(false);
                    this.noResults = true;
                    console.error(error);
                });
        }
        if (category === Categories.SHOWS) {
            ipcRenderer.invoke(`/get${category}`, resultInfo)
                .then((results: IShowResponse[]) => {
                    console.log(results);
                    this.store.setUpdatingData(false);
                    this.store.setShows(results);
                })
                .catch((error: Error) => {
                    this.store.setUpdatingData(false);
                    this.noResults = true;
                    console.error(error);
                });
        }
    }

    addToCollection(): void {
        console.log('Added item');
    }
}
</script>

<style lang="scss" scoped>
.search-result-page {
    display: grid;
    grid-template-areas:
    "content"
    "search";
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    height: 100%;
    width: calc(100% - 125px);
    position: absolute;

    .search-result-page__content {
        grid-area: content;
        max-height: 100%;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        color: #ffffff;

        .loading {
            margin: auto;
        }

        div {
            margin: 1rem;
        }
    }

    .search-result-page__search {
        grid-area: search;
        padding: 1rem;
    }
}
</style>
