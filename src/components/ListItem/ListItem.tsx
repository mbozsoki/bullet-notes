import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRight,
    faCheck,
    faCircle as faCircleSolid,
    faMinus,
    faTimes,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useFirestore } from 'reactfire';
import { useLongPress } from '../../hooks/useLongPress';
import { Item } from '../../models/item';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
import { StyledLabel } from '../common-styles';
import {
    StyledActionIcon,
    StyledInput,
    StyledInputWrapper,
    StyledPrefixIcon,
    StyledWrapper
} from './style';

function getPrefixIcon(type: ItemType, state: ItemState): IconDefinition {
    switch (state) {
        case ItemState.Idle:
            return getPrefixIconByType(type);
        case ItemState.Done:
            return faTimes;
        case ItemState.Postponed:
            return faArrowRight;
        case ItemState.Closed:
            return faCircleSolid;
        default:
            throw new Error(`Invalid item state: ${state}`);
    }
}

function getPrefixIconByType(type: ItemType): IconDefinition {
    switch (type) {
        case ItemType.Event:
            return faCircleRegular;
        case ItemType.Task:
            return faCircleSolid;
        case ItemType.Note:
            return faMinus;
        default:
            throw new Error(`Invalid item type: ${type}`);
    }
}

type ListItemProps = {
    item: Item;
    onClick: () => void;
};

export const ListItem = ({ item, onClick }: ListItemProps) => {
    const [label, setLabel] = useState<string>(item.label);
    const [prefixIcon, setPrefixIcon] = useState<IconDefinition>(faCircleSolid);
    const collectionRef = useFirestore().collection('items');

    const onLongPress = () => {
        if (!item.readonly) {
            return;
        }

        const { NO_ID_FIELD, ...itemToSave } = item;
        collectionRef.doc(item.NO_ID_FIELD).set({ ...itemToSave, readonly: false });
    };

    const onItemClick = () => onClick();

    const longPressEvent = useLongPress(onLongPress, onItemClick);

    useEffect(() => {
        setLabel(item.label);
    }, [item]);

    useEffect(() => {
        const icon = getPrefixIcon(item.type, item.state);
        setPrefixIcon(icon);
    }, [item]);

    const saveItem = () => {
        const { NO_ID_FIELD, ...itemToSave } = item;
        collectionRef.doc(item.NO_ID_FIELD).set({ ...itemToSave, label, readonly: true });
    };

    return (
        <StyledWrapper className={!item.readonly ? '' : 'cursor-pointer'} {...longPressEvent}>
            <StyledPrefixIcon icon={prefixIcon} />
            {item.readonly ? (
                <StyledLabel>{label}</StyledLabel>
            ) : (
                <StyledInputWrapper>
                    <StyledInput
                        value={label}
                        placeholder="Add new item..."
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setLabel(event.target.value);
                        }}
                    />
                    <StyledActionIcon
                        icon={faTimes}
                        onClick={(event) => {
                            collectionRef.doc(item.NO_ID_FIELD).delete();
                        }}
                    />
                    <StyledActionIcon icon={faCheck} onClick={saveItem} />
                </StyledInputWrapper>
            )}
        </StyledWrapper>
    );
};
