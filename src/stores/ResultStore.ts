import { observable, computed, action } from 'mobx';
import { IBookResult } from '@/interfaces/IBookResult';
import { IShowResponse } from '@/interfaces/IShowResponse';
import { IPeopleResponse } from '@/interfaces/IPeopleResponse';
import { IGameResult } from '@/interfaces/IGameResult';
import Categories from '../enums/Categories';
import { Item } from '../types/Item';

class ResultStore {
    @observable
    private updatingData = false;

    @observable
    private books: IBookResult[] | null;

    @observable
    private shows: IShowResponse[] | null;

    @observable
    private people: IPeopleResponse[] | null;

    @observable
    private games: IGameResult[] | null;

    public constructor() {
        this.books = null;
        this.shows = null;
        this.people = null;
        this.games = null;
    }

    @computed
    public get currentUpdatingData(): boolean {
        return this.updatingData;
    }

    @computed
    public get currentBooks(): IBookResult[] | null {
        return this.books;
    }

    @computed
    public get currentShows(): IShowResponse[] | null {
        return this.shows;
    }

    @computed
    public get currentPeople(): IPeopleResponse[] | null {
        return this.people;
    }

    @computed
    public get currentGames(): IGameResult[] | null {
        return this.games;
    }

    @action
    public setUpdatingData(updating: boolean): void {
        this.updatingData = updating;
    }

    @action
    public setBooks(books: IBookResult[]): void {
        this.books = books;
    }

    @action
    public setShows(shows: IShowResponse[]): void {
        this.shows = shows;
    }

    @action
    public setPeople(people: IPeopleResponse[]): void {
        this.people = people;
    }

    @action
    public setGames(games: IGameResult[]): void {
        this.games = games;
    }

    @action
    public reset(): void {
        this.books = null;
        this.games = null;
        this.people = null;
        this.shows = null;
    }

    @action
    public getResultByTitle(category: string, title: string): Item {
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
        if (category === Categories.PEOPLE) {
            result = this.people?.find((person) => person.person.name === title);
        }
        return result ?? null;
    }
}

export default ResultStore;
