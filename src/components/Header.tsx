import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ItemType } from '../models/item-type';
import { setCurrentDate } from '../slices/currentDateSlice';
import { setTabItemFilter } from '../slices/filtersSlice';
import { Overlay } from './Overlay';
import { StyledRow } from './styledComponents';

const StyledTab = styled.div`
    width: 100%;
    padding: 16px;
    text-align: center;
    cursor: pointer;

    transition: ease 0.3s all;

    &.active {
        color: white;
        background-color: var(--primary-color);
    }
`;

const StyledIcon = styled(FontAwesomeIcon)`
    width: 48px;
    height: 48px;
    font-size: 48px;
    padding: 8px;
    cursor: pointer;
`;

const DatepickerTitle = styled.h3`
    font-size: 18px;
    cursor: pointer;
`;

const Datepicker = styled(DayPicker)`
    background-color: white;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
`;

interface HeaderProps {
    tabs: Tab[];
    activeTab: ItemType;
    currentDate: string;
    setTabItemFilter: (tab: ItemType) => void;
    setCurrentDate: (date: string) => void;
}

interface Tab {
    label: string;
    key: ItemType;
}

function Header({ tabs, activeTab, currentDate, setTabItemFilter, setCurrentDate }: HeaderProps) {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [dateHeaderHeight, setDateHeaderHeight] = useState(0);

    const selectDay = (date: Date) => {
        setCurrentDate(dayjs(date).format('YYYY-MM-DD'));
    };
    const previousDay = () => {
        setCurrentDate(dayjs(currentDate).subtract(1, 'day').format('YYYY-MM-DD'));
    };
    const nextDay = () => {
        setCurrentDate(dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD'));
    };

    setTimeout(() => {
        const element = document.querySelector('#date-header');
        const clientRect = element?.getBoundingClientRect();
        setDateHeaderHeight(clientRect?.height ?? 0);
    });

    return (
        <>
            <StyledRow id="date-header">
                <StyledIcon icon={faAngleLeft} onClick={previousDay} />
                <DatepickerTitle onClick={() => setDatePickerOpen(!datePickerOpen)}>
                    {(dayjs().isSame(currentDate, 'day') && 'Today') ||
                        (dayjs().add(1, 'day').isSame(currentDate, 'day') && 'Yesterday') ||
                        (dayjs().subtract(1, 'day').isSame(currentDate, 'day') && 'Tomorrow') ||
                        dayjs(currentDate).format('YYYY.MM.DD.')}
                </DatepickerTitle>
                <StyledIcon icon={faAngleRight} onClick={nextDay} />
            </StyledRow>
            {datePickerOpen && (
                <Overlay top={dateHeaderHeight}>
                    <Datepicker selectedDays={new Date(currentDate)} onDayClick={selectDay} />
                </Overlay>
            )}
            <StyledRow>
                {tabs.map((tab: Tab, index: number) => (
                    <StyledTab
                        key={index}
                        className={tab.key === activeTab ? 'active' : ''}
                        onClick={() => setTabItemFilter(tab.key)}
                    >
                        {tab.label}
                    </StyledTab>
                ))}
            </StyledRow>
        </>
    );
}

const mapStateToProps = (state: { tabItemFilter: ItemType; currentDate: string }) => ({
    activeTab: state.tabItemFilter,
    currentDate: state.currentDate,
});
const mapDispatchToProps = { setTabItemFilter, setCurrentDate };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
