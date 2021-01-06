import React from 'react';
import { connect } from 'react-redux';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
import { addItem } from '../../store/slices/itemsSlice';
import { StyledRow } from '../common-styles';
import { StyledGhostButton } from '../common-styles';

type Props = {
    currentDate: string;
    addItem: (label: string, type: ItemType, state: ItemState, date: string) => void;
}

export const Footer = ({ currentDate, addItem }: Props) => {
    const addNewItem = (type: ItemType) => {
        addItem('', type, ItemState.Idle, currentDate);
    };

    return (
        <StyledRow>
            <StyledGhostButton onClick={() => addNewItem(ItemType.Note)}>+Note</StyledGhostButton>
            <StyledGhostButton onClick={() => addNewItem(ItemType.Task)}>+Task</StyledGhostButton>
            <StyledGhostButton onClick={() => addNewItem(ItemType.Event)}>+Event</StyledGhostButton>
        </StyledRow>
    );
};

const mapStateToProps = (state: { currentDate: string }) => ({
    currentDate: state.currentDate,
});
const mapDispatch = { addItem };

export default connect(mapStateToProps, mapDispatch)(Footer);
