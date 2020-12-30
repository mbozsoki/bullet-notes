import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { Item } from '../models/item';
import { ItemState } from '../models/item-state';
import { ItemType } from '../models/item-type';

let nextItemId = 0;

const itemsSlice = createSlice({
    name: 'items',
    initialState: [] as Item[],
    reducers: {
        addItem: {
            reducer(state: Item[], action: AnyAction) {
                const { id, label, type, state: itemState } = action.payload;
                state.push({ id, label, type, state: itemState });
            },
            prepare(label: string, type: ItemType, state: ItemState) {
                return { payload: { id: nextItemId++, label, type, state } };
            },
        },
        setItemState(state: Item[], action: AnyAction) {
            const item = state.find((item) => item.id === action.payload.id);
            if (item) {
                item.state = action.payload.state;
            }
        },
    },
});

export const { addItem, setItemState } = itemsSlice.actions;

export default itemsSlice.reducer;
