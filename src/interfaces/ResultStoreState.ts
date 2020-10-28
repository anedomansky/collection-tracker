import { ResultItem } from '../types/ResultItem';
import { BookResult } from './BookResult';
import { GameResult } from './GameResult';
import { ShowResponse } from './ShowResponse';

export interface ResultStoreState {
    updatingData: boolean;
    books: BookResult[] | null;
    shows: ShowResponse[] | null;
    games: GameResult[] | null;
    resultItem: ResultItem;
}
