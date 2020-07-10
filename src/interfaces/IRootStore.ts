import ResultStore from '@/stores/ResultStore';
import CollectionStore from '@/stores/CollectionStore';

export interface IRootStore {
    resultStore: ResultStore;
    collectionStore: CollectionStore;
}
