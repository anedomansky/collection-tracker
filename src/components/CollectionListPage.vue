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
            <div v-if="store.currentErrorOccurred">
                No Collection Items found!
            </div>
            <Item
                v-for="book in store.currentBooks"
                :key="book.cover_i"
                :imageSrc="`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`"
                category="Books"
                :title="book.title"
                @onRemove="removeFromCollection(book)"
                :result="false"
            />
            <Item
                v-for="game in store.currentGames"
                :key="game.id"
                :imageSrc="game.background_image"
                category="Games"
                :title="game.name"
                @onRemove="removeFromCollection(game)"
                :result="false"
            />
            <Item
                v-for="show in store.currentShows"
                :key="show.id"
                :imageSrc="show.image && show.image.medium"
                category="Shows"
                :title="show.name"
                @onRemove="removeFromCollection(show)"
                :result="false"
            />
        </div>
    </article>
</template>

<script lang="ts">
import RootStore from '@/stores/RootStore';
import { Observer } from 'mobx-vue';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { BeatLoader } from '@saeris/vue-spinners';
import { CollectionItem } from '@/types/CollectionItem';
import Item from './Item.vue';

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

    mounted(): void {
        this.getEntries();
    }

    async getEntries(): Promise<void> {
        await this.store.getEntries(this.type);
    }

    async removeFromCollection(item: CollectionItem): Promise<void> {
        console.log('Removed item', item);
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
