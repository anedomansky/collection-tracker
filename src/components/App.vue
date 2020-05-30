<template>
  <div id="content" role="application">
    <Nav />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Nav from './Nav.vue';

@Component({
    components: {
        Nav,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
}

#content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  min-width: 525px;
  height: 100vh;
  margin: 0;
  display: grid;
  grid-template-areas: "nav main main main";
  grid-template-columns: 100px auto;

  & main {
    grid-area: main;
    background-color: #1E0237;
    display: grid;
  }
}
</style>
