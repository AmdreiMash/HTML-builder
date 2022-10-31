const fs = require('fs')
const output = fs.createWriteStream('text.txt');

const { stdin, stdout } = process;
flag = process.argv[2]
stdout.write('Введите данные:\n');
stdin.on('data', data => {
  console.log(data.toString())
});