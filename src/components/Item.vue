<template>
    <div
        class="item"
        @click="toDetailPage"
    >
        <img
            :src="imageSrcRef"
            :alt="titleRef"
            class="item__thumbnail"
        >
        <Button
            v-if="resultRef"
            additionalClass="item__btn"
            @on-click="add"
        >
            <img
                :src="require('@/assets/icons/plus.svg')"
                alt="Add"
            >
        </Button>
        <Button
            v-else
            additionalClass="item__btn"
            @on-click="remove"
        >
            <img
                :src="require('@/assets/icons/minus.svg')"
                alt="Remove"
            >
        </Button>
        <span class="item__title">{{ titleRef }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import Button from '@/components/Button.vue';

export default defineComponent({
    name: 'Item',
    components: {
        Button,
    },
    props: {
        imageSrc: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        result: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        toDetailPage(): void {
            if (this.$props.result) {
                this.$router.push(`/result/details/${this.$props.category}/${this.$props.title}`);
            } else {
                this.$router.push(`/collection/details/${this.$props.category}/${this.$props.title}`);
            }
        },
        add(): void {
            this.$emit('on-add');
        },
        remove(): void {
            this.$emit('on-remove');
        },
    },
    setup(props) {
        const imageSrcRef = toRefs(props).imageSrc;
        const categoryRef = toRefs(props).category;
        const titleRef = toRefs(props).title;
        const resultRef = toRefs(props).result;

        // expose to template
        return {
            imageSrcRef,
            categoryRef,
            titleRef,
            resultRef,
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
