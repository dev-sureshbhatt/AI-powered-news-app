const puppeteer = require('puppeteer');

async function fetchItemListJSONLD(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the URL and wait for the network to be idle
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract the JSON-LD script content
    const itemListJSONLD = await page.evaluate(() => {
      const scriptTags = document.querySelectorAll('script[type="application/ld+json"]');
      console.log(`Found ${scriptTags.length} script tags`); // this was not getting printed because it's printing in the puppeteer headless browser LOL
      let itemList = null;

      scriptTags.forEach(script => {
        try {
          const jsonData = JSON.parse(script.textContent);
          if (jsonData['@type'] === 'ItemList') {
            itemList = jsonData;
          }
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      });

      return itemList;
    });

    await browser.close();

     // Debugging output

    if (itemListJSONLD) {
        console.log(itemListJSONLD)
      return itemListJSONLD;
    } else {
      throw new Error('No ItemList JSON-LD found');
    }
  } catch (error) {
    console.error('Error fetching ItemList JSON-LD:', error);
    await browser.close();
  }
}

// URL of the page to scrape
const url = 'https://www.hindustantimes.com/india-news';

fetchItemListJSONLD(url).then(itemListJSONLD => {
  if (itemListJSONLD) {

    // Extract desired details
    if (itemListJSONLD.itemListElement) {
      itemListJSONLD.itemListElement.forEach(item => {
        console.log(`Position: ${item.position}`);
        console.log(`URL: ${item.url}`);
        console.log(`Name: ${item.name}`);
        console.log(`Description: ${item.description}`);
        console.log('---------------------');
      });
    }
  } else {
    console.log('No data received.'); // Debugging output
  }
});
