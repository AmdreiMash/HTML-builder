const myMod = require('../04-copy-directory/index');
const { rm, open, mkdir, copyFile } = require('fs/promises');
const path = require('path');
const { createWriteStream, } = require('fs');
const createBundleCss = require('../05-merge-styles/index');
const { join } = require('path');
const { error, assert } = require('console');

async function buildPage() {
  await rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
  try {
  const createDir = await mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
  await createBundleCss(path.join(__dirname, 'project-dist'), 'style.css', 'styles', __dirname)
  await copyAssets()
  await copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'))
  const htmlFile = await open(path.join(__dirname, 'project-dist', 'index.html'));
  let data = await htmlFile.readFile('utf8');
  const tags = data.match(/{{.+/g)
  tags.forEach(async (tag, index) => {
    const file = tag.replace('{{', '').replace('}}', '') + '.html'
    //console.log(file)
    const component = await open(path.join(__dirname, 'components', file))
    const componentData = await component.readFile('utf8')
    //console.log(componentData +'\n')
    data = data.replace(tag, componentData)
    const htmlFileOutput = createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
    htmlFileOutput.write(data + '\n')
    component.close()
    htmlFileOutput.close()
  });
  htmlFile.close()
  } catch {
    console.error(err.message);
  }
}

async function copyAssets() {
  const dirs = await myMod.getFiles('assets', __dirname, false, true);
  //console.log(dirs)
  dirs.forEach(async dir => {
    try {
      const createDir = await mkdir(path.join(__dirname, 'project-dist', 'assets', dir), { recursive: true });
      const files = await myMod.getFiles(dir, path.join(__dirname, 'assets'), false);
      files.forEach(async file => {
        //console.log(file)
        try {
          await copyFile(path.join(__dirname, 'assets', dir, file), path.join(__dirname, 'project-dist', 'assets', dir, file))
          //bundelCSS.write(data + '\n')
        } catch {
          console.log('The file could not be copied');
        }
      })
    } catch (err) {
      console.error(err.message);
    }
  })
}

buildPage()

//! Тут почему то выдеат ошибку :
//!"ENOTDIR: not a directory, scandir '/HTML-builder/06-build-page/assets/.DS_Store" - откуда он приехал я не пнял)
//! на работу скрипта это не влияет) 
//! Тут так же не обошлось без консольлогв из 3й части задания : )