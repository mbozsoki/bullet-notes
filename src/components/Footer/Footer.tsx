import React, { useContext } from 'react';
import { useFirestore, useUser } from 'reactfire';
import AppContext from '../../AppContext';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
import { StyledGhostButton, StyledRow } from '../common-styles';

export const Footer = () => {
    const user = useUser();
    const collectionRef = useFirestore().collection('items');
    const itemContext = useContext(AppContext);

    const addNewItem = (type: ItemType) => {
        collectionRef.doc().set({
            label: '',
            type,
            state: ItemState.Idle,
            date: itemContext.currentDate,
            userUID: user.data.uid,
            readonly: false,
        });
    };

    return (
        <StyledRow>
            <StyledGhostButton onClick={() => addNewItem(ItemType.Note)}>Note</StyledGhostButton>
            <StyledGhostButton onClick={() => addNewItem(ItemType.Task)}>Task</StyledGhostButton>
            <StyledGhostButton onClick={() => addNewItem(ItemType.Event)}>Event</StyledGhostButton>
        </StyledRow>
    );
};
