import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const StyledWrapper = styled.p`
    display: flex;
    align-items: center;
    & > *:first-child {
        margin-right: 8px;
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

export const StyledInput = styled.input`
    text-transform: uppercase;
    outline: none;
    border: none;
    background-color: transparent;
`;
