import { ICollectionService } from '@/interfaces/ICollectionService';
import {
    action, computed, observable, makeObservable,
} from 'mobx';
import { IBookCollectionItem } from '../interfaces/IBookCollectionItem';
import { IEntryRequest } from '../interfaces/IEntryRequest';
import { IGameCollectionItem } from '../interfaces/IGameCollectionItem';
import { IShowCollectionItem } from '../interfaces/IShowCollectionItem';
import { CollectionItem } from '../types/CollectionItem';

class CollectionStore {
    private collectionService: ICollectionService;

    private updatingData: boolean;

    private errorOccurred: boolean;

    private books: IBookCollectionItem[] | null;

    private shows: IShowCollectionItem[] | null;

    private games: IGameCollectionItem[] | null;

    constructor(collectionService: ICollectionService) {
        makeObservable<this, 'updatingData' | 'errorOccurred' | 'books' | 'shows' | 'games'>(this, {
            updatingData: observable,
            errorOccurred: observable,
            books: observable,
            shows: observable,
            games: observable,
            currentUpdatingData: computed,
            currentErrorOccurred: computed,
            currentBooks: computed,
            currentShows: computed,
            currentGames: computed,
            getCollectionItem: action,
            getEntries: action,
            addEntry: action,
        });
        this.collectionService = collectionService;
        this.updatingData = false;
        this.errorOccurred = false;
        this.books = null;
        this.shows = null;
        this.games = null;
    }

    public get currentUpdatingData(): boolean {
        return this.updatingData;
    }

    public get currentErrorOccurred(): boolean {
        return this.errorOccurred;
    }

    public get currentBooks(): IBookCollectionItem[] | null {
        return this.books;
    }

    public get currentShows(): IShowCollectionItem[] | null {
        return this.shows;
    }

    public get currentGames(): IGameCollectionItem[] | null {
        return this.games;
    }

    public getCollectionItem(category: string, title: string): CollectionItem {
        let result;
        if (category.toLowerCase() === 'books') {
            result = this.books?.find((book) => book.title === title);
        }
        if (category.toLowerCase() === 'games') {
            result = this.games?.find((game) => game.name === title);
        }
        if (category.toLowerCase() === 'shows') {
            result = this.shows?.find((show) => show.name === title);
        }
        return result ?? null;
    }

    public async getEntries(type: string): Promise<void> {
        try {
            this.errorOccurred = false;
            this.updatingData = true;
            const entries = await this.collectionService.getEntries(type);
            if (type === 'books') {
                this.books = entries as IBookCollectionItem[];
            }
            if (type === 'shows') {
                this.shows = entries as IShowCollectionItem[];
            }
            if (type === 'games') {
                this.games = entries as IGameCollectionItem[];
            }
        } catch (error) {
            console.error(error);
            this.errorOccurred = true;
        } finally {
            this.updatingData = false;
        }
    }

    public async addEntry(type: string, entry: CollectionItem): Promise<void> {
        try {
            this.errorOccurred = false;
            const entryRequest: IEntryRequest = {
                type,
                entry,
            };
            await this.collectionService.addEntry(entryRequest);
        } catch (error) {
            console.error(error);
            this.errorOccurred = true;
        }
    }
}

export default CollectionStore;
