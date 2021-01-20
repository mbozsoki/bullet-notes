import React, { useEffect } from 'react';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import VisibleList from '../../components/VisibleList';
import { Item } from '../../models/item';
import { StyledWrapper } from './style';

type Props = {
    setItems: (items: Item[]) => void;
};

export const Home = ({ setItems }: Props) => {
    const { data: user } = useUser();
    const collectionRef = useFirestore().collection('items').where('userUID', '==', user.uid);
    const items = (useFirestoreCollectionData(collectionRef).data as unknown) as Item[];

    useEffect(() => {
        if (items) {
            setItems(items);
        }
    }, [items, setItems]);

    return (
        <StyledWrapper>
            <Header />
            <VisibleList />
            <Footer />
        </StyledWrapper>
    );
};
