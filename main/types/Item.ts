import { IBookResult } from '../interfaces/IBookResponse';
import { IGameResult } from '../interfaces/IGameResponse';
import { IShowResponse } from '../interfaces/IShowResponse';

export type Item = IBookResult | IShowResponse | IGameResult;
