<template>
    <article class="details-page">
        <template v-if="result">
            <Details
                v-if="resultItem !== null && category === 'Books'"
                :result="result"
                :imgSrc="`http://covers.openlibrary.org/b/id/${resultItem.cover_i}-L.jpg`"
                :item="resultItem"
                @onAdd="addToCollection(resultItem)"
            >
                <p>{{ resultItem.title }}</p>
                <p>{{ resultItem.author_name[0] }}</p>
                <p>{{ resultItem.first_publish_year }}</p>
            </Details>
            <Details
                v-if="resultItem !== null && category === 'Games'"
                :result="result"
                :imgSrc="resultItem.background_image"
                :item="resultItem"
                @onAdd="addToCollection(resultItem)"
            >
                <p>{{ resultItem.name }}</p>
                <p>
                    <span
                        v-for="(genre, index) in resultItem.genres"
                        :key="index"
                    >
                        {{ genre.name }}
                    </span>
                </p>
                <p>{{ resultItem.released }}</p>
            </Details>
            <Details
                v-if="resultItem !== null && category === 'Shows'"
                :result="result"
                :imgSrc="resultItem.show.image && resultItem.show.image.original"
                :item="resultItem"
                @onAdd="addToCollection(resultItem)"
            >
                <p>{{ resultItem.show.name }}</p>
                <p>
                    <span
                        v-for="(genre, index) in resultItem.show.genres"
                        :key="index"
                    >
                        {{ genre }}
                    </span>
                </p>
                <p>{{ resultItem.show.premiered }}</p>
            </Details>
        </template>
        <template v-else>
            <Details
                v-if="collectionItem !== null && category === 'Books'"
                :result="result"
                :imgSrc="`http://covers.openlibrary.org/b/id/${collectionItem.cover_i}-L.jpg`"
                :item="collectionItem"
                @onRemove="removeFromCollection(collectionItem)"
            >
                <p>{{ collectionItem.title }}</p>
                <p>{{ collectionItem.author_name }}</p>
                <p>{{ collectionItem.first_publish_year }}</p>
            </Details>
            <Details
                v-if="collectionItem !== null && category === 'Games'"
                :result="result"
                :imgSrc="collectionItem.background_image"
                :item="collectionItem"
                @onRemove="removeFromCollection(collectionItem)"
            >
                <p>{{ collectionItem.name }}</p>
                <p>
                    <span
                        v-for="(genre, index) in collectionItem.genres"
                        :key="index"
                    >
                        {{ genre.name }}
                    </span>
                </p>
                <p>{{ collectionItem.released }}</p>
            </Details>
            <Details
                v-if="collectionItem !== null && category === 'Shows'"
                :result="result"
                :imgSrc="collectionItem.image_original"
                :item="collectionItem"
                @onRemove="removeFromCollection(collectionItem)"
            >
                <p>{{ collectionItem.name }}</p>
                <!-- <p>
                    <span v-for="(genre, index) in collectionItem.genres" :key="index">
                        {{ genre }}
                    </span>
                </p> -->
                <p>{{ collectionItem.premiered }}</p>
            </Details>
        </template>
    </article>
</template>

<script lang="ts">
import { Observer } from 'mobx-vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IBookCollectionItem } from '@/interfaces/IBookCollectionItem';
import { IBookResult } from '@/interfaces/IBookResult';
import { IEntryRequest } from '@/interfaces/IEntryRequest';
import { IGameResult } from '@/interfaces/IGameResult';
import { IShowResponse } from '@/interfaces/IShowResponse';
import RootStore from '@/stores/RootStore';
import { CollectionItem } from '@/types/CollectionItem';
import { ResultItem } from '@/types/ResultItem';
import { IRemoveRequest } from '@/interfaces/IRemoveRequest';
import Details from './Details.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

@Observer
@Component({
    components: {
        Details,
    },
})
export default class DetailsPage extends Vue {
    @Prop() private category!: string;

    @Prop() private title!: string;

    @Prop() private result!: boolean;

    private resultStore = RootStore.resultStore;

    private collectionStore = RootStore.collectionStore;

    private resultItem: ResultItem = null;

    private collectionItem: CollectionItem = null;

    mounted(): void {
        if (this.result) {
            this.resultItem = this.resultStore.getResult(this.category, this.title);
        } else {
            this.collectionItem = this.collectionStore.getCollectionItem(this.category, this.title);
        }
    }

    backToResults(): void {
        this.$router.back();
    }

    addToCollection(resultItem: ResultItem): void {
        let entry: CollectionItem;
        if (this.category.toLowerCase() === 'books') {
            const bookEntry = resultItem as IBookResult;
            entry = {
                author_name: bookEntry.author_name[0],
                cover_i: bookEntry.cover_i,
                title: bookEntry.title,
                first_publish_year: bookEntry.first_publish_year,
            } as IBookCollectionItem;
            ipcRenderer.invoke('/addEntry', {
                type: this.category.toLowerCase(),
                entry,
            } as IEntryRequest)
                .then((message: string) => {
                    console.log(message);
                    this.collectionStore.setUpdatingData(false);
                })
                .catch((error: Error) => {
                    this.collectionStore.setUpdatingData(false);
                    console.error(error);
                });
        }
        if (this.category.toLowerCase() === 'shows') {
            const showEntry = resultItem as IShowResponse;
            entry = {
                name: showEntry.show.name,
                premiered: showEntry.show.premiered.toLocaleDateString(),
                officialSite: showEntry.show.officialSite,
                status: showEntry.show.status,
                summary: showEntry.show.summary,
                image_medium: showEntry.show.image.medium || '',
                image_original: showEntry.show.image.original || '',
            };
            ipcRenderer.invoke('/addEntry', {
                type: this.category.toLowerCase(),
                entry,
            } as IEntryRequest)
                .then((message: string) => {
                    console.log(message);
                    this.collectionStore.setUpdatingData(false);
                })
                .catch((error: Error) => {
                    this.collectionStore.setUpdatingData(false);
                    console.error(error);
                });
        }
        if (this.category.toLowerCase() === 'games') {
            const gameEntry = resultItem as IGameResult;
            entry = {
                name: gameEntry.name,
                background_image: gameEntry.background_image,
                released: gameEntry.released.toLocaleDateString(),
                rating: gameEntry.rating,
                rating_top: gameEntry.rating_top,
            };
            ipcRenderer.invoke('/addEntry', {
                type: this.category.toLowerCase(),
                entry,
            } as IEntryRequest)
                .then((message: string) => {
                    console.log(message);
                    this.collectionStore.setUpdatingData(false);
                })
                .catch((error: Error) => {
                    this.collectionStore.setUpdatingData(false);
                    console.error(error);
                });
        }
    }

    removeFromCollection(item: CollectionItem): void {
        this.collectionStore.setUpdatingData(true);
        ipcRenderer.invoke('/removeEntry', {
            type: this.category.toLowerCase(),
            id: item?.id,
        } as IRemoveRequest)
            .then((message: string) => {
                console.log(message);
                this.collectionStore.removeCollectionItem(this.category.toLowerCase(), item);
                this.collectionStore.setUpdatingData(false);
            })
            .catch((error: Error) => {
                console.error(error);
                this.collectionStore.setUpdatingData(false);
            });
    }
}
</script>

<style lang="scss" scoped>
.details-page {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
