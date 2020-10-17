import { IBookCollectionItem } from '../interfaces/IBookCollectionItem';
import { IGameCollectionItem } from '../interfaces/IGameCollectionItem';
import { IShowCollectionItem } from '../interfaces/IShowCollectionItem';

export type CollectionItem = IBookCollectionItem | IShowCollectionItem | IGameCollectionItem;
