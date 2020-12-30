import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ItemType } from '../models/item-type';
import { setTabItemFilter } from '../slices/filtersSlice';

const StyledWrapper = styled.div`
    display: flex;
`;

const StyledTab = styled.div`
    width: 100%;
    padding: 16px;
    text-align: center;
    cursor: pointer;

    transition: ease 0.3s all;

    &.active {
        color: white;
        background-color: #e1aa9d;
    }
`;

interface HeaderProps {
    tabs: Tab[];
    activeTab: ItemType;
    setTabItemFilter: (tab: ItemType) => void;
}

interface Tab {
    label: string;
    key: ItemType;
}

function Header({ tabs, activeTab, setTabItemFilter }: HeaderProps) {
    return (
        <StyledWrapper>
            {tabs.map((tab: Tab, index: number) => (
                <StyledTab
                    key={index}
                    className={tab.key === activeTab ? 'active' : ''}
                    onClick={() => setTabItemFilter(tab.key)}
                >
                    {tab.label}
                </StyledTab>
            ))}
        </StyledWrapper>
    );
}

const selectTabItemFilter = (state: { tabItemFilter: ItemType }) => state.tabItemFilter;
const mapStateToProps = (state: { tabItemFilter: ItemType }) => ({
    activeTab: selectTabItemFilter(state),
});
const mapDispatchToProps = { setTabItemFilter };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
