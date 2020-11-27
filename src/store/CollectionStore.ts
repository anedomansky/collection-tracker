import { reactive } from 'vue';
import { BookCollectionItem } from '../interfaces/BookCollectionItem';
import { GameCollectionItem } from '../interfaces/GameCollectionItem';
import { ShowCollectionItem } from '../interfaces/ShowCollectionItem';
import { CollectionItem } from '../types/CollectionItem';

interface State {
    updatingData: boolean;
    errorOccurred: boolean;
    books: BookCollectionItem[] | null;
    shows: ShowCollectionItem[] | null;
    games: GameCollectionItem[] | null;
    collectionItem: CollectionItem;
}

const CollectionStore = {
    state: reactive({
        updatingData: false,
        errorOccurred: false,
        books: null,
        shows: null,
        games: null,
        collectionItem: null,
    } as State),
    setUpdatingData(payload: boolean) {
        this.state.updatingData = payload;
    },
    setErrorOccurred(payload: boolean) {
        this.state.errorOccurred = payload;
    },
    setBooks(payload: BookCollectionItem[] | null) {
        this.state.books = payload;
    },
    setShows(payload: ShowCollectionItem[] | null) {
        this.state.shows = payload;
    },
    setGames(payload: GameCollectionItem[] | null) {
        this.state.games = payload;
    },
    setCollectionItem(payload: CollectionItem) {
        this.state.collectionItem = payload;
    },
    reset() {
        this.state.books = null;
        this.state.shows = null;
        this.state.games = null;
    },
    findCollectionItem(category: string, title: string) {
        let result = null;
        if (category.toLowerCase() === 'books') {
            result = this.state.books?.find((book) => book.title === title) || null;
        }
        if (category.toLowerCase() === 'games') {
            result = this.state.games?.find((game) => game.name === title) || null;
        }
        if (category.toLowerCase() === 'shows') {
            result = this.state.shows?.find((show) => show.name === title) || null;
        }
        this.state.collectionItem = result;
    },
    removeCollectionItem(category: string, item: CollectionItem) {
        if (category.toLowerCase() === 'books') {
            const newBooks = this.state.books?.filter((book) => book.id !== item?.id) || null;
            this.state.books = newBooks;
        }
        if (category.toLowerCase() === 'games') {
            const newGames = this.state.games?.filter((game) => game.id !== item?.id) || null;
            this.state.games = newGames;
        }
        if (category.toLowerCase() === 'shows') {
            const newShows = this.state.shows?.filter((show) => show.id !== item?.id) || null;
            this.state.shows = newShows;
        }
    },
};

export default CollectionStore;
