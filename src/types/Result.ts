import { IBookResult } from '../interfaces/IBookResult';
import { IShowResponse } from '../interfaces/IShowResponse';
import { IPeopleResponse } from '../interfaces/IPeopleResponse';
import { IGameResult } from '../interfaces/IGameResult';

export type Result = IBookResult | IShowResponse | IPeopleResponse | IGameResult | null;
