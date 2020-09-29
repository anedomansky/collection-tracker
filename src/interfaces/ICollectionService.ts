import { CollectionItem } from '../types/CollectionItem';
import { IEntryRequest } from './IEntryRequest';

export interface ICollectionService {
    getEntries(type: string): Promise<CollectionItem[]>;
    addEntry(request: IEntryRequest): Promise<void>;
}
