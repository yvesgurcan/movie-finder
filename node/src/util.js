const fs = require('fs');
const readline = require('readline');

const {
    REQUIRED_PROPERTIES,
    ID_PREFIX,
    ID_MAX_DIGITS,
    ZERO,
    OUTPUT_PATH,
    IS_ADULT,
    GENRES,
    START_YEAR,
    END_YEAR,
    RUNTIME_MINUTES
} = require('./constants');

const loadDataSet = function() {
    console.log(
        'Loading the data set. Please wait, this might take a while...'
    );
    const movies = [];
    const dataSet = fs.createReadStream(OUTPUT_PATH, 'utf8');

    let lineCount = 0;

    const rl = readline.createInterface(dataSet);

    rl.on('line', function(line) {
        const parsedLine = line.substring(0, line.length - 1);
        try {
            movies.push(JSON.parse(parsedLine));
        } catch (error) {
            console.error({ error });
        }
        lineCount++;

        if (lineCount % 250000 === 0) {
            console.log(`${parseBigNumber(lineCount)} items loaded...`);
        }
    });

    rl.on('close', function() {
        console.log(
            `Total: ${parseBigNumber(lineCount)} items were processed.`
        );
        console.log('Dataset loaded.');
        global.movies = movies;
        global.initialized = true;
    });
};

const escapeRegularExpression = string =>
    string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const isPartialMatch = (movie, rawSearchTerm = '', propertyName) => {
    const property = movie[propertyName];
    // TODO: It is not necessary to normalize startYear since it is essentially a number, not a string
    const normalizedProperty = String(property).toLowerCase();

    // TODO: Instead of returning a boolean, return an accuracy index that represents how likely this movie is the one that the user is looking for by splitting the search terms and counting occurrences
    const pattern = new RegExp(escapeRegularExpression(rawSearchTerm), 'i');

    return !rawSearchTerm || pattern.test(normalizedProperty);
};

const validateMovie = movie => {
    const errors = { messages: {}, count: 0 };
    REQUIRED_PROPERTIES.forEach(({ key, name, type }) => {
        const property = movie[key];
        if (!property) {
            errors.messages[key] = `${name} is required.`;
            errors.count = errors.count + 1;
        } else if (type === 'year') {
            if (
                property.length !== 4 ||
                Number.isNaN(parseInt(property)) ||
                parseInt(property) <= 0
            ) {
                errors.messages[key] = `${name} must be 4 positive digits.`;
                errors.count = errors.count + 1;
            }
        }
    });
    return errors;
};

// TODO: Use UUIDs to ensure that IDs are truly unique
const getNextAvailableId = ({ length: numberOfMovies }) => {
    const paddingZeroes = ZERO.repeat(
        ID_MAX_DIGITS - String(numberOfMovies).length
    );
    return `${ID_PREFIX}${paddingZeroes}${numberOfMovies}`;
};

const sortByStartYear = (movies, ascending) =>
    [...movies].sort(({ startYear: startYearA }, { startYear: startYearB }) =>
        ascending === 'true' ? startYearA - startYearB : startYearB - startYearA
    );

const parseBigNumber = number =>
    String(number)
        .split(/(?=(?:...)*$)/)
        .join(' ');

const parseProperty = (header, value) => {
    switch (header) {
        default: {
            return value === '\\N' ? null : value;
        }
        case IS_ADULT: {
            return !!(value === '1');
        }
        case GENRES: {
            return value === '["\\N"]' ? null : value.split(',');
        }
        case RUNTIME_MINUTES:
        // fall-through
        case START_YEAR:
        // fall-through
        case END_YEAR: {
            return value === '\\N' ? null : parseInt(value, 10);
        }
    }
};

module.exports = {
    loadDataSet,
    isPartialMatch,
    validateMovie,
    getNextAvailableId,
    sortByStartYear,
    parseBigNumber,
    parseProperty
};
