const path = require('path');
const fs = require('fs');

const readTxt = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readTxt.on('data', chunk => console.log(chunk))

