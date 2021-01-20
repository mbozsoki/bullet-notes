import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    & > *:first-child {
        margin-right: 8px;
    }

    &.cursor-pointer {
        cursor: pointer;
    }
    &.cursor-pointer * {
        cursor: pointer;
    }
`;

export const StyledPrefixIcon = styled(FontAwesomeIcon)`
    width: 12px !important;
    height: 12px;
    font-size: 12px;
    text-align: center;
`;

export const StyledLabel = styled.label`
    cursor: pointer;
`;

export const StyledInputWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    & > *:first-child {
        width: 100%;
        flex-grow: 1;
    }
`;

export const StyledInput = styled.input`
    text-transform: uppercase;
    outline: none;
    border: none;
    background-color: transparent;
`;

export const StyledActionIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    font-size: 1.4rem;
    margin: 0 0.5rem;
`;
