import { RouteConfig } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import CollectionListPage from './components/CollectionListPage.vue';

const routes: RouteConfig[] = [
    {
        component: LandingPage,
        path: '/',
    },
    {
        component: CollectionListPage,
        path: '/collection/list/:name',
        props: true,
    },
];

export default routes;
