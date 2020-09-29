import { Route, RouteConfig } from 'vue-router';
import LandingPage from './components/LandingPage.vue';
import CollectionListPage from './components/CollectionListPage.vue';
import SearchResultPage from './components/SearchResultPage.vue';
import DetailsPage from './components/DetailsPage.vue';
import { IDetailsPageProps } from './interfaces/IDetailsPageProps';

const routes: RouteConfig[] = [
    {
        component: LandingPage,
        path: '/',
    },
    {
        component: CollectionListPage,
        path: '/collection/list/:type',
        props: true,
    },
    {
        component: SearchResultPage,
        path: '/result/list/:category/:type/:term',
        props: true,
    },
    {
        component: DetailsPage,
        path: '/result/details/:category/:title',
        props: (route: Route): IDetailsPageProps => (
            {
                category: route.params.category,
                title: route.params.title,
                result: true,
            }
        ),
    },
    {
        component: DetailsPage,
        path: '/collection/details/:category/:title',
        props: (route: Route): IDetailsPageProps => (
            {
                category: route.params.category,
                title: route.params.title,
                result: false,
            }
        ),
    },
];

export default routes;
