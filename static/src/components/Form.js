import React from 'react';
import styled from 'styled-components';

export default ({
    formId = 'form',
    properties,
    handleOnChange,
    values,
    errors,
    smallSizeOnly
}) =>
    properties.map(({ key, name }) => (
        <LabelContainer
            key={key}
            htmlFor={`${formId}${key}`}
            smallSizeOnly={smallSizeOnly}
        >
            <Label>{name}:</Label>
            <InputContainer>
                <SearchField
                    id={`${formId}${key}`}
                    placeholder={`Search by ${name.toLowerCase()}`}
                    value={values[key]}
                    onChange={event => handleOnChange(event.target.value, key)}
                />
            </InputContainer>
            {errors && <Error>{errors[key]}</Error>}
        </LabelContainer>
    ));

const LabelContainer = styled.label`
    padding: 3px;
    padding-right: 15px;
    display: ${props => (props.smallSizeOnly ? 'block' : 'flex')};

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

const SearchField = styled.input`
    width: 100%;
`;

const Error = styled.div`
    color: orange;
    max-width: 160px;
`;
