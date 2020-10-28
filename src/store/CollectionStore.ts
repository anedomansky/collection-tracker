import { ActionContext } from 'vuex';
import { BookCollectionItem } from '../interfaces/BookCollectionItem';
import { CollectionStoreState } from '../interfaces/CollectionStoreState';
import { GameCollectionItem } from '../interfaces/GameCollectionItem';
import { ShowCollectionItem } from '../interfaces/ShowCollectionItem';
import { CollectionItem } from '../types/CollectionItem';

interface GetCollectionItemPayload {
    category: string;
    title: string;
}

interface RemoveCollectionItemPayload {
    category: string;
    item: CollectionItem;
}

const CollectionStore = {
    state: () => ({
        updatingData: false,
        books: null,
        shows: null,
        games: null,
        collectionItem: null,
    } as CollectionStoreState),
    mutations: {
        setUpdatingData(state: CollectionStoreState, payload: boolean) {
            state.updatingData = payload;
        },
        setBooks(state: CollectionStoreState, payload: BookCollectionItem[] | null) {
            state.books = payload;
        },
        setShows(state: CollectionStoreState, payload: ShowCollectionItem[] | null) {
            state.shows = payload;
        },
        setGames(state: CollectionStoreState, payload: GameCollectionItem[] | null) {
            state.games = payload;
        },
        setCollectionItem(state: CollectionStoreState, payload: CollectionItem) {
            state.collectionItem = payload;
        },
    },
    actions: {
        reset({ commit }: ActionContext<CollectionStoreState, {}>) {
            commit('setBooks', null);
            commit('setShows', null);
            commit('setGames', null);
        },
        getCollectionItem({ commit, state }: ActionContext<CollectionStoreState, {}>, payload: GetCollectionItemPayload) {
            const { category, title } = payload;
            let result;
            if (category.toLowerCase() === 'books') {
                result = state.books?.find((book) => book.title === title);
            }
            if (category.toLowerCase() === 'games') {
                result = state.games?.find((game) => game.name === title);
            }
            if (category.toLowerCase() === 'shows') {
                result = state.shows?.find((show) => show.name === title);
            }
            commit('setCollectionItem', result);
        },
        removeCollectionItem({ commit, state }: ActionContext<CollectionStoreState, {}>, payload: RemoveCollectionItemPayload) {
            const { category, item } = payload;
            if (category.toLowerCase() === 'books') {
                const newBooks = state.books?.filter((book) => book.id !== item?.id);
                if (newBooks) {
                    commit('setBooks', newBooks);
                }
            }
            if (category.toLowerCase() === 'games') {
                const newGames = state.games?.filter((game) => game.id !== item?.id);
                if (newGames) {
                    commit('setGames', newGames);
                }
            }
            if (category.toLowerCase() === 'shows') {
                const newShows = state.shows?.filter((show) => show.id !== item?.id);
                if (newShows) {
                    commit('setShows', newShows);
                }
            }
        },
    },
    getters: {
        currentUpdatingData(state: CollectionStoreState) {
            return state.updatingData;
        },
        currentBooks(state: CollectionStoreState) {
            return state.books;
        },
        currentShows(state: CollectionStoreState) {
            return state.shows;
        },
        currentGames(state: CollectionStoreState) {
            return state.games;
        },
        currentCollectionItem(state: CollectionStoreState) {
            return state.collectionItem;
        },
    },
};

export default CollectionStore;
