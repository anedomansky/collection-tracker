import { ICollectionService } from '@/interfaces/ICollectionService';

class CollectionService implements ICollectionService {
    private static instance: ICollectionService;

    public static getInstance(): CollectionService {
        if (!CollectionService.instance) {
            CollectionService.instance = new CollectionService();
        }
        return CollectionService.instance;
    }
}

export default CollectionService;
