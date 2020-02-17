const fs = require('fs');
const readline = require('readline');

const countLinesInFile = require('count-lines-in-file');

const { INPUT_PATH, OUTPUT_PATH } = require('../src/constants');
const { parseBigNumber, parseProperty } = require('../src/util');

const parseDataSet = function() {
    console.log(`Converting '${INPUT_PATH}' to '${OUTPUT_PATH}'.`);
    console.log('Please wait. This might take a minute...');

    const inputStream = fs.createReadStream(INPUT_PATH, 'utf8');
    const outputStream = fs.createWriteStream(OUTPUT_PATH, {
        encoding: 'utf8',
        flags: 'w'
    });

    countLinesInFile(INPUT_PATH, (error, lastLineNumber) => {
        const numberOfLines = lastLineNumber;
        console.log(`Found ${parseBigNumber(numberOfLines)} items.`);

        const rl = readline.createInterface(inputStream);

        let lineCount = 0;
        let headers = [];

        outputStream.write('[\n');

        rl.on('line', function(line) {
            const data = line.split('\t');

            if (lineCount === 0) {
                headers = [...data];
            } else {
                let parsedData = {};
                headers.forEach((header, index) => {
                    parsedData[header] = parseProperty(header, data[index]);
                });
                outputStream.write(
                    `${JSON.stringify(parsedData)}${
                        lineCount === numberOfLines ? '' : ','
                    }\n`
                );
            }

            ++lineCount;

            if (lineCount % 250000 === 0) {
                console.log(`${parseBigNumber(lineCount)} items processed...`);
            }
        });

        rl.on('close', function() {
            outputStream.write('\n]');
            console.log(
                `Total: ${parseBigNumber(lineCount)} items were processed.`
            );
            console.log('Done!');
        });
    });
};

parseDataSet();
