import React, { useContext } from 'react';
import { useFirestore } from 'reactfire';
import AppContext from '../../AppContext';
import { Item } from '../../models/item';
import { ItemState } from '../../models/item-state';
import ListItem from '../ListItem';
import { StyledWrapper } from './style';

function getNextItemState(state: ItemState) {
    switch (state) {
        case ItemState.Idle:
            return ItemState.Postponed;
        case ItemState.Postponed:
            return ItemState.Done;
        case ItemState.Done:
        case ItemState.Closed:
            return ItemState.Closed;
    }
}

export const List = () => {
    const collectionRef = useFirestore().collection('items');
    const itemContext = useContext(AppContext);

    return (
        <StyledWrapper>
            {itemContext.items.map((item: Item) => (
                <ListItem
                    key={item.NO_ID_FIELD}
                    item={item}
                    onClick={() => {
                        if (!item.label || item.state === ItemState.Closed) {
                            return;
                        }

                        const nextState = getNextItemState(item.state);
                        const { NO_ID_FIELD, ...itemToSave } = item;
                        collectionRef
                            .doc(item.NO_ID_FIELD)
                            .set({ ...itemToSave, state: nextState });
                    }}
                />
            ))}
        </StyledWrapper>
    );
};
