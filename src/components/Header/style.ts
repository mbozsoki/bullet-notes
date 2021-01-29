import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DayPicker from 'react-day-picker';
import styled from 'styled-components';

export const StyledIcon = styled(FontAwesomeIcon)`
    width: 32px !important;
    height: 32px;
    color: var(--primary-color);
    cursor: pointer;
    transition: ease 0.5s color;

    &:hover {
        color: var(--primary-color-active);
    }
`;

export const StyledDatepickerTitle = styled.h3`
    font-size: 1rem;
    color: var(--primary-color);
    cursor: pointer;
    user-select: none;
    transition: ease 0.5s color;

    &:hover {
        color: var(--primary-color-active);
    }
`;

export const StyledDatepicker = styled(DayPicker)`
    background-color: white;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
`;
