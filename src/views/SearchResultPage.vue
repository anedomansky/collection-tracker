<template>
    <article class="search-result-page">
        <div class="search-result-page__content">
            <div
                class="loading"
                v-if="resultStore.state.updatingData"
            >
                Loading ...
            </div>
            <div v-if="state.noResults">
                No Results
            </div>
            <Item
                v-for="book in resultStore.state.books"
                :key="book.cover_i"
                :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                category="Books"
                :title="book.title"
                @onAdd="addToCollection(book)"
                :result="true"
            />
            <Item
                v-for="game in resultStore.state.games"
                :key="game.id"
                :imageSrc="game.background_image"
                category="Games"
                :title="game.name"
                @onAdd="addToCollection(game)"
                :result="true"
            />
            <Item
                v-for="show in resultStore.state.shows"
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
import {
    defineComponent,
    onMounted,
    reactive,
    toRefs,
} from 'vue';
import { CollectionItem } from '@/types/CollectionItem';
import Item from '@/components/Item.vue';
import Search from '@/components/Search.vue';
import { BookCollectionItem } from '@/interfaces/BookCollectionItem';
import { ShowCollectionItem } from '@/interfaces/ShowCollectionItem';
import { GameCollectionItem } from '@/interfaces/GameCollectionItem';
import { RemoveRequest } from '@/interfaces/RemoveRequest';
import { NavigationGuardNext, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
import { ResultItem } from '../types/ResultItem';
import ResultStore from '../store/ResultStore';
import { ResultInfo } from '../interfaces/ResultInfo';
import Categories from '../enums/Categories';
import { BookResult } from '../interfaces/BookResult';
import { GameResult } from '../interfaces/GameResult';
import { ShowResponse } from '../interfaces/ShowResponse';

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
    setup(props) {
        const categoryRef = toRefs(props).category;
        const typeRef = toRefs(props).type;
        const termRef = toRefs(props).term;

        const state: State = reactive({
            noResults: false,
            loadingSpinnerSize: 32,
        });

        const resultStore = ResultStore;

        const getResults = (category: string, type: string, term: string): void => {
            resultStore.reset();
            resultStore.setUpdatingData(true);
            state.noResults = false;
            const resultInfo: ResultInfo = {
                type,
                term,
            };
            if (category === Categories.BOOKS) {
                ipcRenderer.invoke(`/get${category}`, resultInfo)
                    .then((results: BookResult[]) => {
                        resultStore.setUpdatingData(false);
                        resultStore.setBooks(results);
                    })
                    .catch((error: Error) => {
                        resultStore.setUpdatingData(false);
                        state.noResults = true;
                        console.error(error);
                    });
            } else if (category === Categories.GAMES) {
                ipcRenderer.invoke(`/get${category}`, resultInfo)
                    .then((results: GameResult[]) => {
                        resultStore.setUpdatingData(false);
                        resultStore.setGames(results);
                    })
                    .catch((error: Error) => {
                        resultStore.setUpdatingData(false);
                        state.noResults = true;
                        console.error(error);
                    });
            } else {
                ipcRenderer.invoke(`/get${category}`, resultInfo)
                    .then((results: ShowResponse[]) => {
                        resultStore.setUpdatingData(false);
                        resultStore.setShows(results);
                    })
                    .catch((error: Error) => {
                        resultStore.setUpdatingData(false);
                        state.noResults = true;
                        console.error(error);
                    });
            }
        };

        const addToCollection = (resultItem: ResultItem): void => {
            console.log('Added item', resultItem);
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
        };

        onMounted(() => {
            getResults(props.category, props.type, props.term);
        });

        onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            const category = to.params.category as string;
            const type = to.params.type as string;
            const term = to.params.term as string;
            getResults(category, type, term);
            next();
        });

        // expose to template
        return {
            categoryRef,
            typeRef,
            termRef,
            state,
            resultStore,
            addToCollection,
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
