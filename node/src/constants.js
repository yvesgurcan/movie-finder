const API_MAJOR_VERSION_PREFIX = 'v1';
const PORT = 3000;

const DATA_SOURCE = 'https://datasets.imdbws.com/title.basics.tsv.gz';
const ZIP_PATH = './data/title.basics.tsv.gz';
const INPUT_PATH = './data/title.basics.tsv';
const OUTPUT_PATH = './data/title.basics.json';

const MOVIES = 'movies';

const PRIMARY_TITLE = 'primaryTitle';
const ORIGINAL_TITLE = 'originalTitle';
const START_YEAR = 'startYear';
const END_YEAR = 'endYear';
const IS_ADULT = 'isAdult';
const GENRES = 'genres';
const RUNTIME_MINUTES = 'runtimeMinutes';

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

const ID_PREFIX = 'tt';
const ID_MAX_DIGITS = 7;
const ZERO = '0';

module.exports = {
    API_MAJOR_VERSION_PREFIX,
    PORT,
    DATA_SOURCE,
    ZIP_PATH,
    INPUT_PATH,
    OUTPUT_PATH,
    MOVIES,
    PRIMARY_TITLE,
    ORIGINAL_TITLE,
    START_YEAR,
    END_YEAR,
    IS_ADULT,
    GENRES,
    RUNTIME_MINUTES,
    REQUIRED_PROPERTIES,
    ID_PREFIX,
    ID_MAX_DIGITS,
    ZERO
};
