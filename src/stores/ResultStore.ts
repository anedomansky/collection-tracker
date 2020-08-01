import { observable, computed, action } from 'mobx';
import { IBookResult } from '@/interfaces/IBookResult';
import { IShowResponse } from '@/interfaces/IShowResponse';
import { IPeopleResponse } from '@/interfaces/IPeopleResponse';
import { IGameResult } from '@/interfaces/IGameResult';

class ResultStore {
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
}

export default ResultStore;
