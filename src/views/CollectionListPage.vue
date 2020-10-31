<template>
    <article class="collection-list-page">
        <div class="collection-list-page__content">
            <div
                class="loading"
                v-if="store.currentUpdatingData"
            >
                <BeatLoader
                    color="#ffffff"
                    :size="loadingSpinnerSize"
                />
            </div>
            <div v-if="noResults">
                No Collection Items found!
            </div>
            <template v-if="params.type === 'books'">
                <Item
                    v-for="book in store.currentBooks"
                    :key="book.cover_i"
                    :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                    category="Books"
                    :title="book.title"
                    @onRemove="removeFromCollection(book)"
                    :result="false"
                />
            </template>
            <template v-if="params.type === 'games'">
                <Item
                    v-for="game in store.currentGames"
                    :key="game.id"
                    :imageSrc="game.background_image"
                    category="Games"
                    :title="game.name"
                    @onRemove="removeFromCollection(game)"
                    :result="false"
                />
            </template>
            <template v-if="params.type === 'shows'">
                <Item
                    v-for="show in store.currentShows"
                    :key="show.id"
                    :imageSrc="show.image && show.image.medium"
                    category="Shows"
                    :title="show.name"
                    @onRemove="removeFromCollection(show)"
                    :result="false"
                />
            </template>
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BeatLoader } from '@saeris/vue-spinners';
import { CollectionItem } from '@/types/CollectionItem';
import Item from '@/components/Item.vue';
import { BookCollectionItem } from '@/interfaces/BookCollectionItem';
import { ShowCollectionItem } from '@/interfaces/ShowCollectionItem';
import { GameCollectionItem } from '@/interfaces/GameCollectionItem';
import { RemoveRequest } from '@/interfaces/RemoveRequest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

interface Props {
    type: string;
}

interface State {
    noResults: boolean;
}

export default defineComponent({
    name: 'CollectionListPage',
    components: {
        Item,
        BeatLoader,
    },
    props: {
        params: {
            type: Object as PropType<Props>,
            required: true,
        },
    },
    data: (): State => ({
        noResults: false,
    }),
    mounted(): void {
        this.getEntries();
    },
    methods: {
        getEntries(): void {
            this.store.reset();
            this.noResults = false;
            this.store.setUpdatingData(true);
            ipcRenderer.invoke('/getEntries', this.params.type)
                .then((entries: CollectionItem[]) => {
                    if (this.params.type === 'books') {
                        const books = entries as BookCollectionItem[];
                        this.store.setBooks(books);
                    }
                    if (this.params.type === 'shows') {
                        const shows = entries as ShowCollectionItem[];
                        this.store.setShows(shows);
                    }
                    if (this.params.type === 'games') {
                        const games = entries as GameCollectionItem[];
                        this.store.setGames(games);
                    }
                }).catch((error: Error) => {
                    this.noResults = true;
                    console.error(error);
                }).finally(() => {
                    this.store.setUpdatingData(false);
                });
        },
        removeFromCollection(item: CollectionItem): void {
            this.store.setUpdatingData(true);
            ipcRenderer.invoke('/removeEntry', {
                type: this.params.type,
                id: item?.id,
            } as RemoveRequest)
                .then((message: string) => {
                    console.log(message);
                    this.store.removeCollectionItem(this.params.type, item);
                    this.store.setUpdatingData(false);
                })
                .catch((error: Error) => {
                    console.error(error);
                    this.store.setUpdatingData(false);
                });
        },
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
