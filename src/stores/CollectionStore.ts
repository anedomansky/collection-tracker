import { ICollectionService } from '@/interfaces/ICollectionService';

class CollectionStore {
    private collectionService: ICollectionService;

    constructor(collectionService: ICollectionService) {
        this.collectionService = collectionService;
    }
}

export default CollectionStore;
