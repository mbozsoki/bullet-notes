import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Item } from '../models/item';
import { ItemState } from '../models/item-state';
import { ItemType } from '../models/item-type';
import { addItem, setItemState } from '../slices/itemsSlice';
import ListItem from './ListItem';

const StyledWrapper = styled.div`
    padding: 32px 16px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
`;

const mapStateToProps = (state: {
    items: Item[];
    tabItemFilter: ItemType;
    currentDate: string;
}) => ({
    activeTab: state.tabItemFilter,
    currentDate: state.currentDate,
});
const mapDispatch = { addItem, setItemState };

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

interface ListProps {
    items?: Item[];
    activeTab: ItemType;
    currentDate: string;
    setItemState: (payload: { id: number; state: ItemState }) => void;
    addItem: (label: string, type: ItemType, state: ItemState, date: string) => void;
}

function List({ items = [], activeTab, currentDate, setItemState, addItem }: ListProps) {
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
            <StyledIcon
                icon={faPlus}
                onClick={() => {
                    if (newItemName) {
                        addItem(newItemName, activeTab, ItemState.Idle, currentDate);
                        setNewItemName('');
                    }
                }}
            />
        </StyledWrapper>
    );
}

export default connect(mapStateToProps, mapDispatch)(List);
