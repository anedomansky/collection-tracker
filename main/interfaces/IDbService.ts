import { CollectionItem } from '../types/CollectionItem';
import { IEntryRequest } from './IEntryRequest';
import { IRemoveRequest } from './IRemoveRequest';

export interface IDbService {
    addEntry(request: IEntryRequest): void;
    getEntries(type: string): CollectionItem[];
    removeEntry(request: IRemoveRequest): void;
}
