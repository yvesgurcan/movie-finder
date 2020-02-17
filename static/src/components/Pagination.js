import React from 'react';
import styled from 'styled-components';

export default ({ currentPage, pageCount, setCurrentPage }) => {
    return (
        <Container>
            <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                &lt; Previous
            </button>
            <div>
                Page {Number(currentPage) + 1} of {pageCount || 1}
            </div>
            <button
                disabled={currentPage === pageCount - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next &gt;
            </button>
        </Container>
    );
};

const Container = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
`;
