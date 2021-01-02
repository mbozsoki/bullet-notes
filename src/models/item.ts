import { ItemState } from './item-state';
import { ItemType } from './item-type';

export interface Item {
    id: number;
    label: string;
    state: ItemState;
    type: ItemType;
    date: string;
}
