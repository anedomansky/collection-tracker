import { ResultItem } from '../types/ResultItem';
import { IBookResult } from './IBookResult';
import { IGameResult } from './IGameResult';
import { IShowResponse } from './IShowResponse';

export interface IResultStoreState {
    updatingData: boolean;
    books: IBookResult[] | null;
    shows: IShowResponse[] | null;
    games: IGameResult[] | null;
    resultItem: ResultItem;
}
