import { IDbService } from '../interfaces/IDbService';
import { IEntryRequest } from '../interfaces/IEntryRequest';
import { Item } from '../types/Item';

class DbService implements IDbService {
    private static instance: DbService;

    public static getInstance(): DbService {
        if (!DbService.instance) {
            DbService.instance = new DbService();
        }

        return DbService.instance;
    }

    public addEntry(request: IEntryRequest): void {

    }

    public getEntries(type: string): Item[] {

    }

    public removeEntry(request: IEntryRequest): void {

    }
}

export default DbService;
