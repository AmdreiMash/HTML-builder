const myMod = require('../04-copy-directory/index');
const { rm, open, mkdir, cp } = require('fs/promises');
const path = require('path');
const { createWriteStream, } = require('fs');
const  createBundleCss  = require('../05-merge-styles/index');
const { join } = require('path');
const { error } = require('console');

async function buildPage() {
  await rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
  try {
    const createDir = await mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    await cp(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'), { errorOnExist: true, recursive: true })
    await createBundleCss(path.join(__dirname, 'project-dist'), 'style.css', path.join(__dirname, 'styles'))
  } catch {
    console.log()
  }
}


buildPage()
//copyAssets()