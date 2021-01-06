import { createSelector } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { Item } from '../../models/item';
import List from '../List';

const selectItems = (state: { items: Item[]; currentDate: string }) => {
    return state.items;
};
const selectFilter = (state: { items: Item[]; currentDate: string }) => {
    return state.currentDate;
};

const selectVisibleItems = createSelector(
    [selectItems, selectFilter],
    (items: Item[], filter: string) => {
        return items.filter((item) => item.date === filter);
    },
);

const mapStateToProps = (state: { items: Item[]; currentDate: string }) => {
    const newItems = selectVisibleItems(state);
    return {
        items: newItems,
    };
};

export default connect(mapStateToProps, null)(List);
