import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Overlay from '../Overlay';
import { StyledRow } from '../common-styles';
import { StyledDatepicker, StyledDatepickerTitle, StyledIcon } from './style';

type HeaderProps = {
    currentDate: string;
    setCurrentDate: (date: string) => void;
};

export const Header = ({ currentDate, setCurrentDate }: HeaderProps) => {
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [dateHeaderHeight, setDateHeaderHeight] = useState(0);

    const selectDay = (date: Date) => {
        setCurrentDate(dayjs(date).format('YYYY-MM-DD'));
        setDatePickerOpen(false);
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
                <StyledDatepickerTitle onClick={() => setDatePickerOpen(!datePickerOpen)}>
                    {(dayjs().isSame(currentDate, 'day') && 'Today') ||
                        (dayjs().add(1, 'day').isSame(currentDate, 'day') && 'Yesterday') ||
                        (dayjs().subtract(1, 'day').isSame(currentDate, 'day') && 'Tomorrow') ||
                        dayjs(currentDate).format('YYYY.MM.DD.')}
                </StyledDatepickerTitle>
                <StyledIcon icon={faAngleRight} onClick={nextDay} />
            </StyledRow>
            {datePickerOpen && (
                <Overlay top={dateHeaderHeight} onRemove={() => setDatePickerOpen(false)}>
                    <StyledDatepicker selectedDays={new Date(currentDate)} onDayClick={selectDay} />
                </Overlay>
            )}
        </>
    );
};
