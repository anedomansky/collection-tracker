<template>
    <article class="details-page">
        <template v-if="result">
            <Details
                v-if="resultItem !== null && category === 'Books'"
                :result="result"
                :imgSrc="`http://covers.openlibrary.org/b/id/${resultItem.cover_i}-L.jpg`"
                :item="resultItem"
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
import RootStore from '@/stores/RootStore';
import { CollectionItem } from '@/types/CollectionItem';
import { ResultItem } from '@/types/ResultItem';
import { Observer } from 'mobx-vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import Details from './Details.vue';

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
        console.log(this.resultItem);
    }

    backToResults(): void {
        this.$router.back();
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
