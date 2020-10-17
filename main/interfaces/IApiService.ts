import { IBookResponse } from './IBookResponse';
import { IGameResponse } from './IGameResponse';
import { IResultInfo } from './IResultInfo';
import { IShowResponse } from './IShowResponse';

export interface IApiService {
    getBooks(resultInfo: IResultInfo): Promise<IBookResponse>;
    getShows(resultInfo: IResultInfo): Promise<IShowResponse[]>;
    getGames(resultInfo: IResultInfo): Promise<IGameResponse>;
}
