import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { ItemType } from '../../models/item-type';

const filtersSlice = createSlice({
    name: 'tabItemFilter',
    initialState: ItemType.Task,
    reducers: {
        setTabItemFilter(state: ItemType, action: AnyAction) {
            return action.payload;
        },
    },
});

export const { setTabItemFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
