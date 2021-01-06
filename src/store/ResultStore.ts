import { reactive } from 'vue';
import Categories from '../enums/Categories';
import { BookResult } from '../interfaces/BookResult';
import { GameResult } from '../interfaces/GameResult';
import { ShowResponse } from '../interfaces/ShowResponse';
import { ResultItem } from '../types/ResultItem';

interface State {
    updatingData: boolean;
    errorOccurred: boolean;
    books: BookResult[] | null;
    shows: ShowResponse[] | null;
    games: GameResult[] | null;
    resultItem: ResultItem;
}

const ResultStore = {
    state: reactive({
        updatingData: false,
        errorOccurred: false,
        books: null,
        shows: null,
        games: null,
        resultItem: null,
    } as State),
    setUpdatingData(payload: boolean) {
        this.state.updatingData = payload;
    },
    setErrorOccurred(payload: boolean) {
        this.state.errorOccurred = payload;
    },
    setBooks(payload: BookResult[] | null) {
        this.state.books = payload;
    },
    setShows(payload: ShowResponse[] | null) {
        this.state.shows = payload;
    },
    setGames(payload: GameResult[] | null) {
        this.state.games = payload;
    },
    reset() {
        this.state.books = null;
        this.state.shows = null;
        this.state.games = null;
    },
    findResult(category: string, title: string) {
        let result = null;
        if (category === Categories.BOOKS) {
            result = this.state.books?.find((book) => book.title === title) || null;
        }
        if (category === Categories.GAMES) {
            result = this.state.games?.find((game) => game.name === title) || null;
        }
        if (category === Categories.SHOWS) {
            result = this.state.shows?.find((show) => show.show.name === title) || null;
        }
        this.state.resultItem = result;
    },
};

export default ResultStore;
