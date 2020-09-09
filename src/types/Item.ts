import { IBookResult } from '../interfaces/IBookResult';
import { IShowResponse } from '../interfaces/IShowResponse';
import { IPeopleResponse } from '../interfaces/IPeopleResponse';
import { IGameResult } from '../interfaces/IGameResult';

export type Item = IBookResult | IShowResponse | IPeopleResponse | IGameResult | null;
