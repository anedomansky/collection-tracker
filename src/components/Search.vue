<template>
    <article class="search">
        <button type="button" class="search__tab" :class="{ active: activeTab === 0 }" @click="toggleTab(0)">Books</button>
        <button type="button" class="search__tab" :class="{ active: activeTab === 1 }" @click="toggleTab(1)">Games</button>
        <button type="button" class="search__tab" :class="{ active: activeTab === 2 }" @click="toggleTab(2)">Videos</button>
        <div class="search__panel" v-show="activeTab === 0">
            <select name="" id="">
                <option value="">Name</option>
                <option value="">Genre</option>
                <option value="">Author</option>
            </select>
            <input type="text" />
            <button type="button">
                <NavIcon icon="search.svg" altText="Search" to="/result/list/:category/:term" />
            </button>
        </div>
        <div class="search__panel" v-show="activeTab === 1">Games</div>
        <div class="search__panel" v-show="activeTab === 2">Videos</div>
    </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavIcon from './NavIcon.vue';

// TODO: style component
@Component({
    components: {
        NavIcon,
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
