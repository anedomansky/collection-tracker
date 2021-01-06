<template>
    <article class="collection-list-page">
        <div class="collection-list-page__content">
            <div
                class="loading"
                v-if="collectionStore.state.updatingData"
            >
                Loading ...
            </div>
            <div v-if="state.noResults">
                No Collection Items found!
            </div>
            <template v-if="categoryRef === 'books'">
                <Item
                    v-for="book in collectionStore.state.books"
                    :key="book.cover_i"
                    :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                    category="Books"
                    :title="book.title"
                    @on-remove="removeFromCollection(book)"
                    :result="false"
                />
            </template>
            <template v-if="categoryRef === 'games'">
                <Item
                    v-for="game in collectionStore.state.games"
                    :key="game.id"
                    :imageSrc="game.background_image"
                    category="Games"
                    :title="game.name"
                    @on-remove="removeFromCollection(game)"
                    :result="false"
                />
            </template>
            <template v-if="categoryRef === 'shows'">
                <Item
                    v-for="show in collectionStore.state.shows"
                    :key="show.id"
                    :imageSrc="show.image_medium"
                    category="Shows"
                    :title="show.name"
                    @on-remove="removeFromCollection(show)"
                    :result="false"
                />
            </template>
        </div>
    </article>
</template>

<script lang="ts">
import {
    defineComponent, onMounted, reactive, toRefs,
} from 'vue';
import { CollectionItem } from '@/types/CollectionItem';
import Item from '@/components/Item.vue';
import { BookCollectionItem } from '@/interfaces/BookCollectionItem';
import { ShowCollectionItem } from '@/interfaces/ShowCollectionItem';
import { GameCollectionItem } from '@/interfaces/GameCollectionItem';
import { RemoveRequest } from '@/interfaces/RemoveRequest';
import { NavigationGuardNext, onBeforeRouteUpdate, RouteLocationNormalized } from 'vue-router';
import CollectionStore from '../store/CollectionStore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

interface State {
    noResults: boolean;
}

export default defineComponent({
    name: 'CollectionListPage',
    components: {
        Item,
    },
    props: {
        category: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const categoryRef = toRefs(props).category;

        const state: State = reactive({
            noResults: false,
        });

        const collectionStore = CollectionStore;

        const getEntries = (category: string): void => {
            state.noResults = false;
            collectionStore.setUpdatingData(true);
            ipcRenderer.invoke('/getEntries', category)
                .then((entries: CollectionItem[]) => {
                    if (category === 'books') {
                        const books = entries as BookCollectionItem[];
                        collectionStore.setBooks(books);
                    }
                    if (category === 'shows') {
                        const shows = entries as ShowCollectionItem[];
                        collectionStore.setShows(shows);
                    }
                    if (category === 'games') {
                        const games = entries as GameCollectionItem[];
                        collectionStore.setGames(games);
                    }
                }).catch((error: Error) => {
                    state.noResults = true;
                    console.error(error);
                }).finally(() => {
                    collectionStore.setUpdatingData(false);
                });
        };

        const removeFromCollection = (item: CollectionItem): void => {
            collectionStore.setUpdatingData(true);
            ipcRenderer.invoke('/removeEntry', {
                type: props.category,
                id: item?.id,
            } as RemoveRequest)
                .then(() => {
                    collectionStore.removeCollectionItem(props.category, item);
                    collectionStore.setUpdatingData(false);
                })
                .catch((error: Error) => {
                    console.error(error);
                    collectionStore.setUpdatingData(false);
                });
        };

        onMounted(() => {
            getEntries(props.category);
        });

        onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
            const category = to.params.category as string;
            getEntries(category);
            next();
        });

        // expose to template
        return {
            categoryRef,
            state,
            collectionStore,
            removeFromCollection,
        };
    },
});
</script>

<style lang="scss" scoped>
.collection-list-page {
    height: 100%;
    position: absolute;

    .collection-list-page__content {
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
}
</style>
