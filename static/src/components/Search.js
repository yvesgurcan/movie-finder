import React from 'react';
import styled from 'styled-components';
import { REQUIRED_PROPERTIES } from '../constants';
import Sort from './Sort';
import Form from './Form';
import AddMovieButton from '../components/AddMovieButton';

export default ({
    movies,
    searchParameters,
    handleOnChange,
    toggleSortOrder,
    setIsModalOpen
}) => (
    <Container>
        <legend>Search Movies</legend>
        <SearchFieldContainer>
            <SearchFields>
                <Form
                    properties={REQUIRED_PROPERTIES}
                    handleOnChange={handleOnChange}
                    values={searchParameters}
                />
                <Sort
                    ascending={searchParameters.ascending}
                    toggleSortOrder={toggleSortOrder}
                />
            </SearchFields>
        </SearchFieldContainer>
        <ListInfo>
            <MovieCount>{movies.length} movies found.</MovieCount>
            <AddMovieButton setIsModalOpen={setIsModalOpen} />
        </ListInfo>
    </Container>
);

const Container = styled.fieldset``;

const SearchFieldContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const SearchFields = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 570px) {
        & {
            display: block;
            width: 100%;
            input {
                width: 100%;
            }
        }
    }
`;

const LabelContainer = styled.label`
    padding: 3px;
    padding-right: 15px;
    display: flex;

    @media only screen and (max-width: 780px) {
        & {
            display: block;
        }
    }
`;

const Label = styled.span`
    margin-right: 5px;
    display: flex;
    align-self: center;
`;

const InputContainer = styled.div`
    display: flex;
    align-self: center;
`;

const SearchField = styled.input``;

const MovieCount = styled.span`
    color: grey;
`;

const ListInfo = styled.div`
    text-align: center;
`;
