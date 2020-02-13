const fs = require('fs');
const readline = require('readline');

const MOVIES = 'movies';

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

module.exports = app => {
    app.get(`/${MOVIES}`, (req, res) => {
        console.log(`GET /${MOVIES}`);
        res.send(movies);
    });

    app.post(`/${MOVIES}`, (req, res) => {
        console.log(`POST /${MOVIES}`);
        res.status(201);
        res.send();
    });
};
