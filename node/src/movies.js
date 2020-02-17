const {
    isPartialMatch,
    validateMovie,
    getNextAvailableId,
    sortByStartYear
} = require('./util');
const {
    API_MAJOR_VERSION_PREFIX,
    MOVIES,
    PRIMARY_TITLE,
    ORIGINAL_TITLE,
    START_YEAR
} = require('./constants');

global.movies = require('../data/title.basics.json');

module.exports = app => {
    app.get(`/${API_MAJOR_VERSION_PREFIX}/${MOVIES}`, (req, res) => {
        const { query } = req;
        console.log(`GET /${MOVIES} ${JSON.stringify(query)}`);

        const { primaryTitle, originalTitle, startYear } = query;

        const matchedMovies = global.movies.filter(
            movie =>
                isPartialMatch(movie, primaryTitle, PRIMARY_TITLE) &&
                isPartialMatch(movie, originalTitle, ORIGINAL_TITLE) &&
                isPartialMatch(movie, startYear, START_YEAR)
        );

        res.send({
            count: matchedMovies.length,
            movies: sortByStartYear(matchedMovies)
        });
    });

    app.post(`/${API_MAJOR_VERSION_PREFIX}/${MOVIES}`, (req, res) => {
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
            startYear,
            endYear: null,
            runtimeMinutes: null,
            genres: null,
            titleType: null
        };

        global.movies.push(newMovie);
        res.status(201).send(newMovie);
    });
};
