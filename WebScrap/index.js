const MURI = "BEAUTY";

const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');




(async () => {
  const url = 'https://www.reddit.com/r/wallstreetbets/search?q=flair_name%3A%22Daily%20Discussion%22&restrict_sr=1&sort=new';

  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.goto(url);

  const post = '.QBfRw7Rj8UkxybFpX-USO'
  await page.waitForSelector(post)

  const bodyHtml = await page.evaluate(() => document.body.innerHTML);


  const $ = await cheerio.load(bodyHtml);

  $(post).children().each((i, el) => {
    console.log(`${i} - `, el);
  })
  await browser.close();
})();