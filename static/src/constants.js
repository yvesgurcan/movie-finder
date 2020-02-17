export const PRIMARY_TITLE = 'primaryTitle';
export const ORIGINAL_TITLE = 'originalTitle';
export const START_YEAR = 'startYear';
export const TITLE_TYPE = 'titleType';

export const PRIMARY_TITLE_OBJECT = {
    key: PRIMARY_TITLE,
    name: 'Title'
};

export const ORIGINAL_TITLE_OBJECT = {
    key: ORIGINAL_TITLE,
    name: 'Original title'
};

export const START_YEAR_OBJECT = {
    key: START_YEAR,
    name: 'Start year',
    type: 'year'
};

export const REQUIRED_PROPERTIES = [
    PRIMARY_TITLE_OBJECT,
    ORIGINAL_TITLE_OBJECT,
    START_YEAR_OBJECT
];

export const ENDPOINT = '/api/movies';

export const MAX_MOVIES_PER_PAGE = 100;
