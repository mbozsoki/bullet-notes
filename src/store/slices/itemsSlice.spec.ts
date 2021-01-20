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
                    NO_ID_FIELD: '0',
                    label: 'Test item',
                    type: ItemType.Task,
                    state: ItemState.Idle,
                    date: '2020-01-02',
                },
            }),
        ).toEqual([
            {
                NO_ID_FIELD: '0',
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
                        NO_ID_FIELD: '0',
                        label: 'Test item 1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                ],
                {
                    type: addItem.type,
                    payload: {
                        label: 'Test item 2',
                        NO_ID_FIELD: '1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Idle,
                NO_ID_FIELD: '0',
                date: '2020-01-02',
                userUID: '12345678',
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                NO_ID_FIELD: '1',
                date: '2020-01-02',
                userUID: '12345678',
            },
        ]);

        expect(
            items(
                [
                    {
                        label: 'Test item 1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        NO_ID_FIELD: '0',
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                    {
                        label: 'Test item 2',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        NO_ID_FIELD: '1',
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                ],
                {
                    type: addItem.type,
                    payload: {
                        label: 'Test item 3',
                        NO_ID_FIELD: '2',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Idle,
                NO_ID_FIELD: 0,
                date: '2020-01-02',
                userUID: '12345678',
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                NO_ID_FIELD: 1,
                date: '2020-01-02',
                userUID: '12345678',
            },
            {
                label: 'Test item 3',
                type: ItemType.Task,
                state: ItemState.Idle,
                NO_ID_FIELD: 2,
                date: '2020-01-02',
                userUID: '12345678',
            },
        ]);
    });

    it('should handle SET_ITEM_STATE', () => {
        expect(
            items(
                [
                    {
                        NO_ID_FIELD: '0',
                        label: 'Test item 1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                    {
                        label: 'Test item 2',
                        NO_ID_FIELD: '1',
                        type: ItemType.Task,
                        state: ItemState.Idle,
                        date: '2020-01-02',
                        userUID: '12345678',
                    },
                ],
                {
                    type: setItemState.type,
                    payload: {
                        NO_ID_FIELD: '0',
                        state: ItemState.Done,
                    },
                },
            ),
        ).toEqual([
            {
                label: 'Test item 1',
                type: ItemType.Task,
                state: ItemState.Done,
                NO_ID_FIELD: '0',
                date: '2020-01-02',
                userUID: '12345678',
            },
            {
                label: 'Test item 2',
                type: ItemType.Task,
                state: ItemState.Idle,
                NO_ID_FIELD: '1',
                date: '2020-01-02',
                userUID: '12345678',
            },
        ]);
    });
});

describe('addItem', () => {
    it('should generate incrementing item IDs', () => {
        const action1 = addItem(
            'Test item 1',
            ItemType.Task,
            ItemState.Idle,
            '2020-01-02',
            '12345678',
        );
        const action2 = addItem(
            'Test item 2',
            ItemType.Task,
            ItemState.Idle,
            '2020-01-02',
            '12345678',
        );

        expect(action1.payload).toEqual({
            NO_ID_FIELD: '0',
            label: 'Test item 1',
            type: ItemType.Task,
            state: ItemState.Idle,
            date: '2020-01-02',
        });
        expect(action2.payload).toEqual({
            NO_ID_FIELD: '1',
            label: 'Test item 2',
            type: ItemType.Task,
            state: ItemState.Idle,
            date: '2020-01-02',
        });
    });
});
