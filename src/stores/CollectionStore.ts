import {
    action, computed, observable, makeObservable,
} from 'mobx';
import { IBookCollectionItem } from '../interfaces/IBookCollectionItem';
import { IGameCollectionItem } from '../interfaces/IGameCollectionItem';
import { IShowCollectionItem } from '../interfaces/IShowCollectionItem';
import { CollectionItem } from '../types/CollectionItem';

class CollectionStore {
    private updatingData: boolean;

    private books: IBookCollectionItem[] | null;

    private shows: IShowCollectionItem[] | null;

    private games: IGameCollectionItem[] | null;

    constructor() {
        makeObservable<this, 'updatingData' | 'books' | 'shows' | 'games'>(this, {
            updatingData: observable,
            books: observable,
            shows: observable,
            games: observable,
            currentUpdatingData: computed,
            currentBooks: computed,
            currentShows: computed,
            currentGames: computed,
            getCollectionItem: action,
        });
        this.updatingData = false;
        this.books = null;
        this.shows = null;
        this.games = null;
    }

    public get currentUpdatingData(): boolean {
        return this.updatingData;
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

    public setUpdatingData(updating: boolean): void {
        this.updatingData = updating;
    }

    public setBooks(books: IBookCollectionItem[]): void {
        this.books = books;
    }

    public setShows(shows: IShowCollectionItem[]): void {
        this.shows = shows;
    }

    public setGames(games: IGameCollectionItem[]): void {
        this.games = games;
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

    public removeCollectionItem(category: string, item: CollectionItem): void {
        if (category.toLowerCase() === 'books') {
            const newBooks = this.books?.filter((book) => book.id !== item?.id);
            if (newBooks) {
                this.books = newBooks;
            }
        }
        if (category.toLowerCase() === 'games') {
            const newGames = this.games?.filter((game) => game.id !== item?.id);
            if (newGames) {
                this.games = newGames;
            }
        }
        if (category.toLowerCase() === 'shows') {
            const newShows = this.shows?.filter((show) => show.id !== item?.id);
            if (newShows) {
                this.shows = newShows;
            }
        }
    }

    public reset(): void {
        this.books = null;
        this.games = null;
        this.shows = null;
    }
}

export default CollectionStore;
