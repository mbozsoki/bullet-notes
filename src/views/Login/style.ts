import styled from 'styled-components';

export const StyledWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 32px;
`;

export const StyledBox = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 32px;
`;

export const StyledLine = styled.line`
    stroke: var(--secondary-color);
    stroke-width: 1;
`;
