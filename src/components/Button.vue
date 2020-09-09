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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
    @Prop() private additionalClass?: string;

    @Prop() private type?: string;

    onClick(): void {
        this.$emit('onClick');
    }
}
</script>

<style lang="scss" scoped>
.btn {
    cursor: pointer;
    background: none;
    border-radius: 1rem;
    border: none;
}
</style>
