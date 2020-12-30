import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { Item } from '../models/item';
import { ItemType } from '../models/item-type';
import List from './List';

const selectItems = (state: { items: Item[]; tabItemFilter: ItemType }) => {
    return state.items;
};
const selectFilter = (state: { items: Item[]; tabItemFilter: ItemType }) => {
    return state.tabItemFilter;
};

const selectVisibleItems = createSelector(
    [selectItems, selectFilter],
    (items: Item[], filter: ItemType) => {
        return items.filter((item) => item.type === filter);
    },
);

const mapStateToProps = (state: { items: Item[]; tabItemFilter: ItemType }) => {
    const newItems = selectVisibleItems(state);
    return {
        items: newItems,
    };
};

export default connect(mapStateToProps, null)(List);
