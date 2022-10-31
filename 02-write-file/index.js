const fs = require('fs');
const EventEmitter = require('events');
const path = require('path');

const { stdin, stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const bye = () => {
  console.log('\nПрограмма выполнена!')
  process.exit()
}

stdout.write('Введите данные:\n');

stdin.on('data', data => {
  if (data.toString() !== 'exit\n') {
    output.write(data)
  } else {
    bye()
  }
})
process.on('SIGINT', bye)
