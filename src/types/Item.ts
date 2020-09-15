import { IBookResult } from '../interfaces/IBookResult';
import { IShowResponse } from '../interfaces/IShowResponse';
import { IGameResult } from '../interfaces/IGameResult';

export type Item = IBookResult | IShowResponse | IGameResult | null;
