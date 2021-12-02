const MURI = "BEAUTY";

const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const scrollPageToBottom = require('puppeteer-autoscroll-down');



(async () => {
  const url = 'https://www.reddit.com/r/wallstreetbets/search?sort=new&restrict_sr=on&q=flair%3ADiscussion';
  const maxpage = 5;
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1200,
    height: 800
  });

  const post = '.QBfRw7Rj8UkxybFpX-USO'

  await page.waitForSelector(post)

  for (let index = 0; index < 5; index++) {
    console.log(`FOR ${index}`);
    await scrollPageToBottom(page)
  }

  const bodyHtml = await page.evaluate(() => document.body.innerHTML);
  // Array(x).fill(() => 1).map( () => {

  // })

  const $ = await cheerio.load(bodyHtml);

  const titleDivSelector = '._19FzInkloQSdrf0rh3Omen';
  const titleLinkClasses = '.SQnoC3ObvgnGjWt90zD9Z';

  const reg = new RegExp("\\$[A-Za-z].*", "g");

  $(`${post} > div`).each((i, el) => {
    const titleDiv = $(el).find(titleDivSelector);
    const link = $(titleDiv).find(titleLinkClasses);
    const linkHref = $(link).attr('href');
    const titleText = link.children().text();

    if (reg.test(titleText)) {
      console.log(`${i} - `, linkHref, titleText);
    }
  })
  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}