import { MAX_MOVIES_PER_PAGE } from './constants';

export const objectToQueryString = object => {
    const properties = Object.keys(object);
    const serialized = properties
        .map(key => {
            const value = object[key];
            return `${key}=${value}`;
        })
        .join('&');
    return `?${serialized}`;
};

export const formatRuntimeDisplay = runTime => {
    switch (runTime) {
        default: {
            return `(${runTime} minutes)`;
        }
        case '0': {
            return `(less than 1 minute)`;
        }
        case '1': {
            return `(${runTime} minute)`;
        }
        case null: {
            return '';
        }
    }
};

export const getMoviesForPage = (page, movies) =>
    movies.slice(page * MAX_MOVIES_PER_PAGE, page * MAX_MOVIES_PER_PAGE + 99);

export const sortByStartYear = (movies, ascending) =>
    [...movies].sort(({ startYear: startYearA }, { startYear: startYearB }) =>
        ascending ? startYearA - startYearB : startYearB - startYearA
    );
