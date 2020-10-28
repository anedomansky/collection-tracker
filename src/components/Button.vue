<template>
    <button
        :type="`${params.type ? params.type : 'button'}`"
        :class="`btn ${params.additionalClass}`"
        tabindex="0"
        @click.stop="onClick"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

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
