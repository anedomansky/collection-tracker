<template>
    <div
        class="search__panel"
        v-show="show"
    >
        <select
            name="Type"
            id="type"
            v-model="currentType"
        >
            <option
                v-for="type in typeValues"
                :key="type"
                :value="type"
            >
                {{ type }}
            </option>
        </select>
        <form @submit.prevent="submit">
            <input
                type="text"
                placeholder="Enter a search term..."
                v-model="term"
            >
            <Button :params="{ type: 'submit' }">
                <img
                    :src="require('@/assets/icons/search.svg')"
                    alt="Search"
                >
            </Button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue';
import Button from '@/components/Button.vue';

interface Props {
    typeValues: string[];
    show: boolean;
    category: string;
}

interface State {
    term: string;
    currentType: string;
}

export default defineComponent({
    name: 'SearchPanel',
    components: {
        Button,
    },
    props: {
        params: {
            type: Object as PropType<Props>,
            required: true,
        },
    },
    data: (props): State => ({
        term: '',
        currentType: props.params.typeValues[0],
    }),
    methods: {
        submit(): void {
            if (this.term.length === 0) return;
            this.$router.push(`/result/list/${this.params.category}/${this.currentType.toLowerCase()}/${this.term}`);
        },
    },
    setup(props) {
        const show = toRef(props.params, 'show');
        const typeValues = toRef(props.params, 'typeValues');
        const category = toRef(props.params, 'category');

        // expose to template
        return {
            show,
            typeValues,
            category,
        };
    },
});
</script>

<style lang="scss" scoped>
.search__panel {
    padding-top: 1rem;
    display: grid;
    grid-template-areas:
    "select . . ."
    "search search search search"
    ". . . .";
    grid-template-rows: 1fr 1fr 1fr;

    & select {
        grid-area: select;
        height: 3rem;
        width: 250px;
        font-size: 1.5rem;
        margin-left: 1rem;
        border: 5px solid #1E0237;
        border-radius: 15px;
        background-color: #ffffff;
        cursor: pointer;
    }

    & form {
        grid-area: search;
        display: flex;
        justify-content: center;
        align-items: center;

        & input {
            flex: 0 1 50%;
            height: 2.5rem;
            font-size: 1.5rem;
            border: 5px solid #1E0237;
            border-radius: 15px;
            margin-right: 2rem;
            padding: 0.5rem;
            box-shadow: inset 0 0 10px #808080;

            &:focus {
                box-shadow: none;
            }
        }

        & button {
            grid-area: search;

            & img {
                height: auto;
                width: 4rem;
                border-radius: 1rem;
                background: #ffffff;
                box-shadow: -20px 20px 60px #d9d9d9,
                            20px -20px 60px #ffffff;

                &:hover {
                    box-shadow: inset -20px 20px 60px #d9d9d9,
                                inset 20px -20px 60px #ffffff;
                }
            }
        }
    }
}
</style>
