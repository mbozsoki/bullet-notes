import React from 'react';
import { useUser } from 'reactfire';
import Header from '../components/Header';
import VisibleList from '../components/VisibleList';
import { ItemType } from '../models/item-type';

function Home() {
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

    const { data: user } = useUser();
    console.log({ user });

    return (
        <div>
            <Header tabs={itemTypes} />
            <VisibleList />
        </div>
    );
}

export default Home;
