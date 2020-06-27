<template>
    <router-link :to="to" class="nav-icon">
        <img :class="additionalClassNames" :src="require(`@/assets/icons/${icon}`)" :alt="altText"  />
    </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NavIcon extends Vue {
    @Prop() private icon!: string;

    @Prop() private altText!: string;

    @Prop() private to!: string;

    @Prop() private additionalClassNames!: string;
}
</script>

<style lang="scss" scoped>
.nav-icon {
    & img {
        height: auto;
        width: 100px;
        border-radius: 1rem;
        background: #ffffff;
        box-shadow: -20px 20px 60px #d9d9d9,
                    20px -20px 60px #ffffff;

        &:hover {
            box-shadow: inset -20px 20px 60px #d9d9d9,
                        inset 20px -20px 60px #ffffff;
        }
    }

    & .plus, .minus, .cross, .checkmark {
        box-shadow: none;

        &:hover {
            box-shadow: none;
        }
    }
}
</style>
