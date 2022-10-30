const path = require('path');
const fs = require('fs');

const readTxt = fs.createReadStream(path.join(__dirname, 'text.txt'));
readTxt.on('data', chunk => console.log(chunk.toString()))

