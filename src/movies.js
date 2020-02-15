const fs = require('fs');
const readline = require('readline');

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

global.movies = require('../data/title.basics.json');

const parseMovies = function() {
    const INPUT_PATH = './data/title.basics.tsv';
    const OUTPUT_PATH = './data/title.basics.json';

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

const isPartialMatch = (movie, searchTerm = '', propertyName) => {
    const property = movie[propertyName];
    // TODO: It is not necessary to normalize startYear since it is essentially a number, not a string
    const normalizedProperty = String(property).toLowerCase();
    const normalizedSearchTerm = String(searchTerm).toLowerCase();

    // const pattern = new RegExp();

    return !normalizedSearchTerm || normalizedProperty === normalizedSearchTerm;
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

module.exports = app => {
    app.get(`/${MOVIES}`, (req, res) => {
        const { query } = req;
        console.log(`GET /${MOVIES} ${JSON.stringify(query)}`);
        const { primaryTitle, originalTitle, startYear, sortOrder } = query;

        const matchedMovies = global.movies.filter(
            movie =>
                isPartialMatch(movie, primaryTitle, PRIMARY_TITLE) &&
                isPartialMatch(movie, originalTitle, ORIGINAL_TITLE) &&
                isPartialMatch(movie, startYear, START_YEAR)
        );

        res.send({ count: matchedMovies.length, movies: matchedMovies });
    });

    app.post(`/${MOVIES}`, (req, res) => {
        const { body } = req;
        console.log(`POST /${MOVIES} ${JSON.stringify(body)}`);
        const { primaryTitle, originalTitle, startYear } = body;

        const movie = {
            primaryTitle,
            originalTitle,
            startYear
        };

        const errors = validateMovie(movie);

        if (errors.count > 0) {
            res.status(400).json({ errors });
            return;
        }

        const ttconst = getNextAvailableId(global.movies);

        const newMovie = {
            ttconst,
            primaryTitle,
            originalTitle,
            startYear
        };

        global.movies.push(newMovie);
        res.status(201).send(newMovie);
    });
};
