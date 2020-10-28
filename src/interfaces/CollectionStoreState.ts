import { CollectionItem } from '../types/CollectionItem';
import { BookCollectionItem } from './BookCollectionItem';
import { GameCollectionItem } from './GameCollectionItem';
import { ShowCollectionItem } from './ShowCollectionItem';

export interface CollectionStoreState {
    updatingData: boolean;
    books: BookCollectionItem[] | null;
    shows: ShowCollectionItem[] | null;
    games: GameCollectionItem[] | null;
    collectionItem: CollectionItem;
}
