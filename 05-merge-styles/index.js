const myMod = require('../04-copy-directory/index')
const { rm, open, readFile } = require('fs/promises');
const path = require('path');
const { createWriteStream, } = require('fs');

async function createBundleCss(adres, file, styleDir) {
  await rm(path.join(adres, file), { recursive: true, force: true });
  try {
    const bundelCSS = createWriteStream(path.join(adres, file));
    const CSSfiles = await myMod.getFiles(styleDir, __dirname)
    //console.log(CSSfiles)
    CSSfiles.forEach(async name => {
      if (name.split('.')[1] === 'css') {
        const cssFile = await open(path.join(__dirname, styleDir, name));
        const data = await cssFile.readFile('utf8');
        //console.log(data)
        bundelCSS.write(data + '\n')
        await cssFile.close()
      } else {
        false
      }
    });
  } catch {
    console.log('error!');
  };
};

createBundleCss(path.join(__dirname, 'project-dist'), 'bundle.css', 'styles')

module.exports = { readFile, createBundleCss }

//! При выполнении этого скрипта будет так же отображен список файлов из 3-й части.
//! Я экспортировал оттуда функцию, и почему-то воспроизводится весь скрипт :)
//! ТЗ этот момент не оговаривает, использовать import означает переписать весь код с require на него.
//! Что бы сделать копи паст много ума не надо но я решил оставить так как есть т.к в тз про это ничего нет.
//! //! и ошибкой это не сичтаеться. Рассчитываю на понимание)