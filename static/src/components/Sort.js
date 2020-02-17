import React from 'react';
import styled from 'styled-components';

export default ({ ascending, toggleSortOrder }) => (
    <Container>
        <button onClick={toggleSortOrder}>{ascending ? '↑' : '↓'}</button>
    </Container>
);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-self: flex-end;
    margin-bottom: 4px;
    margin-top: 6px;
`;
