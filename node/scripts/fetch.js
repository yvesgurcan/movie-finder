const fs = require('fs');
const fetch = require('node-fetch');
const { DATA_SOURCE, ZIP_PATH } = require('../src/constants');

const fetchDataSet = async function() {
    console.log(`Fetching '${DATA_SOURCE}'...`);

    const response = await fetch(DATA_SOURCE);
    const zip = fs.createWriteStream(ZIP_PATH);
    response.body.pipe(zip);

    zip.on('finish', function() {
        console.log('Done!');
    });
};

fetchDataSet();
