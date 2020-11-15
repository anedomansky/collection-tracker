<template>
    <router-link
        :to="to"
        class="nav-icon"
    >
        <img
            :class="additionalClassNames"
            :src="require(`@/assets/icons/${icon}`)"
            :alt="altText"
        >
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue';

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
    setup(props) {
        const icon = toRef(props.params, 'icon');
        const altText = toRef(props.params, 'altText');
        const to = toRef(props.params, 'to');
        const additionalClassNames = toRef(props.params, 'additionalClassNames');

        // expose to template
        return {
            icon,
            altText,
            to,
            additionalClassNames,
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
