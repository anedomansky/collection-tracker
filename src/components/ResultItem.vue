<template>
    <div class="result-item" @click="toDetailPage">
        <img :src="imageSrc" :alt="title" class="result-item__thumbnail">
        <button type="button" class="result-item__add"><img src="/assets/icons/plus.svg" alt="Add" @click.stop="add"></button>
        <span class="result-item__title">{{ title }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ResultItem extends Vue {
    @Prop() private imageSrc!: string;

    @Prop() private category!: string;

    @Prop() private title!: string;

    toDetailPage(): void {
        this.$router.push(`/result/details/${this.category}/${this.title}`);
    }

    add(): void {
        this.$emit('onAdd');
    }
}
</script>

<style lang="scss" scoped>
.result-item {
    height: 300px;
    width: 250px;
    display: grid;
    grid-template-areas:
    ". thumbnail add"
    ". thumbnail ."
    ". title .";

    & .result-item__thumbnail {
        grid-area: thumbnail;
        cursor: pointer;
        height: 260px;
        width: 180px;
    }

    & .result-item__add {
        grid-area: add;
        margin-left: 1rem;
        cursor: pointer;
        background: none;
        border-radius: 1rem;
        border: none;
        box-shadow:  5px 5px 15px #1a022f,
                    -5px -5px 15px #23023f;

        &:hover {
            box-shadow: inset 15px 15px 30px #1a022f,
                        inset -15px -15px 30px #23023f;
        }

        & img {
            height: auto;
            width: 50px;
        }
    }

    & .result-item__title {
        grid-area: title;
    }
}
</style>
