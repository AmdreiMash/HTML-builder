const { readdir } = require('fs/promises');
const path = require('path'); // <fs.Dirent>
const { stat } = require('fs')


async function getFiles() {
  const files = await readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true, })
  files.forEach(async element => {
    if (!element.isDirectory()) {
      stat(path.join(__dirname, 'secret-folder', element.name), (err, stats) => {
        console.log(element.name.split(".").join(" - "),'-',stats.size+'b');
        return stats.size;
      });
    }
  });
}


getFiles()