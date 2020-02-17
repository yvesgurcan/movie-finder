import React from 'react';
import styled from 'styled-components';

export default ({ formId = 'form', properties, handleOnChange, values }) =>
    properties.map(({ key, name }) => (
        <LabelContainer key={key} htmlFor={`${formId}${key}`}>
            <Label>{name}:</Label>
            <InputContainer>
                <SearchField
                    id={`${formId}${key}`}
                    placeholder={`Search by ${name.toLowerCase()}`}
                    value={values[key]}
                    onChange={event => handleOnChange(event.target.value, key)}
                />
            </InputContainer>
        </LabelContainer>
    ));

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
