import React from 'react';
import Header from './Header';
import VisibleList from './VisibleList';
import { ItemType } from '../models/item-type';

function App() {
    const itemTypes = [
        {
            label: 'Notes',
            key: ItemType.Note,
        },
        {
            label: 'Tasks',
            key: ItemType.Task,
        },
        {
            label: 'Events',
            key: ItemType.Event,
        },
    ];

    return (
        <div>
            <Header tabs={itemTypes} />
            <VisibleList />
        </div>
    );
}

export default App;
