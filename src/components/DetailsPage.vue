<template>
    <article class="details-page">
        <Details
            v-if="item !== null && category === 'Books'"
            :result="result"
            :imgSrc="`http://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`"
            :item="item"
        >
            <p>{{ item.title }}</p>
            <p>{{ item.author_name[0] }}</p>
            <p>{{ item.first_publish_year }}</p>
        </Details>
        <Details
            v-if="item !== null && category === 'Games'"
            :result="result"
            :imgSrc="item.background_image"
            :item="item"
        >
            <p>{{ item.name }}</p>
            <p>
                <span v-for="(genre, index) in item.genres" :key="index">
                    {{ genre.name }}
                </span>
            </p>
            <p>{{ item.released }}</p>
        </Details>
        <Details
            v-if="item !== null && category === 'Shows'"
            :result="result"
            :imgSrc="item.show.image && item.show.image.original"
            :item="item"
        >
            <p>{{ item.show.name }}</p>
            <p>
                <span v-for="(genre, index) in item.show.genres" :key="index">
                    {{ genre }}
                </span>
            </p>
            <p>{{ item.show.premiered }}</p>
        </Details>
        <Details
            v-if="item !== null && category === 'People'"
            :result="result"
            :imgSrc="item.person.image && item.person.image.original"
            :item="item"
        >
            <p>{{ item.person.name }}</p>
            <p>{{ item.person.birthday }}</p>
            <p>{{ item.person.country.name }}</p>
        </Details>
    </article>
</template>

<script lang="ts">
import RootStore from '@/stores/RootStore';
import { Item } from '@/types/Item';
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

    private item: Item = null;

    mounted(): void {
        if (this.result) {
            this.item = this.resultStore.getResult(this.category, this.title);
        } else {
            console.log('Get item from collectionStore');
        }
        console.log(this.item);
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
