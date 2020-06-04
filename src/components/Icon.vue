<template>
    <router-link :to="to" class="nav-icon">
        <img :src="require(`@/assets/icons/${icon}`)" :alt="altText"  />
    </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
    @Prop() private icon!: string;

    @Prop() private altText!: string;

    @Prop() private to!: string;
}
</script>

<style lang="scss" scoped>
.nav-icon {
    & img {
        height: auto;
        width: 20px;
    }
}
</style>
