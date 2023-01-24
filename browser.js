const puppeteer = require('puppeteer');

async function getWord(word) {
  const browser = await puppeteer.launch({headless: true, defaultViewport: null,
    args: ['--start-maximized']})
  const page = await browser.newPage();
  await page.goto('https://www.duden.de/rechtschreibung/' + word);
  await page.setDefaultTimeout(5000);
  

 try {
  await page.waitForSelector('.lemma__determiner');
  let result = await page.evaluate(() => {

    const article = document.querySelector('.lemma__determiner').innerText;
    const word = document.querySelector('.lemma__main').innerText;
    return article + ' ' + word;
  });

  await browser.close();
  return result;
 } catch (e) {
   console.log(e)
   await browser.close();
   throw e;
 }
  
}


exports.getWord = getWord;