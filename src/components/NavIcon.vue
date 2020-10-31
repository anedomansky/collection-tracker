<template>
    <router-link
        :to="params.to"
        class="nav-icon"
    >
        <img
            :class="params.additionalClassNames"
            :src="`/assets/icons/${params.icon}`"
            :alt="params.altText"
        >
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Props {
    icon: string;
    altText: string;
    to: string;
    additionalClassNames: string;
}

export default defineComponent({
    name: 'NavIcon',
    props: {
        params: {
            type: Object as PropType<Props>,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>
.nav-icon {
    & img {
        height: auto;
        width: 100px;
        border-radius: 1rem;
        background: #ffffff;
        box-shadow: -20px 20px 60px #d9d9d9,
                    20px -20px 60px #ffffff;

        &:hover {
            box-shadow: inset -20px 20px 60px #d9d9d9,
                        inset 20px -20px 60px #ffffff;
        }
    }

    & .plus, .minus, .cross, .checkmark {
        box-shadow: none;

        &:hover {
            box-shadow: none;
        }
    }
}
</style>
