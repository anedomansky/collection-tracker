<template>
    <div class="search__panel" v-show="show">
        <select name="Type" id="type">
            <option v-for="type in typeValues" :key="type" :value="type">{{ type }}</option>
        </select>
        <input type="text" />
        <button type="button">
            <NavIcon icon="search.svg" altText="Search" :to="'/result/list/' + category + '/:term'" />
        </button>
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
}
</script>

<style lang="scss" scoped>
.search__panel {
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
</style>
