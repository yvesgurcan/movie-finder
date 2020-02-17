import React, { useState } from 'react';
import styled from 'styled-components';
import { REQUIRED_PROPERTIES } from '../constants';

export default ({ searchParameters, handleOnChange }) => (
    <Container>
        <legend>Search Movies</legend>
        <SearchFieldContainer>
            <SearchFields>
                {REQUIRED_PROPERTIES.map(({ key, name, type }) => (
                    <LabelContainer key={key} htmlFor={key}>
                        <Label>{name}:</Label>
                        <InputContainer>
                            <SearchField
                                id={key}
                                placeholder={`Search by ${name.toLowerCase()}`}
                                value={searchParameters[key]}
                                onChange={event =>
                                    handleOnChange(event.target.value, key)
                                }
                            />
                        </InputContainer>
                    </LabelContainer>
                ))}
            </SearchFields>
        </SearchFieldContainer>
    </Container>
);

const Container = styled.fieldset`
    max-width: 700px;
`;

const SearchFieldContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const SearchFields = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 500px) {
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

    @media only screen and (max-width: 700px) {
        & {
            display: block;
        }
    }
`;

const Label = styled.span`
    margin-right: 5px;
`;

const InputContainer = styled.div`
    display: flex;
    align-self: center;
`;

const SearchField = styled.input``;
