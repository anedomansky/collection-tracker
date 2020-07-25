<template>
    <article class="search">
        <button type="button" tabindex="0" class="search__tab tab-1" :class="{ active: activeTab === 0 }" @click="toggleTab(0)">Books</button>
        <button type="button" tabindex="0" class="search__tab tab-2" :class="{ active: activeTab === 1 }" @click="toggleTab(1)">Games</button>
        <button type="button" tabindex="0" class="search__tab tab-3" :class="{ active: activeTab === 2 }" @click="toggleTab(2)">Shows</button>
        <div class="search__panels">
            <SearchPanel :typeValues="['Title', 'Genre', 'Author']" :show="activeTab === 0" :category="'Books'" />
            <SearchPanel :typeValues="['Title', 'Genre', 'Developer']" :show="activeTab === 1" :category="'Games'" />
            <SearchPanel :typeValues="['Title', 'Person']" :show="activeTab === 2" :category="'Shows'" />
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchPanel from './SearchPanel.vue';

@Component({
    components: {
        SearchPanel,
    },
})
export default class Search extends Vue {
    activeTab = 0;

    toggleTab(tabNumber: number): void {
        this.activeTab = tabNumber;
    }
}
</script>

<style lang="scss" scoped>
.search {
    font-size: 2rem;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 1rem;
    display: grid;
    grid-template-areas:
    "tab-1 tab-2 tab-3 ."
    "panels panels panels panels";
    grid-template-rows: min-content 1fr;

    & .active {
        background-color: inherit;
    }

    & .search__tab {
        font-size: inherit;
        border: none;
        cursor: pointer;
        padding: 1rem 2rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    & button {
        background-color: #DBD7D7;
    }

    & .tab-1 {
        grid-area: tab-1;
    }

    & .tab-2 {
        grid-area: tab-2;
    }

    & .tab-3 {
        grid-area: tab-3;
    }

    & .search__panels {
        grid-area: panels;
    }
}
</style>
