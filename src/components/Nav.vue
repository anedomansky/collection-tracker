<template>
    <nav>Nav</nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Nav extends Vue {}
</script>

<style lang="scss" scoped>
nav {
    grid-area: nav;
    background-color: #FFFFFF;
}
</style>
