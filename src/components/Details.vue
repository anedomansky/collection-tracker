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
        <div class="details__cover">
            <img
                :src="imgSrcRef"
                alt="Cover"
            >
        </div>
        <Button
            v-if="resultRef"
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
import { defineComponent, toRefs } from 'vue';
import Button from '@/components/Button.vue';

export default defineComponent({
    name: 'Details',
    components: {
        Button,
    },
    props: {
        imgSrc: {
            type: String,
            required: true,
        },
        result: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        back(): void {
            this.$router.back();
        },
        add(): void {
            this.$emit('on-add');
        },
        remove(): void {
            this.$emit('on-remove');
        },
    },
    setup(props) {
        const imgSrcRef = toRefs(props).imgSrc;
        const resultRef = toRefs(props).result;

        // expose to template
        return {
            imgSrcRef,
            resultRef,
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
        height: 0;
        padding-bottom: 100%;
        position: relative;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
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
