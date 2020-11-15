<template>
    <button
        :type="`${type ? type : 'button'}`"
        :class="`btn ${additionalClass}`"
        tabindex="0"
        @click.stop="onClick"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue';

interface Props {
    additionalClass?: string;
    type?: string;
}

export default defineComponent({
    name: 'Button',
    props: {
        params: {
            type: Object as PropType<Props>,
        },
    },
    methods: {
        onClick(): void {
            this.$emit('onClick');
        },
    },
    setup(props) {
        const type = props.params && toRef(props.params, 'type');
        const additionalClass = props.params && toRef(props.params, 'additionalClass');

        // expose to template
        return {
            type,
            additionalClass,
        };
    },
});
</script>

<style lang="scss" scoped>
.btn {
    cursor: pointer;
    background: none;
    border-radius: 1rem;
    border: none;
}
</style>
