<template>
    <article class="details-page">
        <template v-if="resultRef">
            <Details
                v-if="resultItem !== null && categoryRef === 'Books'"
                :result="resultRef"
                :imgSrc="`http://covers.openlibrary.org/b/id/${resultItem.cover_i}-L.jpg`"
                @on-add="addToCollection(resultItem)"
            >
                <p>{{ resultItem.title }}</p>
                <p>{{ resultItem.author_name[0] }}</p>
                <p>{{ resultItem.first_publish_year }}</p>
            </Details>
            <Details
                v-if="resultItem !== null && category === 'Games'"
                :result="resultRef"
                :imgSrc="resultItem.background_image"
                @on-add="addToCollection(resultItem)"
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
                v-if="resultItem !== null && categoryRef === 'Shows'"
                :result="resultRef"
                :imgSrc="resultItem.show.image && resultItem.show.image.original"
                @on-add="addToCollection(resultItem)"
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
import { defineComponent, PropType, toRefs } from 'vue';
import Details from '@/components/Details.vue';
import { BookResult } from '../interfaces/BookResult';
import { ResultItem } from '../types/ResultItem';
import { CollectionItem } from '../types/CollectionItem';
import { BookCollectionItem } from '../interfaces/BookCollectionItem';
import { ShowResponse } from '../interfaces/ShowResponse';
import { GameResult } from '../interfaces/GameResult';
import { RemoveRequest } from '../interfaces/RemoveRequest';
import { EntryRequest } from '../interfaces/EntryRequest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = window.require('electron');

export default defineComponent({
    name: 'DetailsPage',
    components: {
        Details,
    },
    props: {
        category: {
            type: Object as PropType<string | string[]>,
            required: true,
        },
        title: {
            type: Object as PropType<string | string[]>,
            required: true,
        },
        result: {
            type: Boolean,
            required: true,
        },
    },
    mounted(): void {
        console.log(this.$store);
        // if (this.$props.params.result) {
        //     this.resultItem = this.resultStore.getResult(this.$props.params.category, this.$props.params.title);
        // } else {
        //     this.collectionItem = this.collectionStore.getCollectionItem(this.$props.params.category, this.$props.params.title);
        // }
    },
    methods: {
        backToResults(): void {
            this.$router.back();
        },
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

        // expose to template
        return {
            categoryRef,
            titleRef,
            resultRef,
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
