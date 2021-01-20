import styled from 'styled-components';

export const StyledWrapper = styled.div`
    height: 100%;

    & > *:first-child {
        height: 64px;
    }
    & > *:nth-child(2) {
        height: calc(100% - 64px - 52px);
        overflow: auto;
    }
    & > *:last-child {
        height: 52px;
    }
`;
