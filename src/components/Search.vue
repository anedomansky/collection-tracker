<template>
    <article class="search">
        <Button
            :additionalClass="`search__tab tab-1 ${state.activeTab === 0 ? 'active': '' }`"
            @on-click="toggleTab(0)"
        >
            Books
        </button>
        <Button
            :additionalClass="`search__tab tab-2 ${state.activeTab === 1 ? 'active' : ''}`"
            @on-click="toggleTab(1)"
        >
            Games
        </button>
        <Button
            :additionalClass="`search__tab tab-3 ${state.activeTab === 2 ? 'active' : ''}`"
            @on-click="toggleTab(2)"
        >
            Shows
        </button>
        <div class="search__panels">
            <SearchPanel
                :typeValues="['Title', 'Genre', 'Author']"
                :show="state.activeTab === 0"
                category="Books"
            />
            <SearchPanel
                :typeValues="['Title', 'Genre', 'Developer']"
                :show="state.activeTab === 1"
                category="Games"
            />
            <SearchPanel
                :typeValues="['Title']"
                :show="state.activeTab === 2"
                category="Shows"
            />
        </div>
    </article>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Button from '@/components/Button.vue';
import SearchPanel from '@/components/SearchPanel.vue';

interface State {
    activeTab: number;
}

export default defineComponent({
    name: 'Search',
    components: {
        SearchPanel,
        Button,
    },
    setup() {
        const state: State = reactive({
            activeTab: 0,
        });

        const toggleTab = (tabNumber: number): void => {
            state.activeTab = tabNumber;
        };

        return {
            state,
            toggleTab,
        };
    },
});
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
        padding: 1rem 2rem;
        border-radius: 0;
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
