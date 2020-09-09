<template>
    <div class="collection-item" @click="toDetailPage">
        <img :src="imageSrc" :alt="title" class="collection-item__thumbnail">
        <Button additionalClass="collection-item__add" @onClick="remove">
            <img src="/assets/icons/minus.svg" alt="Remove">
        </Button>
        <span class="collection-item__title">{{ title }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Button from './Button.vue';

@Component({
    components: {
        Button,
    },
})
export default class CollectionItem extends Vue {
    @Prop() private imageSrc!: string;

    @Prop() private title!: string;

    toDetailPage(): void {
        this.$router.replace(`/collection/details/${this.title}`);
    }

    remove(): void {
        this.$emit('onRemove');
    }
}
</script>

<style lang="scss" scoped>
.result-item {
    display: grid;
    grid-template-areas:
    "thumbnail thumbnail add"
    "thumbnail thumbnail ."
    ". title .";

    & .result-item__thumbnail {
        grid-area: thumbnail;
    }

    & .result-item__add {
        grid-area: add;
    }

    & .result-item__title {
        grid-area: title;
    }
}
</style>
