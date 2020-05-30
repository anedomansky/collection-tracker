import { RouteConfig } from 'vue-router';
import LandingPage from './components/LandingPage.vue';

const routes: RouteConfig[] = [
    {
        component: LandingPage,
        path: '/',
    },
];

export default routes;
