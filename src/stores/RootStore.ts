import { IRootStore } from '@/interfaces/IRootStore';
import ResultStore from './ResultStore';
import CollectionStore from './CollectionStore';

class RootStore {
    private static instance: IRootStore;

    resultStore: ResultStore;

    collectionStore: CollectionStore;

    constructor() {
        RootStore.instance = this;
        this.resultStore = new ResultStore();
        this.collectionStore = new CollectionStore();
    }

    public static getInstance(): RootStore {
        if (this.instance) {
            return this.instance;
        }
        return new RootStore();
    }
}

export default RootStore.getInstance();
