import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const PrimaryButton = styled.button`
    padding: 16px 32px;
    border: none;
    color: white;
    background-color: var(--primary-color);
    font-size: 1rem;
    border-radius: 3px;
    font-family: 'Open Sans';
    cursor: pointer;

    transition: ease 0.5s background;

    &.full-width {
        width: 100%;
    }

    &:hover {
        background-color: var(--primary-color-active);
    }

    &:focus {
        outline: none;
    }
`;

export const SecondaryButton = styled.button`
    padding: ${(props: { small?: boolean }) => {
        if (props.small) {
            return '12px 24px';
        } else {
            return '16px 32px';
        }
    }};
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    background-color: transparent;
    font-family: 'Open Sans';
    font-size: ${(props: { small?: boolean }) => {
        if (props.small) {
            return '0.8rem';
        } else {
            return '1rem';
        }
    }};
    border-radius: 3px;
    cursor: pointer;

    transition: ease 0.5s all;

    &.full-width {
        width: 100%;
    }

    &:hover {
        background-color: var(--primary-color-active);
        border: 2px solid var(--primary-color-active);
        color: white;
    }

    &:focus {
        outline: none;
    }
`;

export const StyledGhostButton = styled.button`
    width: 100%;
    background-color: transparent;
    color: var(--primary-color);
    font-size: 1rem;
    font-family: 'Shadows Into Light';
    padding: 16px 12px;
    border: none;
    cursor: pointer;

    transition: ease 0.5s color;

    &:hover {
        color: var(--primary-color-active);
    }

    &:focus {
        outline: none;
    }
`;

export const Logo = styled.h1`
    color: var(--primary-color);
    font-size: 54px;
    font-family: 'Shadows Into Light';
    margin-top: 32px;
    margin-bottom: 16px;
`;

export const StyledRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > *:not(:last-child) {
        width: 100%;
        margin-bottom: 24px;
    }
`;

export const StyledLabel = styled.label`
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
    color: var(--primary-color);
`;

export const StyledParagraph = styled.p`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 12px;
    font-size: 0.8rem;

    &.not-important {
        color: var(--secondary-color);
    }
`;

export const StyledPasswordIcon = styled(FontAwesomeIcon)`
    box-sizing: content-box;
    width: 16px !important;
    height: 16px;
    font-size: 0.8rem;
    padding: 16px;
    text-align: center;
    color: var(--secondary-color);
    cursor: pointer;
`;

export const StyledPasswordInput = styled.div`
    position: relative;
    width: 100%;

    & > input {
        padding-right: 32px;
    }

    & > .icon {
        position: absolute;
        right: 0;
        top: 0;
    }
`;

export const StyledInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    outline: none;
    background-color: transparent;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid var(--secondary-color);
    padding: 13px 4px;
    font-size: 1rem;
    font-family: 'Shadows Into Light';
`;
