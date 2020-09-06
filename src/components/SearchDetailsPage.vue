<template>
    <article class="search-details-page">
        <div class="search-details-page__content">
            <div v-if="result !== null && category === 'Books'">
                <img :src="`http://covers.openlibrary.org/b/id/${result.cover_i}-L.jpg`" alt="Cover">
                <p>{{ result.title }}</p>
                <p>{{ result.author_name[0] }}</p>
                <p>{{ result.first_publish_year }}</p>
                <img src="/assets/icons/back-arrow.svg" alt="Back" @click="backToResults">
            </div>
            <div v-if="result !== null && category === 'Games'">
                <img :src="result.background_image" alt="Cover">
                <p>{{ result.name }}</p>
                <p>
                    <span v-for="(genre, index) in result.genres" :key="index">
                        {{ genre.name }}
                    </span>
                </p>
                <p>{{ result.released }}</p>
                <img src="/assets/icons/back-arrow.svg" alt="Back" @click="backToResults">
            </div>
            <div v-if="result !== null && category === 'Shows'">
                <img :src="result.show.image && result.show.image.original" alt="Cover">
                <p>{{ result.show.name }}</p>
                <p>
                    <span v-for="(genre, index) in result.show.genres" :key="index">
                        {{ genre }}
                    </span>
                </p>
                <p>{{ result.show.premiered }}</p>
                <img src="/assets/icons/back-arrow.svg" alt="Back" @click="backToResults">
            </div>
            <div v-if="result !== null && category === 'People'">
                <img :src="result.person.image && result.person.image.original" alt="Cover">
                <p>{{ result.person.name }}</p>
                <p>{{ result.person.birthday }}</p>
                <p>{{ result.person.country.name }}</p>
                <img src="/assets/icons/back-arrow.svg" alt="Back" @click="backToResults">
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import RootStore from '@/stores/RootStore';
import { Result } from '@/types/Result';
import { Observer } from 'mobx-vue';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Observer
@Component
export default class SearchDetailsPage extends Vue {
    @Prop() private category!: string;

    @Prop() private title!: string;

    private store = RootStore.resultStore;

    private result: Result = null;

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
    display: grid;

    & .search-details-page__content {}
}
</style>
