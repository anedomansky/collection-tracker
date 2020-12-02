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
                v-if="collectionItem !== null && categoryRef === 'Books'"
                :result="resultRef"
                :imgSrc="`http://covers.openlibrary.org/b/id/${collectionItem.cover_i}-L.jpg`"
                @on-remove="removeFromCollection(collectionItem)"
            >
                <p>{{ collectionItem.title }}</p>
                <p>{{ collectionItem.author_name }}</p>
                <p>{{ collectionItem.first_publish_year }}</p>
            </Details>
            <Details
                v-if="collectionItem !== null && categoryRef === 'Games'"
                :result="resultRef"
                :imgSrc="collectionItem.background_image"
                @on-remove="removeFromCollection(collectionItem)"
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
                v-if="collectionItem !== null && categoryRef === 'Shows'"
                :result="resultRef"
                :imgSrc="collectionItem.image_original"
                @on-remove="removeFromCollection(collectionItem)"
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
    methods: {
        addToCollection(resultItem: ResultItem): void {
            // let entry: CollectionItem;
            // if (this.$props.params.category.toLowerCase() === 'books') {
            //     const bookEntry = resultItem as BookResult;
            //     entry = {
            //         author_name: bookEntry.author_name[0],
            //         cover_i: bookEntry.cover_i,
            //         title: bookEntry.title,
            //         first_publish_year: bookEntry.first_publish_year,
            //     } as BookCollectionItem;
            //     ipcRenderer.invoke('/addEntry', {
            //         type: this.$props.params.category.toLowerCase(),
            //         entry,
            //     } as EntryRequest)
            //         .then((message: string) => {
            //             console.log(message);
            //             this.collectionStore.setUpdatingData(false);
            //         })
            //         .catch((error: Error) => {
            //             this.collectionStore.setUpdatingData(false);
            //             console.error(error);
            //         });
            // }
            // if (this.$props.params.category.toLowerCase() === 'shows') {
            //     const showEntry = resultItem as ShowResponse;
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
            //         type: this.category.toLowerCase(),
            //         entry,
            //     } as EntryRequest)
            //         .then((message: string) => {
            //             console.log(message);
            //             this.collectionStore.setUpdatingData(false);
            //         })
            //         .catch((error: Error) => {
            //             this.collectionStore.setUpdatingData(false);
            //             console.error(error);
            //         });
            // }
            // if (this.$props.params.category.toLowerCase() === 'games') {
            //     const gameEntry = resultItem as GameResult;
            //     entry = {
            //         name: gameEntry.name,
            //         background_image: gameEntry.background_image,
            //         released: gameEntry.released.toLocaleDateString(),
            //         rating: gameEntry.rating,
            //         rating_top: gameEntry.rating_top,
            //     };
            //     ipcRenderer.invoke('/addEntry', {
            //         type: this.$props.params.category.toLowerCase(),
            //         entry,
            //     } as EntryRequest)
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
        removeFromCollection(item: CollectionItem): void {
            // this.collectionStore.setUpdatingData(true);
            // ipcRenderer.invoke('/removeEntry', {
            //     type: this.$props.params.category.toLowerCase(),
            //     id: item?.id,
            // } as RemoveRequest)
            //     .then((message: string) => {
            //         console.log(message);
            //         this.collectionStore.removeCollectionItem(this.$props.params.category.toLowerCase(), item);
            //         this.collectionStore.setUpdatingData(false);
            //     })
            //     .catch((error: Error) => {
            //         console.error(error);
            //         this.collectionStore.setUpdatingData(false);
            //     });
        },
    },
    setup(props) {
        const categoryRef = toRefs(props).category;
        const titleRef = toRefs(props).title;
        const resultRef = toRefs(props).result;

        const resultStore = ResultStore;

        onMounted(() => {
            if (resultRef.value) {
                resultStore.findResult(categoryRef.value, titleRef.value);
            }
        });

        // expose to template
        return {
            categoryRef,
            titleRef,
            resultRef,
            resultStore,
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
