<template>
    <section class="details">
        <Button
            additionalClass="details__back-btn"
            @onClick="back"
        >
            <img
                :src="require('@/assets/icons/back-arrow.svg')"
                alt="Back"
            >
        </Button>
        <img
            class="details__cover"
            :src="imgSrc"
            alt="Cover"
        >
        <Button
            v-if="result"
            additionalClass="details__add-btn"
            @onClick="add"
        >
            <img
                :src="require('@/assets/icons/plus.svg')"
                alt="Add"
            >
        </Button>
        <Button
            v-else
            additionalClass="details__remove-btn"
            @onClick="remove"
        >
            <img
                :src="require('@/assets/icons/minus.svg')"
                alt="Remove"
            >
        </Button>
        <div class="details__info">
            <slot />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue';
import Button from '@/components/Button.vue';
import { CollectionItem } from '../types/CollectionItem';

interface Props {
    item: CollectionItem;
    imgSrc: string;
    result: boolean;
}

export default defineComponent({
    name: 'Details',
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
        back(): void {
            this.$router.back();
        },
        add(): void {
            this.$emit('onAdd');
        },
        remove(): void {
            this.$emit('onRemove');
        },
    },
    setup(props) {
        const item = toRef(props.params, 'item');
        const imgSrc = toRef(props.params, 'imgSrc');
        const result = toRef(props.params, 'result');

        // expose to template
        return {
            item,
            imgSrc,
            result,
        };
    },
});
</script>

<style lang="scss" scoped>
.details {
    display: grid;
    grid-template-columns: auto minmax(400px, 1fr) auto;
    grid-template-rows: min-content minmax(auto, 1fr) 1fr;
    grid-column-gap: 1rem;
    .details__back-btn {
        grid-row-start: 1;
        grid-row-end: 1;
        grid-column-start: 1;
        grid-column-end: 1;
        box-shadow:  5px 5px 15px #1a022f,
                    -5px -5px 15px #23023f;
        &:hover {
            box-shadow: inset 15px 15px 30px #1a022f,
                        inset -15px -15px 30px #23023f;
        }
        img {
            width: 4rem;
            height: auto;
        }
    }
    .details__cover {
        grid-row-start: 1;
        grid-row-end: 3;
        grid-column-start: 2;
        grid-column-end: 2;
        width: 400px;
        height: auto;
    }
    .details__add-btn, .details__remove-btn {
        grid-row-start: 1;
        grid-row-end: 1;
        grid-column-start: 3;
        grid-column-end: 3;
        box-shadow:  5px 5px 15px #1a022f,
                    -5px -5px 15px #23023f;
        &:hover {
            box-shadow: inset 15px 15px 30px #1a022f,
                        inset -15px -15px 30px #23023f;
        }
        img {
            width: 4rem;
            height: auto;
        }
    }
    .details__info {
        grid-row-start: 3;
        grid-column-start: 2;
        grid-column-end: 2;
    }
}
</style>
