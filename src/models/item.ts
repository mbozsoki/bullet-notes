import { ItemState } from './item-state';
import { ItemType } from './item-type';

export interface Item {
    NO_ID_FIELD: string;
    label: string;
    state: ItemState;
    type: ItemType;
    date: string;
    userUID: string;
    unsaved?: boolean;
}
