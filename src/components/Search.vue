<template>
    <article class="search">
        <button type="button" class="search__tab" :class="{ active: activeTab === 0 }" @click="toggleTab(0)">Books</button>
        <button type="button" class="search__tab" :class="{ active: activeTab === 1 }" @click="toggleTab(1)">Games</button>
        <button type="button" class="search__tab" :class="{ active: activeTab === 2 }" @click="toggleTab(2)">Videos</button>
        <SearchPanel :typeValues="['Title', 'Genre', 'Author']" :show="activeTab === 0" :category="'books'" />
        <SearchPanel :typeValues="['Title', 'Genre', 'Developer']" :show="activeTab === 1" :category="'games'" />
        <SearchPanel :typeValues="['Name', 'Genre', 'Author']" :show="activeTab === 2" :category="'videos'" />
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchPanel from './SearchPanel.vue';

// TODO: style component
// TODO: find API for videos
@Component({
    components: {
        SearchPanel,
    },
})
export default class Search extends Vue {
    activeTab = 0;

    toggleTab(tabNumber: number) {
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
    height: 100%;

    & .active {
        background-color: inherit;
    }

    & .search__tab:first-of-type {
        margin-left: 1rem;
    }

    & .search__tab {
        font-size: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 1rem 2rem;
    }

    & .search__panel {
        clear: both;

        & button {
            border: none;
            outline: none;
            background: none;
        }

        & img {
            height: auto;
            width: 50px;
        }
    }
}
</style>
