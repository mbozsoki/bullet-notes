import React from 'react';
import { useUser } from 'reactfire';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import VisibleList from '../../components/VisibleList';
import { StyledWrapper } from './style';

export const Home = () => {
    const { data: user } = useUser();
    console.log({ user });

    return (
        <StyledWrapper>
            <Header />
            <VisibleList />
            <Footer />
        </StyledWrapper>
    );
};
