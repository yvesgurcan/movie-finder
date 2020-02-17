const fs = require('fs');
const zlib = require('zlib');
const { ZIP_PATH, INPUT_PATH } = require('../src/constants');

const unzipDataSet = async function() {
    console.log(`Extracting '${ZIP_PATH}' to '${INPUT_PATH}'...`);

    const zip = fs.createReadStream(ZIP_PATH);
    const unzipped = fs.createWriteStream(INPUT_PATH);
    const gunzip = zlib.createGunzip();

    zip.pipe(gunzip).pipe(unzipped);

    zip.on('close', function() {
        console.log('Done!');
    });
};

unzipDataSet();
