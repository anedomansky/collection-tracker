import { ICollectionService } from '@/interfaces/ICollectionService';

class CollectionService implements ICollectionService {
    private static instance: ICollectionService;

    constructor() {
        CollectionService.instance = this;
    }

    static getInstance(): CollectionService {
        if (this.instance) {
            return this.instance;
        }
        return new CollectionService();
    }
}

export default CollectionService;
