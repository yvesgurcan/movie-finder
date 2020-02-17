import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../components/Search';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import AddMovieModal from '../components/AddMovieModal';
import {
    ENDPOINT,
    PRIMARY_TITLE,
    ORIGINAL_TITLE,
    START_YEAR,
    MAX_MOVIES_PER_PAGE
} from '../constants';
import {
    objectToQueryString,
    getMoviesForPage,
    sortByStartYear
} from '../util';

export default () => {
    const [searchParameters, setSearchParameters] = useState({
        [PRIMARY_TITLE]: '',
        [ORIGINAL_TITLE]: '',
        [START_YEAR]: '',
        ascending: false
    });
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnChange = (value, key) => {
        const newSearchParameters = {
            ...searchParameters,
            [key]: value
        };
        setSearchParameters(newSearchParameters);
        fetchMovies(newSearchParameters);
    };

    const toggleSortOrder = () => {
        const newSearchParameters = {
            ...searchParameters,
            ascending: !searchParameters.ascending
        };
        setSearchParameters(newSearchParameters);

        const sortedMovies = sortByStartYear(
            movies,
            newSearchParameters.ascending
        );
        setMovies(sortedMovies);
    };

    const fetchMovies = async function(parameters) {
        const queryString = objectToQueryString(parameters);
        const response = await fetch(`${ENDPOINT}${queryString}`);
        const data = await response.json();
        setMovies(data.movies);

        setCurrentPage(0);
    };

    useEffect(() => {
        fetchMovies(searchParameters);
    }, []);

    const refetchMovies = () => {
        fetchMovies(searchParameters);
    };

    return (
        <Fragment>
            <Container>
                <div>
                    <Heading>
                        Movie<Accent>Finder</Accent>
                    </Heading>
                    <Search
                        movies={movies}
                        searchParameters={searchParameters}
                        handleOnChange={handleOnChange}
                        toggleSortOrder={toggleSortOrder}
                        setIsModalOpen={setIsModalOpen}
                    />
                    <Pagination
                        currentPage={currentPage}
                        pageCount={Math.ceil(
                            movies.length / MAX_MOVIES_PER_PAGE
                        )}
                        setCurrentPage={setCurrentPage}
                    />
                    <MovieList movies={getMoviesForPage(currentPage, movies)} />
                    <Pagination
                        currentPage={currentPage}
                        pageCount={Math.ceil(
                            movies.length / MAX_MOVIES_PER_PAGE
                        )}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </Container>
            {isModalOpen && (
                <AddMovieModal
                    setIsModalOpen={setIsModalOpen}
                    refetchMovies={refetchMovies}
                />
            )}
        </Fragment>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    & > div {
        max-width: 740px;
        width: 100%;
    }
`;

const Heading = styled.h1`
    border-bottom: 1px;
`;

const Accent = styled.span`
    color: gray;
`;
