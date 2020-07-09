<template>
    <div class="result-item" @click="toDetailPage">
        <img :src="imageSrc" :alt="title" class="result-item__thumbnail">
        <button type="button" class="result-item__add"><img src="/assets/icons/plus.svg" alt="Add" @click="add"></button>
        <span class="result-item__title">{{ title }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ResultItem extends Vue {
    @Prop() private imageSrc!: string;

    @Prop() private title!: string;

    toDetailPage(): void {
        this.$router.replace(`/result/detail/`);
    }

    add(): void {
        this.$emit('onAdd');
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
