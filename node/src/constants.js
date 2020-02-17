const API_MAJOR_VERSION_PREFIX = 'v1';

const MOVIES = 'movies';
const PRIMARY_TITLE = 'primaryTitle';
const ORIGINAL_TITLE = 'originalTitle';
const START_YEAR = 'startYear';
const ID_PREFIX = 'tt';
const ID_MAX_DIGITS = 7;
const ZERO = '0';

const REQUIRED_PROPERTIES = [
    {
        key: PRIMARY_TITLE,
        name: 'Primary title'
    },
    {
        key: ORIGINAL_TITLE,
        name: 'Original title'
    },
    {
        key: START_YEAR,
        name: 'Start year',
        type: 'year'
    }
];

const INPUT_PATH = './data/title.basics.tsv';
const OUTPUT_PATH = './data/title.basics.json';

module.exports = {
    API_MAJOR_VERSION_PREFIX,
    MOVIES,
    PRIMARY_TITLE,
    ORIGINAL_TITLE,
    START_YEAR,
    ID_PREFIX,
    ID_MAX_DIGITS,
    ZERO,
    REQUIRED_PROPERTIES,
    INPUT_PATH,
    OUTPUT_PATH
};
