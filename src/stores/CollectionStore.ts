import { ICollectionService } from '@/interfaces/ICollectionService';
import { action, computed, observable } from 'mobx';
import { IBookCollectionItem } from '../interfaces/IBookCollectionItem';
import { IEntryRequest } from '../interfaces/IEntryRequest';
import { IGameCollectionItem } from '../interfaces/IGameCollectionItem';
import { IShowCollectionItem } from '../interfaces/IShowCollectionItem';
import { CollectionItem } from '../types/CollectionItem';

class CollectionStore {
    private collectionService: ICollectionService;

    @observable
    private updatingData = false;

    @observable
    private errorOccurred = false;

    @observable
    private books: IBookCollectionItem[] | null;

    @observable
    private shows: IShowCollectionItem[] | null;

    @observable
    private games: IGameCollectionItem[] | null;

    constructor(collectionService: ICollectionService) {
        this.collectionService = collectionService;
        this.books = null;
        this.shows = null;
        this.games = null;
    }

    @computed
    public get currentUpdatingData(): boolean {
        return this.updatingData;
    }

    @computed
    public get currentErrorOccurred(): boolean {
        return this.errorOccurred;
    }

    @computed
    public get currentBooks(): IBookCollectionItem[] | null {
        return this.books;
    }

    @computed
    public get currentShows(): IShowCollectionItem[] | null {
        return this.shows;
    }

    @computed
    public get currentGames(): IGameCollectionItem[] | null {
        return this.games;
    }

    @action
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

    @action
    public async addEntry(type: string, entry: CollectionItem): Promise<void> {
        try {
            this.errorOccurred = false;
            let entryRequest: IEntryRequest = {
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
