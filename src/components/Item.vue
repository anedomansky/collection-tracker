<template>
    <div class="item" @click="toDetailPage">
        <img :src="imageSrc" :alt="title" class="item__thumbnail">
        <Button v-if="result" additionalClass="item__btn" @onClick="add">
            <img src="/assets/icons/plus.svg" alt="Add">
        </Button>
        <Button v-else additionalClass="item__btn" @onClick="remove">
            <img src="/assets/icons/minus.svg" alt="Remove">
        </Button>
        <span class="item__title">{{ title }}</span>
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
export default class Item extends Vue {
    @Prop() private imageSrc!: string;

    @Prop() private category!: string;

    @Prop() private title!: string;

    @Prop() private result!: boolean;

    toDetailPage(): void {
        if (this.result) {
            this.$router.push(`/result/details/${this.category}/${this.title}`);
        } else {
            this.$router.push(`/collection/details/${this.category}/${this.title}`);
        }
    }

    add(): void {
        this.$emit('onAdd');
    }

    remove(): void {
        this.$emit('onRemove');
    }
}
</script>

<style lang="scss" scoped>
.item {
    height: 300px;
    width: 250px;
    display: grid;
    grid-template-areas:
    ". thumbnail btn"
    ". thumbnail ."
    ". title .";

    & .item__thumbnail {
        grid-area: thumbnail;
        cursor: pointer;
        height: 260px;
        width: 180px;
    }

    & .item__btn {
        grid-area: btn;
        margin-left: 1rem;
        box-shadow:  5px 5px 15px #1a022f,
                    -5px -5px 15px #23023f;

        &:hover {
            box-shadow: inset 15px 15px 30px #1a022f,
                        inset -15px -15px 30px #23023f;
        }

        & img {
            height: auto;
            width: 4rem;
        }
    }

    & .item__title {
        grid-area: title;
    }
}
</style>
