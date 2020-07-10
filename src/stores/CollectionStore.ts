import { ICollectionService } from '@/interfaces/ICollectionService';

class CollectionStore {
    collectionService: ICollectionService;

    constructor(collectionService: ICollectionService) {
        this.collectionService = collectionService;
    }
}

export default CollectionStore;
