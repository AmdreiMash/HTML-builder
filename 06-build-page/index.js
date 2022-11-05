const myMod = require('../04-copy-directory/index');
const { rm, open, mkdir, cp } = require('fs/promises');
const path = require('path');
const { createWriteStream, } = require('fs');
const  createBundleCss  = require('../05-merge-styles/index');
const { join } = require('path');
const { error, assert } = require('console');

async function buildPage() {
  await rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
  try {
    const createDir = await mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
    await createBundleCss(path.join(__dirname, 'project-dist'), 'style.css', 'styles', __dirname)

  } catch {
    console.log()
  }
}

async function copyAssets(){
  const files = await myMod.getFiles('assets', __dirname, false, true);
  files.forEach(dir =>{
    myMod.copyDir(path.join('assets', dir), path.join('project-dist', 'assets', dir))
  })
}
buildPage()
