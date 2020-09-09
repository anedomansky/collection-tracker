<template>
    <article class="search-details-page">
        <Details
            v-if="result !== null && category === 'Books'"
            :result="true"
            :imgSrc="`http://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`"
            :item="result"
        >
            <p>{{ result.title }}</p>
            <p>{{ result.author_name[0] }}</p>
            <p>{{ result.first_publish_year }}</p>
        </Details>
        <Details
            v-if="result !== null && category === 'Games'"
            :result="true"
            :imgSrc="result.background_image"
            :item="result"
        >
            <p>{{ result.name }}</p>
            <p>
                <span v-for="(genre, index) in result.genres" :key="index">
                    {{ genre.name }}
                </span>
            </p>
            <p>{{ result.released }}</p>
        </Details>
        <Details
            v-if="result !== null && category === 'Shows'"
            :result="true"
            :imgSrc="result.show.image && result.show.image.original"
            :item="result"
        >
            <p>{{ result.show.name }}</p>
            <p>
                <span v-for="(genre, index) in result.show.genres" :key="index">
                    {{ genre }}
                </span>
            </p>
            <p>{{ result.show.premiered }}</p>
        </Details>
        <Details
            v-if="result !== null && category === 'People'"
            :result="true"
            :imgSrc="result.person.image && result.person.image.original"
            :item="result"
        >
            <p>{{ result.person.name }}</p>
            <p>{{ result.person.birthday }}</p>
            <p>{{ result.person.country.name }}</p>
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
export default class SearchDetailsPage extends Vue {
    @Prop() private category!: string;

    @Prop() private title!: string;

    private store = RootStore.resultStore;

    private result: Item = null;

    mounted(): void {
        this.result = this.store.getResultByTitle(this.category, this.title);
        console.log(this.result);
    }

    backToResults(): void {
        this.$router.back();
    }
}
</script>

<style lang="scss" scoped>
.search-details-page {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
