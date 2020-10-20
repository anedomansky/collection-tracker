import { createStore } from 'vuex';
import CollectionStore from './CollectionStore';
import ResultStore from './ResultStore';

export default createStore({
    state: {
        updatingData: false,
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        result: ResultStore,
        collection: CollectionStore,
    },
});
