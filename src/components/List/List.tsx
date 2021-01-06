import React, { useState } from 'react';
import { Item } from '../../models/item';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
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
    activeTab: ItemType;
    setItemState: (payload: { id: number; state: ItemState }) => void;
}

export const List = ({ items = [], activeTab, setItemState }: ListProps) => {
    const [newItemName, setNewItemName] = useState<string>('');

    return (
        <StyledWrapper>
            {items.map((item: Item) => (
                <ListItem
                    key={item.id}
                    name={item.label}
                    type={item.type}
                    state={item.state}
                    readOnly={true}
                    onClick={() => {
                        if (item.state !== ItemState.Closed) {
                            const nextState = getNextItemState(item.state);
                            setItemState({ id: item.id, state: nextState });
                        }
                    }}
                />
            ))}
            <ListItem
                name={newItemName}
                type={activeTab}
                state={ItemState.Idle}
                readOnly={false}
                onNameChange={(newName: string) => setNewItemName(newName)}
            />
        </StyledWrapper>
    );
};
