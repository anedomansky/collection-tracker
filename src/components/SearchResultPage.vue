<template>
    <article class="search-result-page">
        <div class="search-result-page__content">
            <div>CollectionItem1 {{ category }}</div>
            <div>CollectionItem3 {{ type }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div v-for="book in store.currentBooks" :key="book.cover_i">{{ book.title }}</div>
            <!-- <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div>
            <div>CollectionItem2 {{ term }}</div> -->
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
import { IResultInfo } from '../interfaces/IResultInfo';
import { IBookResult } from '../interfaces/IBookResult';
import { IGameResult } from '../interfaces/IGameResult';
import { IShowResponse } from '../interfaces/IShowResponse';
import { IPeopleResponse } from '../interfaces/IPeopleResponse';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

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

    private store = RootStore.resultStore;

    private noData = false;

    mounted(): void {
        this.noData = false;
        const resultInfo: IResultInfo = {
            type: this.type,
            term: this.term,
        };
        console.log('Mounted: ', resultInfo);
        console.log(`/get${this.category}`);
        ipcRenderer.on('BOOK_RESULT_DATA', (event: never, results: IBookResult[]) => {
            // TODO: set updatingData = false
            this.store.setBooks(results);
            console.log('BOOKS:', this.store.currentBooks);
        });
        ipcRenderer.on('SHOW_RESULT_DATA', (event: never, results: IShowResponse[]) => {
            // TODO: set updatingData = false
            this.store.setShows(results);
            console.log('SHOWS:', this.store.currentShows);
        });
        ipcRenderer.on('PEOPLE_RESULT_DATA', (event: never, results: IPeopleResponse[]) => {
            // TODO: set updatingData = false
            this.store.setPeople(results);
            console.log('PEOPLE: ', this.store.currentPeople);
        });
        ipcRenderer.on('GAME_RESULT_DATA', (event: never, results: IGameResult[]) => {
            // TODO: set updatingData = false
            this.store.setGames(results);
            console.log('GAMES:', this.store.currentGames);
        });
        ipcRenderer.on('NO_DATA', (event: never, message: string) => {
            // TODO: set updatingData = false
            // TODO: set noData = true
            console.error(message);
        });
        ipcRenderer.send(`/get${this.category}`, resultInfo);
    }

    updated(): void {
        this.noData = false;
        const resultInfo: IResultInfo = {
            type: this.type,
            term: this.term,
        };
        console.log('Updated: ', resultInfo);
        console.log(`/get${this.category}`);
        ipcRenderer.send(`/get${this.category}`, resultInfo);
    }

    beforeDestroy(): void {
        ipcRenderer.removeAllListeners('BOOK_RESULT_DATA');
        ipcRenderer.removeAllListeners('SHOW_RESULT_DATA');
        ipcRenderer.removeAllListeners('PEOPLE_RESULT_DATA');
        ipcRenderer.removeAllListeners('GAME_RESULT_DATA');
        ipcRenderer.removeAllListeners('NO_DATA');
    }

    // addToCollection(item: any) {
    //     // TODO: implement me - @onAdd="addToCollection" on ResultItem
    // }

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
    grid-template-columns: repeat(4, 1fr);
    height: 100%;
    width: calc(100% - 125px);
    position: absolute;

    & .search-result-page__content {
        grid-area: content;
        max-height: 100%;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        color: #ffffff;

        & div {
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
