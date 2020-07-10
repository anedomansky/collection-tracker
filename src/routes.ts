import { RouteConfig } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import CollectionListPage from './components/CollectionListPage.vue';
import SearchResultPage from './components/SearchResultPage.vue';
import SearchDetailsPage from './components/SearchDetailsPage.vue';

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
    {
        component: SearchResultPage,
        path: '/result/list/:category/:type/:term',
        props: true,
    },
    {
        component: SearchDetailsPage,
        path: '/result/details/:title',
        props: true,
    },
];

export default routes;
