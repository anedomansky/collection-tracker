import { ActionContext } from 'vuex';
import Categories from '../enums/Categories';
import { BookResult } from '../interfaces/BookResult';
import { GameResult } from '../interfaces/GameResult';
import { ResultStoreState } from '../interfaces/ResultStoreState';
import { ShowResponse } from '../interfaces/ShowResponse';
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
    } as ResultStoreState),
    mutations: {
        setUpdatingData(state: ResultStoreState, payload: boolean) {
            state.updatingData = payload;
        },
        setBooks(state: ResultStoreState, payload: BookResult[] | null) {
            state.books = payload;
        },
        setShows(state: ResultStoreState, payload: ShowResponse[] | null) {
            state.shows = payload;
        },
        setGames(state: ResultStoreState, payload: GameResult[] | null) {
            state.games = payload;
        },
        setResultItem(state: ResultStoreState, payload: ResultItem) {
            state.resultItem = payload;
        },
    },
    actions: {
        reset({ commit }: ActionContext<ResultStoreState, {}>) {
            commit('setBooks', null);
            commit('setShows', null);
            commit('setGames', null);
        },
        getResult({ commit, state }: ActionContext<ResultStoreState, {}>, payload: ResultPayload) {
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
        currentUpdatingData(state: ResultStoreState) {
            return state.updatingData;
        },
        currentBooks(state: ResultStoreState) {
            return state.books;
        },
        currentShows(state: ResultStoreState) {
            return state.shows;
        },
        currentGames(state: ResultStoreState) {
            return state.games;
        },
        currentResultItem(state: ResultStoreState) {
            return state.resultItem;
        },
    },
};

export default ResultStore;
