const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: false }));

// avoid CORS issue
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// endpoints
require('./src/movies')(app);

app.listen(3000, 'localhost', () => console.log(`Server listening\n`));
