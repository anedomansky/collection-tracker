<template>
    <div
        class="item"
        @click="toDetailPage"
    >
        <img
            :src="imageSrc"
            :alt="title"
            class="item__thumbnail"
        >
        <Button
            v-if="result"
            :params="{ additionalClass: 'item__btn' }"
            @onClick="add"
        >
            <img
                src="/assets/icons/plus.svg"
                alt="Add"
            >
        </Button>
        <Button
            v-else
            :params="{ additionalClass: 'item__btn' }"
            @onClick="remove"
        >
            <img
                src="/assets/icons/minus.svg"
                alt="Remove"
            >
        </Button>
        <span class="item__title">{{ title }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue';
import Button from '@/components/Button.vue';

interface Props {
    imageSrc: string;
    category: string;
    title: string;
    result: boolean;
}

export default defineComponent({
    name: 'Item',
    components: {
        Button,
    },
    props: {
        params: {
            type: Object as PropType<Props>,
            required: true,
        },
    },
    methods: {
        toDetailPage(): void {
            if (this.params.result) {
                this.$router.push(`/result/details/${this.params.category}/${this.params.title}`);
            } else {
                this.$router.push(`/collection/details/${this.params.category}/${this.params.title}`);
            }
        },
        add(): void {
            this.$emit('onAdd');
        },
        remove(): void {
            this.$emit('onRemove');
        },
    },
    setup(props) {
        const imageSrc = toRef(props.params, 'imageSrc');
        const category = toRef(props.params, 'category');
        const title = toRef(props.params, 'title');
        const result = toRef(props.params, 'result');

        // expose to template
        return {
            imageSrc,
            category,
            title,
            result,
        };
    },
});
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
