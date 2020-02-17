import React from 'react';
import styled from 'styled-components';

export default ({ setIsModalOpen }) => (
    <Container>
        <button onClick={() => setIsModalOpen(true)}>Add Movie</button>
    </Container>
);

const Container = styled.span`
    button {
        margin: 10px;
    }
`;
