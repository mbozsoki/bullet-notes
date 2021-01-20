import React from 'react';
import { connect } from 'react-redux';
import { useUser } from 'reactfire';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
import { addItem } from '../../store/slices/itemsSlice';
import { StyledGhostButton, StyledRow } from '../common-styles';

type Props = {
    currentDate: string;
    addItem: (
        label: string,
        type: ItemType,
        state: ItemState,
        date: string,
        userUID: string,
    ) => void;
};

export const Footer = ({ currentDate, addItem }: Props) => {
    const user = useUser();

    const addNewItem = (type: ItemType) => {
        addItem('', type, ItemState.Idle, currentDate, user.data.uid);
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
