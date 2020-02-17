import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Search from '../components/Search';

export default () => {
    const [searchParameters, setSearchParameters] = useState('click me');

    const handleOnChange = (value, key) => {
        const newSearchParameters = {
            ...searchParameters,
            [value]: key
        };
        setSearchParameters(newSearchParameters);
    };

    return (
        <Fragment>
            <Heading>
                Movie<Accent>Finder</Accent>
            </Heading>
            <Search
                searchParameters={searchParameters}
                handleOnChange={handleOnChange}
            />
        </Fragment>
    );
};

const Heading = styled.h1`
    border-bottom: 1px;
`;

const Accent = styled.span`
    color: gray;
`;
