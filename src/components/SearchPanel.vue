<template>
    <div class="search__panel" v-show="show">
        <select name="Type" id="type" v-model="currentType">
            <option v-for="type in typeValues" :key="type" :value="type">{{ type }}</option>
        </select>
        <form @submit.prevent="null">
            <input type="text" placeholder="Enter a search term..." v-model="term" />
            <button type="submit">
                <NavIcon icon="search.svg" altText="Search" :to="'/result/list/' + category + '/' + currentType.toLowerCase() + '/' + term" additionalClassNames="search" />
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NavIcon from './NavIcon.vue';

@Component({
    components: {
        NavIcon,
    },
})
export default class Search extends Vue {
    @Prop() private typeValues!: string[];

    @Prop() private show!: boolean;

    @Prop() private category!: string;

    term: string;

    currentType: string;

    constructor() {
        super();
        this.term = '';
        this.currentType = this.typeValues[0];
    }
}
</script>

<style lang="scss" scoped>
.search__panel {
    padding-top: 1rem;
    height: 100%;
    display: grid;
    grid-template-areas:
    "select . . ."
    ". . . ."
    "search search search search"
    ". . . .";
    grid-template-rows: min-content 1fr min-content 1fr;

    & select {
        grid-area: select;
        height: 2.5rem;
        width: 250px;
        font-size: 1.5rem;
        margin-left: 1rem;
    }

    & form {
        grid-area: search;
        display: flex;
        justify-content: center;
        align-items: center;

        & input {
            height: 2.5rem;
            font-size: 1.5rem;
        }

        & button {
            grid-area: search;
            border: none;
            outline: none;
            background: none;
        }
    }
}
</style>
