<template>
    <article class="search">
        <button type="button" class="search__tab" @click="toggleTab(0)">Books</button>
        <button type="button" class="search__tab" @click="toggleTab(1)">Games</button>
        <button type="button" class="search__tab" @click="toggleTab(2)">Videos</button>
        <div class="search__panel" v-show="activeTab === 0">Books</div>
        <div class="search__panel" v-show="activeTab === 1">Games</div>
        <div class="search__panel" v-show="activeTab === 2">Videos</div>
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// TODO: style component
@Component
export default class Search extends Vue {
    activeTab = 0;

    toggleTab(tabNumber: number) {
        this.activeTab = tabNumber;
    }
}
</script>

<style lang="scss" scoped>
</style>
