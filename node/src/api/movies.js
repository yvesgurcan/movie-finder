const {
    loadDataSet,
    isPartialMatch,
    validateMovie,
    getNextAvailableId,
    sortByStartYear
} = require('../util');
const {
    API_MAJOR_VERSION_PREFIX,
    MOVIES,
    PRIMARY_TITLE,
    ORIGINAL_TITLE,
    START_YEAR
} = require('../constants');

global.movies = [];
global.initialized = false;

loadDataSet();

module.exports = app => {
    app.all(`/${API_MAJOR_VERSION_PREFIX}/${MOVIES}`, function(req, res, next) {
        if (!global.initialized) {
            console.log(`ANY /${MOVIES}`);
            res.status(503).send(
                'Server is not ready for requests yet. Please check back in a moment...'
            );
            return;
        }
        next();
    });

    app.get(`/${API_MAJOR_VERSION_PREFIX}/${MOVIES}`, (req, res) => {
        const { query } = req;
        console.log(`GET /${MOVIES} ${JSON.stringify(query)}`);

        const {
            primaryTitle = '',
            originalTitle = '',
            startYear = '',
            ascending = false
        } = query;

        const matchedMovies = global.movies.filter(
            movie =>
                isPartialMatch(movie, primaryTitle, PRIMARY_TITLE) &&
                isPartialMatch(movie, originalTitle, ORIGINAL_TITLE) &&
                isPartialMatch(movie, startYear, START_YEAR)
        );

        res.send({
            count: matchedMovies.length,
            movies: sortByStartYear(matchedMovies, ascending)
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
