<template>
    <article class="collection-list-page">
        <div class="collection-list-page__content">
            <div>CollectionItem1 {{ name }}</div>
            <div>CollectionItem2</div>
            <div>CollectionItem3</div>
            <div>CollectionItem4</div>
            <div>CollectionItem5</div>
            <div>CollectionItem6</div>
            <div>CollectionItem7</div>
        </div>
    </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CollectionListPage extends Vue {
    @Prop() private name!: string;
}
</script>

<style lang="scss" scoped>
.collection-list-page {
    & .collection-list-page__content {
        display: flex;
        flex-wrap: wrap;
        color: #ffffff;

        & div {
            flex: 0 0 21%;
            margin: 5px;
        }
    }
}
</style>
