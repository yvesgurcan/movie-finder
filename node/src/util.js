const fs = require('fs');
const readline = require('readline');
const {
    INPUT_PATH,
    OUTPUT_PATH,
    REQUIRED_PROPERTIES,
    ID_PREFIX,
    ID_MAX_DIGITS,
    ZERO
} = require('./constants');

const parseMovies = function() {
    const inputStream = fs.createReadStream(INPUT_PATH, 'utf8');
    const outputStream = fs.createWriteStream(OUTPUT_PATH, {
        encoding: 'utf8',
        flags: 'w'
    });
    const rl = readline.createInterface(inputStream);

    let lineCount = 0;
    let headers = [];

    rl.on('line', function(line) {
        const data = line.split('\t');

        if (lineCount === 0) {
            headers = [...data];
        } else {
            let parsedData = {};
            headers.forEach((header, index) => {
                const value = data[index] === '\\N' ? null : data[index];
                parsedData[header] = value;
            });
            outputStream.write(`${JSON.stringify(parsedData)},`);
        }
        ++lineCount;
        console.log({ lineCount });
        rl.close();
    });

    rl.on('end', function() {
        console.log({ movies });
    });

    rl.on('error', function() {
        console.log('Oops!');
    });
};

const isPartialMatch = (movie, rawSearchTerm = '', propertyName) => {
    const property = movie[propertyName];
    // TODO: It is not necessary to normalize startYear since it is essentially a number, not a string
    const normalizedProperty = String(property).toLowerCase();

    // TODO: Instead of returning a boolean, return an accuracy index that represents how likely this movie is the one that the user is looking for by splitting the search terms and counting occurrences
    const pattern = new RegExp(rawSearchTerm, 'i');

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

const sortByStartYear = movies =>
    movies.sort(
        ({ startYear: startYearA }, { startYear: startYearB }) =>
            startYearB - startYearA
    );

module.exports = {
    parseMovies,
    isPartialMatch,
    validateMovie,
    getNextAvailableId,
    sortByStartYear
};
