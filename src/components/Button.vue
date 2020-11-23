<template>
    <button
        :type="`${typeRef ? typeRef : 'button'}`"
        :class="`btn ${additionalClassRef}`"
        tabindex="0"
        @click.stop="onClick"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
    name: 'Button',
    props: {
        type: {
            type: String,
            required: false,
        },
        additionalClass: {
            type: String,
            required: false,
        },
    },
    methods: {
        onClick(): void {
            console.log(this.$store.state.result);
            console.log(this.$store.getters['result/currentUpdatingData']);
            // this.$store.dispatch('yourModuleName/doSomething') - action
            // this.$store.commit('yourModuleName/doSomething') - mutation
            this.$emit('on-click');
        },
    },
    setup(props) {
        const typeRef = toRefs(props).type;
        const additionalClassRef = toRefs(props).additionalClass;

        // expose to template
        return {
            typeRef,
            additionalClassRef,
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
