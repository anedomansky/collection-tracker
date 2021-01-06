<template>
    <article class="details-page">
        <template v-if="resultRef">
            <Details
                v-if="resultStore.state.resultItem !== null && categoryRef === 'Books'"
                :result="resultRef"
                :imgSrc="`http://covers.openlibrary.org/b/id/${resultStore.state.resultItem.cover_i}-L.jpg`"
                @on-add="addToCollection(resultStore.state.resultItem)"
            >
                <p>{{ resultStore.state.resultItem.title }}</p>
                <p>{{ resultStore.state.resultItem.author_name[0] }}</p>
                <p>{{ resultStore.state.resultItem.first_publish_year }}</p>
            </Details>
            <Details
                v-if="resultStore.state.resultItem !== null && categoryRef === 'Games'"
                :result="resultRef"
                :imgSrc="resultStore.state.resultItem.background_image"
                @on-add="addToCollection(resultStore.state.resultItem)"
            >
                <p>{{ resultStore.state.resultItem.name }}</p>
                <p>
                    <span
                        v-for="(genre, index) in resultStore.state.resultItem.genres"
                        :key="index"
                    >
                        {{ genre.name }}
                    </span>
                </p>
                <p>{{ resultStore.state.resultItem.released }}</p>
            </Details>
            <Details
                v-if="resultStore.state.resultItem !== null && categoryRef === 'Shows'"
                :result="resultRef"
                :imgSrc="resultStore.state.resultItem.show.image && resultStore.state.resultItem.show.image.original"
                @on-add="addToCollection(resultStore.state.resultItem)"
            >
                <p>{{ resultStore.state.resultItem.show.name }}</p>
                <p>
                    <span
                        v-for="(genre, index) in resultStore.state.resultItem.show.genres"
                        :key="index"
                    >
                        {{ genre }}
                    </span>
                </p>
                <p>{{ resultStore.state.resultItem.show.premiered }}</p>
            </Details>
        </template>
        <template v-else>
            <Details
                v-if="collectionStore.state.collectionItem !== null && categoryRef === 'Books'"
                :result="resultRef"
                :imgSrc="`http://covers.openlibrary.org/b/id/${collectionStore.state.collectionItem.cover_i}-L.jpg`"
                @on-remove="removeFromCollection(collectionStore.state.collectionItem)"
            >
                <p>{{ collectionStore.state.collectionItem.title }}</p>
                <p>{{ collectionStore.state.collectionItem.author_name }}</p>
                <p>{{ collectionStore.state.collectionItem.first_publish_year }}</p>
            </Details>
            <Details
                v-if="collectionStore.state.collectionItem !== null && categoryRef === 'Games'"
                :result="resultRef"
                :imgSrc="collectionStore.state.collectionItem.background_image"
                @on-remove="removeFromCollection(collectionStore.state.collectionItem)"
            >
                <p>{{ collectionStore.state.collectionItem.name }}</p>
                <p>
                    <span
                        v-for="(genre, index) in collectionStore.state.collectionItem.genres"
                        :key="index"
                    >
                        {{ genre.name }}
                    </span>
                </p>
                <p>{{ collectionStore.state.collectionItem.released }}</p>
            </Details>
            <Details
                v-if="collectionStore.state.collectionItem !== null && categoryRef === 'Shows'"
                :result="resultRef"
                :imgSrc="collectionStore.state.collectionItem.image_original"
                @on-remove="removeFromCollection(collectionStore.state.collectionItem)"
            >
                <p>{{ collectionStore.state.collectionItem.name }}</p>
                <!-- <p>
                    <span v-for="(genre, index) in collectionItem.genres" :key="index">
                        {{ genre }}
                    </span>
                </p> -->
                <p>{{ collectionStore.state.collectionItem.premiered }}</p>
            </Details>
        </template>
    </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue';
import Details from '@/components/Details.vue';
import { BookResult } from '../interfaces/BookResult';
import { ResultItem } from '../types/ResultItem';
import { CollectionItem } from '../types/CollectionItem';
import { BookCollectionItem } from '../interfaces/BookCollectionItem';
import { ShowResponse } from '../interfaces/ShowResponse';
import { GameResult } from '../interfaces/GameResult';
import { RemoveRequest } from '../interfaces/RemoveRequest';
import { EntryRequest } from '../interfaces/EntryRequest';
import ResultStore from '../store/ResultStore';
import CollectionStore from '../store/CollectionStore';
import Categories from '../enums/Categories';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

export default defineComponent({
    name: 'DetailsPage',
    components: {
        Details,
    },
    props: {
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        result: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const categoryRef = toRefs(props).category;
        const titleRef = toRefs(props).title;
        const resultRef = toRefs(props).result;

        const resultStore = ResultStore;
        const collectionStore = CollectionStore;

        onMounted(() => {
            if (resultRef.value) {
                resultStore.findResult(props.category, props.title);
            } else {
                collectionStore.findCollectionItem(props.category, props.title);
            }
        });

        const addToCollection = (resultItem: ResultItem): void => {
            console.log('Added item', resultItem, props.category);
            let entry: CollectionItem;
            if (props.category === Categories.BOOKS) {
                const bookEntry = resultItem as BookResult;
                entry = {
                    author_name: bookEntry.author_name[0],
                    cover_i: bookEntry.cover_i,
                    title: bookEntry.title,
                    first_publish_year: bookEntry.first_publish_year,
                } as BookCollectionItem;
                ipcRenderer.invoke('/addEntry', {
                    type: props.category.toLowerCase(),
                    entry,
                } as EntryRequest)
                    .then((message: string) => {
                        console.log(message);
                        collectionStore.setUpdatingData(false);
                    })
                    .catch((error: Error) => {
                        collectionStore.setUpdatingData(false);
                        console.error(error);
                    });
            }
            if (props.category === Categories.SHOWS) {
                const showEntry = resultItem as ShowResponse;
                entry = {
                    name: showEntry.show.name,
                    premiered: new Date(showEntry.show.premiered).toLocaleDateString(),
                    officialSite: showEntry.show.officialSite,
                    status: showEntry.show.status,
                    summary: showEntry.show.summary,
                    image_medium: showEntry.show.image.medium || '',
                    image_original: showEntry.show.image.original || '',
                };
                ipcRenderer.invoke('/addEntry', {
                    type: props.category.toLowerCase(),
                    entry,
                } as EntryRequest)
                    .then((message: string) => {
                        console.log(message);
                        collectionStore.setUpdatingData(false);
                    })
                    .catch((error: Error) => {
                        collectionStore.setUpdatingData(false);
                        console.error(error);
                    });
            }
            if (props.category === Categories.GAMES) {
                const gameEntry = resultItem as GameResult;
                entry = {
                    name: gameEntry.name,
                    background_image: gameEntry.background_image,
                    released: new Date(gameEntry.released).toLocaleDateString(),
                    rating: gameEntry.rating,
                    rating_top: gameEntry.rating_top,
                };
                ipcRenderer.invoke('/addEntry', {
                    type: props.category.toLowerCase(),
                    entry,
                } as EntryRequest)
                    .then((message: string) => {
                        console.log(message);
                        collectionStore.setUpdatingData(false);
                    })
                    .catch((error: Error) => {
                        collectionStore.setUpdatingData(false);
                        console.error(error);
                    });
            }
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

        // expose to template
        return {
            categoryRef,
            titleRef,
            resultRef,
            resultStore,
            collectionStore,
            addToCollection,
            removeFromCollection,
        };
    },
});
</script>

<style lang="scss" scoped>
.details-page {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
