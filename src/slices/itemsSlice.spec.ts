import { AnyAction } from '@reduxjs/toolkit';
import { ItemState } from '../models/item-state';
import { ItemType } from '../models/item-type';
import items, { addItem, setItemState } from './itemsSlice';

describe('items reducer', () => {
    it('should handle initial state', () => {
        expect(items(undefined, {} as AnyAction)).toEqual([]);
    });

    it('should handle ADD_ITEM', () => {
        expect(
            items([], {
                type: addItem.type,
                payload: {
                    id: 0,
                    label: 'Test item',
                    type: ItemType.Task,
                    state: ItemState.Idle,
                },
            }),
        ).toEqual([
            {
                id: 0,
                label: 'Test item',
                type: ItemType.Task,
                state: ItemState.Idle,
            },
        ]);

        expect(
            items(
                [
                    {
                        id: 0,
                        label: 'Test item 1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                    },
                ],
                {
                    type: addItem.type,
                    payload: {
                        label: 'Test item 2',
                        id: 1,
                        type: ItemType.Task,
                        state: ItemState.Idle,
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 0,
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 1,
            },
        ]);

        expect(
            items(
                [
                    {
                        label: 'Test item 1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        id: 0,
                    },
                    {
                        label: 'Test item 2',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        id: 1,
                    },
                ],
                {
                    type: addItem.type,
                    payload: {
                        label: 'Test item 3',
                        id: 2,
                        type: ItemType.Task,
                        state: ItemState.Idle,
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 0,
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 1,
            },
            {
                label: 'Test item 3',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 2,
            },
        ]);
    });

    it('should handle SET_ITEM_STATE', () => {
        expect(
            items(
                [
                    {
                        id: 0,
                        label: 'Test item 1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                    },
                    {
                        label: 'Test item 2',
                        id: 1,
                        type: ItemType.Task,
                        state: ItemState.Idle,
                    },
                ],
                {
                    type: setItemState.type,
                    payload: {
                        id: 0,
                        state: ItemState.Done,
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Done,
                id: 0,
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 1,
            },
        ]);
    });
});

describe('addItem', () => {
    it('should generate incrementing item IDs', () => {
        const action1 = addItem('Test item 1', ItemType.Task, ItemState.Idle);
        const action2 = addItem('Test item 2', ItemType.Task, ItemState.Idle);

        expect(action1.payload).toEqual({
            id: 0,
            label: 'Test item 1',
            type: ItemType.Task,
            state: ItemState.Idle,
        });
        expect(action2.payload).toEqual({
            id: 1,
            label: 'Test item 2',
            type: ItemType.Task,
            state: ItemState.Idle,
        });
    });
});
