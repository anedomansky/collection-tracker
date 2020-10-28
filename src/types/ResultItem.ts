import { BookResult } from '../interfaces/BookResult';
import { ShowResponse } from '../interfaces/ShowResponse';
import { GameResult } from '../interfaces/GameResult';

export type ResultItem = BookResult | ShowResponse | GameResult | null;
