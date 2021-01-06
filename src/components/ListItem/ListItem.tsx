import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRight,
    faCircle as faCircleSolid,
    faMinus,
    faTimes,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
import { StyledLabel } from '../common-styles';
import { StyledInput, StyledPrefixIcon, StyledWrapper } from './style';

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
    name: string;
    type: ItemType;
    state: ItemState;
    readOnly: boolean;
    onNameChange?: (newName: string) => void;
    onClick?: () => void;
};

export const ListItem = ({ name, type, state, readOnly, onNameChange, onClick }: ListItemProps) => {
    const [label, setLabel] = useState<string>(name);
    const [prefixIcon, setPrefixIcon] = useState<IconDefinition>(faCircleSolid);

    useEffect(() => {
        setLabel(name);
    }, [name]);

    useEffect(() => {
        const icon = getPrefixIcon(type, state);
        setPrefixIcon(icon);
    }, [type, state]);

    return (
        <StyledWrapper onClick={onClick}>
            <StyledPrefixIcon icon={prefixIcon} />
            {readOnly ? (
                <StyledLabel>{label}</StyledLabel>
            ) : (
                <StyledInput
                    value={label}
                    placeholder="Add new item..."
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setLabel(event.target.value)
                    }
                    onBlur={() => {
                        if (onNameChange) {
                            onNameChange(label);
                        }
                    }}
                />
            )}
        </StyledWrapper>
    );
};
