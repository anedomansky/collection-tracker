import ResultService from '@/services/ResultService';
import CollectionService from '@/services/CollectionService';
import { IRootStore } from '@/interfaces/IRootStore';
import ResultStore from './ResultStore';
import CollectionStore from './CollectionStore';

class RootStore {
    private static instance: IRootStore;

    resultStore: ResultStore;

    collectionStore: CollectionStore;

    constructor() {
        RootStore.instance = this;
        this.resultStore = new ResultStore(ResultService.getInstance());
        this.collectionStore = new CollectionStore(CollectionService.getInstance());
    }

    static getInstance(): RootStore {
        if (this.instance) {
            return this.instance;
        }
        return new RootStore();
    }
}

export default RootStore.getInstance();
