import React from 'react';
import styled from 'styled-components';
import { ORIGINAL_TITLE_OBJECT } from '../constants';
import { formatRuntimeDisplay } from '../util';

export default ({ movies }) => (
    <Container>
        {movies.map(({ tconst, primaryTitle, startYear, ...movie }) => (
            <MovieContainer key={tconst}>
                <MovieTitle>
                    <i>{primaryTitle}</i> ({startYear})
                </MovieTitle>
                {movie.originalTitle && (
                    <MovieProperty key={ORIGINAL_TITLE_OBJECT.key}>
                        {ORIGINAL_TITLE_OBJECT.name}:{' '}
                        <i>{movie.originalTitle}</i>
                    </MovieProperty>
                )}
                {movie.titleType && (
                    <MovieProperty key={'titleType'}>
                        Type:{' '}
                        <i>
                            {movie.titleType}{' '}
                            {formatRuntimeDisplay(movie.runtimeMinutes)}
                        </i>
                    </MovieProperty>
                )}
                {movie.genres && (
                    <MovieProperty key={'genres'}>
                        Genres: {movie.genres.join(', ')}
                    </MovieProperty>
                )}
            </MovieContainer>
        ))}
    </Container>
);

const Container = styled.ul`
    padding: 0;
    min-height: 100vh;
`;

const MovieContainer = styled.li`
    list-style-type: none;
    margin: 20px;
`;

const MovieTitle = styled.div`
    font-weight: bold;
`;

const MovieProperty = styled.div``;
