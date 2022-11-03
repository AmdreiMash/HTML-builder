const fsProm = require('fs/promises')
const path = require('path')
const getFiles = require('../03-files-in-folder/index')

async function copyDir() {
  try {
    const createDir = await fsProm.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    console.log(`created ${(createDir || 'done')}`);
    const files = await getFiles('files', __dirname)
    //console.log(files)
    files.forEach(async file => {
      try {
        await fsProm.copyFile(path.join(__dirname,'files', file), path.join(__dirname, 'files-copy', file))
      } catch {
        console.log('The file could not be copied');
      }
      console.log(file)
    })
  } catch (err) {
    console.error(err.message);
  }
}

async function myCopeFile(file) {

}

copyDir()

