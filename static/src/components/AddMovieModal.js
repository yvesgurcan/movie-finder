import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { REQUIRED_PROPERTIES } from '../constants';
import Form from './Form';
import {
    ENDPOINT,
    PRIMARY_TITLE,
    ORIGINAL_TITLE,
    START_YEAR
} from '../constants';

export default ({ setIsModalOpen, refetchMovies }) => {
    const [movie, setMovie] = useState({
        [PRIMARY_TITLE]: '',
        [ORIGINAL_TITLE]: '',
        [START_YEAR]: ''
    });

    const [addErrors, setAddErrors] = useState({ messages: {} });

    const handleOnChange = (value, key) => {
        const newMovie = {
            ...movie,
            [key]: value
        };
        setMovie(newMovie);
    };

    const addMovie = async function(parameters) {
        const response = await fetch(`${ENDPOINT}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(parameters)
        });
        const data = await response.json();
        console.log({ data });
        if (data.errors) {
            setAddErrors(data.errors.messages);
            return;
        }

        refetchMovies();
        setIsModalOpen(false);
    };
    return (
        <Container onClick={() => setIsModalOpen(false)}>
            <GlobalStyle />
            <Modal onClick={event => event.stopPropagation()}>
                <h2>Add Movie</h2>
                <FormContainer>
                    <div>
                        <Form
                            formId="modal"
                            properties={REQUIRED_PROPERTIES}
                            handleOnChange={handleOnChange}
                            values={movie}
                            errors={addErrors}
                            smallSizeOnly
                        />
                    </div>
                </FormContainer>
                <ButtonContainer>
                    <button onClick={() => addMovie(movie)}>Submit</button>
                    <button onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </button>
                </ButtonContainer>
            </Modal>
        </Container>
    );
};

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const Container = styled.div`
    position: absolute;
    background: rgb(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0%;
    overflow: hidden;
    display: flex;
`;

const Modal = styled.div`
    background: white;
    border-radius: 10px;
    padding: 40px;
    margin: auto;
    border: 1px solid rgb(80, 80, 80);
    min-width: 180px;
`;

const FormContainer = styled.div`
    min-height: 200px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-right: 15px;
`;
