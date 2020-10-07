import {
    observable,
    computed,
    action,
    makeObservable,
} from 'mobx';
import { IBookResult } from '@/interfaces/IBookResult';
import { IShowResponse } from '@/interfaces/IShowResponse';
import { IGameResult } from '@/interfaces/IGameResult';
import Categories from '../enums/Categories';
import { ResultItem } from '../types/ResultItem';

class ResultStore {
    private updatingData: boolean;

    private books: IBookResult[] | null;

    private shows: IShowResponse[] | null;

    private games: IGameResult[] | null;

    public constructor() {
        makeObservable<this, 'updatingData' | 'books' | 'shows' | 'games'>(this, {
            updatingData: observable,
            books: observable,
            shows: observable,
            games: observable,
            currentUpdatingData: computed,
            currentBooks: computed,
            currentShows: computed,
            currentGames: computed,
            setUpdatingData: action,
            setBooks: action,
            setShows: action,
            setGames: action,
            reset: action,
            getResult: action,
        });
        this.updatingData = false;
        this.books = null;
        this.shows = null;
        this.games = null;
    }

    public get currentUpdatingData(): boolean {
        return this.updatingData;
    }

    public get currentBooks(): IBookResult[] | null {
        return this.books;
    }

    public get currentShows(): IShowResponse[] | null {
        return this.shows;
    }

    public get currentGames(): IGameResult[] | null {
        return this.games;
    }

    public setUpdatingData(updating: boolean): void {
        this.updatingData = updating;
    }

    public setBooks(books: IBookResult[]): void {
        this.books = books;
    }

    public setShows(shows: IShowResponse[]): void {
        this.shows = shows;
    }

    public setGames(games: IGameResult[]): void {
        this.games = games;
    }

    public reset(): void {
        this.books = null;
        this.games = null;
        this.shows = null;
    }

    public getResult(category: string, title: string): ResultItem {
        let result;
        if (category === Categories.BOOKS) {
            result = this.books?.find((book) => book.title === title);
        }
        if (category === Categories.GAMES) {
            result = this.games?.find((game) => game.name === title);
        }
        if (category === Categories.SHOWS) {
            result = this.shows?.find((show) => show.show.name === title);
        }
        return result ?? null;
    }
}

export default ResultStore;
