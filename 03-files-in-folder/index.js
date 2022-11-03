const { readdir } = require('fs/promises');
const path = require('path');
const { stat } = require('fs');


const getFiles = async function (folder, dir, conLog = false) {
  const filesArr = [];
  const files = await readdir(path.join(dir, folder), { withFileTypes: true, });
  files.forEach(async element => {
    if (!element.isDirectory()) {
      filesArr.push(element.name)
      if (conLog === true) {
        stat(path.join(dir, folder, element.name), (err, stats) => {
          console.log(element.name.split(".").join(" - "), '-', stats.size + 'b');
        });
      } else {
        filesArr.push(element.name)
      }
    };
  });
  return filesArr;
};

(() => getFiles('secret-folder', __dirname, true))()
module.exports = getFiles;