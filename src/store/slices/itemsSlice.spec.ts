import { AnyAction } from '@reduxjs/toolkit';
import { ItemState } from '../../models/item-state';
import { ItemType } from '../../models/item-type';
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
                    date: '2020-01-02',
                },
            }),
        ).toEqual([
            {
                id: 0,
                label: 'Test item',
                type: ItemType.Task,
                state: ItemState.Idle,
                date: '2020-01-02',
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
                        date: '2020-01-02',
                    },
                ],
                {
                    type: addItem.type,
                    payload: {
                        label: 'Test item 2',
                        id: 1,
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 0,
                date: '2020-01-02',
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 1,
                date: '2020-01-02',
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
                        date: '2020-01-02',
                    },
                    {
                        label: 'Test item 2',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        id: 1,
                        date: '2020-01-02',
                    },
                ],
                {
                    type: addItem.type,
                    payload: {
                        label: 'Test item 3',
                        id: 2,
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 0,
                date: '2020-01-02',
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 1,
                date: '2020-01-02',
            },
            {
                label: 'Test item 3',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 2,
                date: '2020-01-02',
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
                        date: '2020-01-02',
                    },
                    {
                        label: 'Test item 2',
                        id: 1,
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
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
                date: '2020-01-02',
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                id: 1,
                date: '2020-01-02',
            },
        ]);
    });
});

describe('addItem', () => {
    it('should generate incrementing item IDs', () => {
        const action1 = addItem('Test item 1', ItemType.Task, ItemState.Idle, '2020-01-02');
        const action2 = addItem('Test item 2', ItemType.Task, ItemState.Idle, '2020-01-02');

        expect(action1.payload).toEqual({
            id: 0,
            label: 'Test item 1',
            type: ItemType.Task,
            state: ItemState.Idle,
            date: '2020-01-02',
        });
        expect(action2.payload).toEqual({
            id: 1,
            label: 'Test item 2',
            type: ItemType.Task,
            state: ItemState.Idle,
            date: '2020-01-02',
        });
    });
});
