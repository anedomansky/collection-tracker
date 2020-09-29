import { ICollectionService } from '@/interfaces/ICollectionService';
import { IEntryRequest } from '../interfaces/IEntryRequest';
import { CollectionItem } from '../types/CollectionItem';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron');

class CollectionService implements ICollectionService {
    private static instance: ICollectionService;

    public static getInstance(): CollectionService {
        if (!CollectionService.instance) {
            CollectionService.instance = new CollectionService();
        }
        return CollectionService.instance;
    }

    public async getEntries(type: string): Promise<CollectionItem[]> {
        const entries = await ipcRenderer.invoke('/getEntries', type);
        return entries;
    }
    
    public async addEntry(request: IEntryRequest): Promise<void> {
        await ipcRenderer.invoke('/addEntry', request);
    }
}

export default CollectionService;
