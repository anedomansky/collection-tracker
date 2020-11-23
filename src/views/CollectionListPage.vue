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
            <div v-if="state.noResults">
                No Collection Items found!
            </div>
            <template v-if="typeRef === 'books'">
                <Item
                    v-for="book in store.currentBooks"
                    :key="book.cover_i"
                    :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                    category="Books"
                    :title="book.title"
                    @on-remove="removeFromCollection(book)"
                    :result="false"
                />
            </template>
            <template v-if="typeRef === 'games'">
                <Item
                    v-for="game in store.currentGames"
                    :key="game.id"
                    :imageSrc="game.background_image"
                    category="Games"
                    :title="game.name"
                    @on-remove="removeFromCollection(game)"
                    :result="false"
                />
            </template>
            <template v-if="typeRef === 'shows'">
                <Item
                    v-for="show in store.currentShows"
                    :key="show.id"
                    :imageSrc="show.image && show.image.medium"
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
import { defineComponent, reactive, toRefs } from 'vue';
import { BeatLoader } from '@saeris/vue-spinners';
import { CollectionItem } from '@/types/CollectionItem';
import Item from '@/components/Item.vue';
import { BookCollectionItem } from '@/interfaces/BookCollectionItem';
import { ShowCollectionItem } from '@/interfaces/ShowCollectionItem';
import { GameCollectionItem } from '@/interfaces/GameCollectionItem';
import { RemoveRequest } from '@/interfaces/RemoveRequest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

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
        type: {
            type: String,
            required: true,
        },
    },
    mounted(): void {
        this.getEntries();
    },
    methods: {
        getEntries(): void {
            console.log(this.$store);
            // this.$store.reset();
            // this.noResults = false;
            // this.$store.setUpdatingData(true);
            // ipcRenderer.invoke('/getEntries', this.params.type)
            //     .then((entries: CollectionItem[]) => {
            //         if (this.params.type === 'books') {
            //             const books = entries as BookCollectionItem[];
            //             this.$store.setBooks(books);
            //         }
            //         if (this.params.type === 'shows') {
            //             const shows = entries as ShowCollectionItem[];
            //             this.store.setShows(shows);
            //         }
            //         if (this.params.type === 'games') {
            //             const games = entries as GameCollectionItem[];
            //             this.store.setGames(games);
            //         }
            //     }).catch((error: Error) => {
            //         this.noResults = true;
            //         console.error(error);
            //     }).finally(() => {
            //         this.store.setUpdatingData(false);
            //     });
        },
        removeFromCollection(item: CollectionItem): void {
            // this.store.setUpdatingData(true);
            // ipcRenderer.invoke('/removeEntry', {
            //     type: this.params.type,
            //     id: item?.id,
            // } as RemoveRequest)
            //     .then((message: string) => {
            //         console.log(message);
            //         this.store.removeCollectionItem(this.params.type, item);
            //         this.store.setUpdatingData(false);
            //     })
            //     .catch((error: Error) => {
            //         console.error(error);
            //         this.store.setUpdatingData(false);
            //     });
        },
    },
    setup(props) {
        const typeRef = toRefs(props).type;

        const state: State = reactive({
            noResults: false,
        });

        // expose to template
        return {
            typeRef,
            state,
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
