import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { DetailsPageProps } from '../interfaces/DetailsPageProps';
import LandingPage from '../views/LandingPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
    },
    {
        path: '/collection/list/:type',
        name: 'CollectionListPage',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "CollectionListPage" */ '../views/CollectionListPage.vue'),
    },
    {
        path: '/result/details/:category/:title',
        props: (route): DetailsPageProps => (
            {
                category: route.params.category,
                title: route.params.title,
                result: true,
            }
        ),
        component: () => import(/* webpackChunkName: "ResultDetailsPage" */ '../views/DetailsPage.vue'),
    },
    {
        path: '/collection/details/:category/:title',
        props: (route): DetailsPageProps => (
            {
                category: route.params.category,
                title: route.params.title,
                result: false,
            }
        ),
        component: import(/* webpackChunkName: "CollectionDetailsPage" */ '../views/DetailsPage.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
