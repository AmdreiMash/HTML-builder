const { readdir } = require('fs/promises');
const path = require('path');
const { stat } = require('fs');
module.exports = getFiles;


async function getFiles(folder, dir) {
  const filesArr = [];
  const files = await readdir(path.join(dir, folder), { withFileTypes: true, });
  files.forEach(async element => {
    if (!element.isDirectory()) {
      filesArr.push(element.name)
      stat(path.join(dir, folder, element.name), (err, stats) => {
        console.log(element.name.split(".").join(" - "), '-', stats.size + 'b');
      });
    };
  });
  return filesArr;
};


getFiles('secret-folder', __dirname);



