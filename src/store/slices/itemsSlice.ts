import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';

let nextItemId = 0;

const itemsSlice = createSlice({
    name: 'items',
    initialState: [] as Item[],
    reducers: {
        addItem: {
            reducer(state: Item[], action: AnyAction) {
                const {
                    label,
                    type,
                    state: itemState,
                    date,
                    NO_ID_FIELD,
                    userUID,
                } = action.payload;
                state.push({
                    label,
                    type,
                    state: itemState,
                    date,
                    NO_ID_FIELD,
                    userUID,
                    unsaved: true,
                });
            },
            prepare(
                label: string,
                type: ItemType,
                state: ItemState,
                date: string,
                userUID: string,
            ) {
                return {
                    payload: {
                        NO_ID_FIELD: (++nextItemId).toString(),
                        label,
                        type,
                        state,
                        date,
                        userUID,
                    },
                };
            },
        },
        setItemState(state: Item[], action: AnyAction) {
            const item = state.find((item) => item.NO_ID_FIELD === action.payload.id);
            if (item) {
                item.state = action.payload.state;
            }
        },
        setItemLabel(state: Item[], action: AnyAction) {
            const item = state.find((item) => item.NO_ID_FIELD === action.payload.id);
            if (item) {
                item.label = action.payload.label;
            }
        },
        setItems(state: Item[], action: AnyAction) {
            if (action.payload?.length > 0) {
                nextItemId = parseInt(action.payload[action.payload.length - 1].NO_ID_FIELD, 10);
            }
            return action.payload;
        },
        removeItem(state: Item[], action: AnyAction) {
            const index = state.findIndex((item) => item.NO_ID_FIELD === action.payload);
            state.splice(index, 1);
        },
        setItemSaved(state: Item[], action: AnyAction) {
            const item = state.find((item) => item.NO_ID_FIELD === action.payload);
            if (item) {
                item.unsaved = false;
            }
        },
    },
});

export const {
    addItem,
    setItemState,
    setItemLabel,
    setItems,
    removeItem,
    setItemSaved,
} = itemsSlice.actions;

export default itemsSlice.reducer;
