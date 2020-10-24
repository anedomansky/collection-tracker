import { ActionContext } from 'vuex';
import Categories from '../enums/Categories';
import { IBookResult } from '../interfaces/IBookResult';
import { IGameResult } from '../interfaces/IGameResult';
import { IResultStoreState } from '../interfaces/IResultStoreState';
import { IShowResponse } from '../interfaces/IShowResponse';
import { ResultItem } from '../types/ResultItem';

interface ResultPayload {
    category: string;
    title: string;
}

const ResultStore = {
    state: () => ({
        updatingData: false,
        books: null,
        shows: null,
        games: null,
        resultItem: null,
    } as IResultStoreState),
    mutations: {
        setUpdatingData(state: IResultStoreState, payload: boolean) {
            state.updatingData = payload;
        },
        setBooks(state: IResultStoreState, payload: IBookResult[] | null) {
            state.books = payload;
        },
        setShows(state: IResultStoreState, payload: IShowResponse[] | null) {
            state.shows = payload;
        },
        setGames(state: IResultStoreState, payload: IGameResult[] | null) {
            state.games = payload;
        },
        setResultItem(state: IResultStoreState, payload: ResultItem) {
            state.resultItem = payload;
        },
    },
    actions: {
        reset({ commit }: ActionContext<IResultStoreState, {}>) {
            commit('setBooks', null);
            commit('setShows', null);
            commit('setGames', null);
        },
        getResult({ commit, state }: ActionContext<IResultStoreState, {}>, payload: ResultPayload) {
            const { category, title } = payload;
            let result;
            if (category === Categories.BOOKS) {
                result = state.books?.find((book) => book.title === title);
            }
            if (category === Categories.GAMES) {
                result = state.games?.find((game) => game.name === title);
            }
            if (category === Categories.SHOWS) {
                result = state.shows?.find((show) => show.show.name === title);
            }
            commit('setResultItem', result);
        },
    },
    getters: {
        currentUpdatingData(state: IResultStoreState) {
            return state.updatingData;
        },
        currentBooks(state: IResultStoreState) {
            return state.books;
        },
        currentShows(state: IResultStoreState) {
            return state.shows;
        },
        currentGames(state: IResultStoreState) {
            return state.games;
        },
    },
};

export default ResultStore;
