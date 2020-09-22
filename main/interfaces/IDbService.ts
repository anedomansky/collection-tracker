import { Item } from '../types/Item';
import { IEntryRequest } from './IEntryRequest';

export interface IDbService {
    addEntry(request: IEntryRequest): void;
    getEntries(type: string): Item[];
    removeEntry(request: IEntryRequest): void;
}
