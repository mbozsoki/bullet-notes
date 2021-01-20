import React from 'react';
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

type ListProps = {
    items?: Item[];
    setItemState: (payload: { id: string; state: ItemState }) => void;
};

export const List = ({ items = [], setItemState }: ListProps) => {
    return (
        <StyledWrapper>
            {items.map((item: Item) => (
                <ListItem
                    key={item.NO_ID_FIELD}
                    item={item}
                    onClick={() => {
                        if (item.unsaved || item.state === ItemState.Closed) {
                            return;
                        }

                        const nextState = getNextItemState(item.state);
                        setItemState({ id: item.NO_ID_FIELD, state: nextState });
                    }}
                />
            ))}
        </StyledWrapper>
    );
};
