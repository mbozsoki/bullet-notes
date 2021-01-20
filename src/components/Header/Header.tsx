import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import AppContext from '../../AppContext';
import { StyledRow } from '../common-styles';
import Overlay from '../Overlay';
import { StyledDatepicker, StyledDatepickerTitle, StyledIcon } from './style';

export const Header = () => {
    const itemContext = useContext(AppContext);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [dateHeaderHeight, setDateHeaderHeight] = useState(0);

    const selectDay = (date: Date) => {
        itemContext.setCurrentDate(dayjs(date).format('YYYY-MM-DD'));
        setDatePickerOpen(false);
    };
    const previousDay = () => {
        itemContext.setCurrentDate(
            dayjs(itemContext.currentDate).subtract(1, 'day').format('YYYY-MM-DD'),
        );
    };
    const nextDay = () => {
        itemContext.setCurrentDate(
            dayjs(itemContext.currentDate).add(1, 'day').format('YYYY-MM-DD'),
        );
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
                    {(dayjs().isSame(itemContext.currentDate, 'day') && 'Today') ||
                        (dayjs().subtract(1, 'day').isSame(itemContext.currentDate, 'day') &&
                            'Yesterday') ||
                        (dayjs().add(1, 'day').isSame(itemContext.currentDate, 'day') &&
                            'Tomorrow') ||
                        dayjs(itemContext.currentDate).format('YYYY.MM.DD.')}
                </StyledDatepickerTitle>
                <StyledIcon icon={faAngleRight} onClick={nextDay} />
            </StyledRow>
            {datePickerOpen && (
                <Overlay top={dateHeaderHeight} onRemove={() => setDatePickerOpen(false)}>
                    <StyledDatepicker
                        selectedDays={new Date(itemContext.currentDate)}
                        onDayClick={selectDay}
                    />
                </Overlay>
            )}
        </>
    );
};
