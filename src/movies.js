const fs = require('fs');
const readline = require('readline');

const MOVIES = 'movies';
const PRIMARY_TITLE = 'primaryTitle';
const ORIGINAL_TITLE = 'originalTitle';
const START_YEAR = 'startYear';

const movies = require('../data/title.basics.json');

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

const isPartialMatch = (movie, searchTerm, property) => {
    // const pattern = new RegExp();
    return !searchTerm || movie[property] === searchTerm;
};

module.exports = app => {
    app.get(`/${MOVIES}`, (req, res) => {
        const { query } = req;
        console.log(`GET /${MOVIES} ${JSON.stringify(query)}`);
        const { primaryTitle, originalTitle, startYear, sortOrder } = query;

        const matchedMovies = movies.filter(
            movie =>
                isPartialMatch(movie, primaryTitle, PRIMARY_TITLE) &&
                isPartialMatch(movie, originalTitle, ORIGINAL_TITLE) &&
                isPartialMatch(movie, startYear, START_YEAR)
        );

        res.send({ count: matchedMovies.length, movies: matchedMovies });
    });

    app.post(`/${MOVIES}`, (req, res) => {
        console.log(`POST /${MOVIES}`);
        res.status(201);
        res.send();
    });
};
