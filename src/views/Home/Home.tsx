import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import AppContext from '../../AppContext';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { List } from '../../components/List/List';
import { Item } from '../../models/item';
import { StyledWrapper } from './style';

export const Home = () => {
    const { data: user } = useUser();
    const collectionRef = useFirestore().collection('items').where('userUID', '==', user.uid);
    const items = ((useFirestoreCollectionData(collectionRef).data as unknown) as Item[]) || [];
    const today = dayjs().format('YYYY-MM-DD');
    const [currentDate, setCurrentDate] = useState<string>(today);

    return (
        <AppContext.Provider
            value={{
                items: items.filter((item) => item.date === currentDate),
                currentDate,
                setCurrentDate,
            }}
        >
            <StyledWrapper>
                <Header />
                <List />
                <Footer />
            </StyledWrapper>
        </AppContext.Provider>
    );
};
