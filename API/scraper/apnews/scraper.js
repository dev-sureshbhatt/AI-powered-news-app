const puppeteer = require('puppeteer');
const NewsList = require('../../models/newsList.js')
const mongoose = require('mongoose')

//temp for mongoose to test scraper//
require('dotenv').config()
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => {
    console.log(err, 'something went wrong connecting MONGOOSE');
  });





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



        async function save(){

            const listToSave = new NewsList({
                title: item.name,
                fullTitle:item.name,
                fetchedContent: "lorem ipsum",
                summarizedContent: "lorem upsum",
                image: "ksjdkjsd",
                link: item.url,
                updatedTime: "2024-05-28T08:23:57.537+00:00",
                author: "Hindustan Times",
                scrapedFrom: "Hindustan Times" 
    
            })
            const savedItem = await listToSave.save()
            console.log(savedItem)
        }

        save()
        
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


function fetchSingleNewsFromHT(url){
    
}