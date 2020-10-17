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
            <template v-if="type === 'books'">
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
            <template v-if="type === 'games'">
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
            <template v-if="type === 'shows'">
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
import RootStore from '@/stores/RootStore';
import { Observer } from 'mobx-vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { BeatLoader } from '@saeris/vue-spinners';
import { CollectionItem } from '@/types/CollectionItem';
import { IBookCollectionItem } from '@/interfaces/IBookCollectionItem';
import { IShowCollectionItem } from '@/interfaces/IShowCollectionItem';
import { IGameCollectionItem } from '@/interfaces/IGameCollectionItem';
import { IRemoveRequest } from '@/interfaces/IRemoveRequest';
import Item from './Item.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

@Observer
@Component({
    components: {
        Item,
        BeatLoader,
    },
})
export default class CollectionListPage extends Vue {
    @Prop() private type!: string;

    private store = RootStore.collectionStore;

    private noResults = false;

    mounted(): void {
        this.getEntries();
    }

    getEntries(): void {
        this.store.reset();
        this.noResults = false;
        this.store.setUpdatingData(true);
        ipcRenderer.invoke('/getEntries', this.type)
            .then((entries: CollectionItem[]) => {
                if (this.type === 'books') {
                    const books = entries as IBookCollectionItem[];
                    this.store.setBooks(books);
                }
                if (this.type === 'shows') {
                    const shows = entries as IShowCollectionItem[];
                    this.store.setShows(shows);
                }
                if (this.type === 'games') {
                    const games = entries as IGameCollectionItem[];
                    this.store.setGames(games);
                }
            }).catch((error: Error) => {
                this.noResults = true;
                console.error(error);
            }).finally(() => {
                this.store.setUpdatingData(false);
            });
    }

    removeFromCollection(item: CollectionItem): void {
        this.store.setUpdatingData(true);
        ipcRenderer.invoke('/removeEntry', {
            type: this.type,
            id: item?.id,
        } as IRemoveRequest)
            .then((message: string) => {
                console.log(message);
                this.store.removeCollectionItem(this.type, item);
                this.store.setUpdatingData(false);
            })
            .catch((error: Error) => {
                console.error(error);
                this.store.setUpdatingData(false);
            });
    }
}
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
