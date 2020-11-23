<template>
    <article class="search-result-page">
        <div class="search-result-page__content">
            <div
                class="loading"
                v-if="resultStore.currentUpdatingData"
            >
                <BeatLoader
                    color="#ffffff"
                    :size="loadingSpinnerSize"
                />
            </div>
            <div v-if="noResults">
                No Results
            </div>
            <Item
                v-for="book in resultStore.currentBooks"
                :key="book.cover_i"
                :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                category="Books"
                :title="book.title"
                @onAdd="addToCollection(book)"
                :result="true"
            />
            <Item
                v-for="game in resultStore.currentGames"
                :key="game.id"
                :imageSrc="game.background_image"
                category="Games"
                :title="game.name"
                @onAdd="addToCollection(game)"
                :result="true"
            />
            <Item
                v-for="show in resultStore.currentShows"
                :key="show.show.id"
                :imageSrc="show.show.image && show.show.image.medium"
                category="Shows"
                :title="show.show.name"
                @onAdd="addToCollection(show)"
                :result="true"
            />
        </div>
        <div class="search-result-page__search">
            <Search />
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { BeatLoader } from '@saeris/vue-spinners';
import { CollectionItem } from '@/types/CollectionItem';
import Item from '@/components/Item.vue';
import Search from '@/components/Search.vue';
import { BookCollectionItem } from '@/interfaces/BookCollectionItem';
import { ShowCollectionItem } from '@/interfaces/ShowCollectionItem';
import { GameCollectionItem } from '@/interfaces/GameCollectionItem';
import { RemoveRequest } from '@/interfaces/RemoveRequest';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { ResultItem } from '../types/ResultItem';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

interface State {
    noResults: boolean;
    loadingSpinnerSize: number;
}

export default defineComponent({
    name: 'SearchResultPage',
    components: {
        Search,
        Item,
        BeatLoader,
    },
    props: {
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        term: {
            type: String,
            required: true,
        },
    },
    data: (): State => ({
        noResults: false,
        loadingSpinnerSize: 32,
    }),
    mounted(): void {
        this.getResults(this.$props.category, this.$props.type, this.$props.term);
    },
    beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
        this.getResults(to.params.category, to.params.type, to.params.term);
        next();
    },
    methods: {
        getResults(category: string | string[], type: string | string[], term: string | string[]): void {
            // this.resultStore.reset();
            // this.resultStore.setUpdatingData(true);
            // this.noResults = false;
            // const resultInfo: IResultInfo = {
            //     type,
            //     term,
            // };
            // if (category === Categories.BOOKS) {
            //     ipcRenderer.invoke(`/get${category}`, resultInfo)
            //         .then((results: IBookResult[]) => {
            //             this.resultStore.setUpdatingData(false);
            //             this.resultStore.setBooks(results);
            //         })
            //         .catch((error: Error) => {
            //             this.resultStore.setUpdatingData(false);
            //             this.noResults = true;
            //             console.error(error);
            //         });
            // }
            // if (category === Categories.GAMES) {
            //     ipcRenderer.invoke(`/get${category}`, resultInfo)
            //         .then((results: IGameResult[]) => {
            //             this.resultStore.setUpdatingData(false);
            //             this.resultStore.setGames(results);
            //         })
            //         .catch((error: Error) => {
            //             this.resultStore.setUpdatingData(false);
            //             this.noResults = true;
            //             console.error(error);
            //         });
            // }
            // if (category === Categories.SHOWS) {
            //     ipcRenderer.invoke(`/get${category}`, resultInfo)
            //         .then((results: IShowResponse[]) => {
            //             this.resultStore.setUpdatingData(false);
            //             this.resultStore.setShows(results);
            //         })
            //         .catch((error: Error) => {
            //             this.resultStore.setUpdatingData(false);
            //             this.noResults = true;
            //             console.error(error);
            //         });
            // }
        },
        addToCollection(resultItem: ResultItem): void {
            // console.log('Added item');
            // let entry: CollectionItem;
            // if (this.type === 'books') {
            //     const bookEntry = resultItem as IBookResult;
            //     entry = {
            //         author_name: bookEntry.author_name[0],
            //         cover_i: bookEntry.cover_i,
            //         title: bookEntry.title,
            //         first_publish_year: bookEntry.first_publish_year,
            //     } as IBookCollectionItem;
            //     ipcRenderer.invoke('/addEntry', {
            //         type: this.type,
            //         entry,
            //     } as IEntryRequest)
            //         .then((message: string) => {
            //             console.log(message);
            //             this.collectionStore.setUpdatingData(false);
            //         })
            //         .catch((error: Error) => {
            //             this.collectionStore.setUpdatingData(false);
            //             console.error(error);
            //         });
            // }
            // if (this.type === 'shows') {
            //     const showEntry = resultItem as IShowResponse;
            //     entry = {
            //         name: showEntry.show.name,
            //         premiered: showEntry.show.premiered.toLocaleDateString(),
            //         officialSite: showEntry.show.officialSite,
            //         status: showEntry.show.status,
            //         summary: showEntry.show.summary,
            //         image_medium: showEntry.show.image.medium || '',
            //         image_original: showEntry.show.image.original || '',
            //     };
            //     ipcRenderer.invoke('/addEntry', {
            //         type: this.type,
            //         entry,
            //     } as IEntryRequest)
            //         .then((message: string) => {
            //             console.log(message);
            //             this.collectionStore.setUpdatingData(false);
            //         })
            //         .catch((error: Error) => {
            //             this.collectionStore.setUpdatingData(false);
            //             console.error(error);
            //         });
            // }
            // if (this.type === 'games') {
            //     const gameEntry = resultItem as IGameResult;
            //     entry = {
            //         name: gameEntry.name,
            //         background_image: gameEntry.background_image,
            //         released: gameEntry.released.toLocaleDateString(),
            //         rating: gameEntry.rating,
            //         rating_top: gameEntry.rating_top,
            //     };
            //     ipcRenderer.invoke('/addEntry', {
            //         type: this.type,
            //         entry,
            //     } as IEntryRequest)
            //         .then((message: string) => {
            //             console.log(message);
            //             this.collectionStore.setUpdatingData(false);
            //         })
            //         .catch((error: Error) => {
            //             this.collectionStore.setUpdatingData(false);
            //             console.error(error);
            //         });
            // }
        },
    },
    setup(props) {
        const categoryRef = toRefs(props).category;
        const typeRef = toRefs(props).type;
        const termRef = toRefs(props).term;

        // expose to template
        return {
            categoryRef,
            typeRef,
            termRef,
        };
    },
});
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
