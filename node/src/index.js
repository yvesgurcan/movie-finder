const express = require('express');
const { PORT } = require('./constants');

const app = express();
app.use(express.json());

// avoid CORS issue
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// endpoints
require('./api/movies')(app);

app.listen(PORT);
