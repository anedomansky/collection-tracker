<template>
    <router-link
        :to="toRef"
        class="nav-icon"
    >
        <img
            :class="additionalClassNamesRef"
            :src="require(`@/assets/icons/${iconRef}`)"
            :alt="altTextRef"
        >
    </router-link>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
    name: 'NavIcon',
    props: {
        icon: {
            type: String,
            required: true,
        },
        altText: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        additionalClassNames: {
            type: String,
            required: false,
        },
    },
    setup(props) {
        const iconRef = toRefs(props).icon;
        const altTextRef = toRefs(props).altText;
        const toRef = toRefs(props).to;
        const additionalClassNamesRef = toRefs(props).additionalClassNames;

        // expose to template
        return {
            iconRef,
            altTextRef,
            toRef,
            additionalClassNamesRef,
        };
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
