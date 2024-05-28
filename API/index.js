const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const NewsList = require('./models/newsList.js')
const {scrapeNewsList} = require('./utils/scraper/fetchNewsList.js')


const app = express()

app.listen(4000, ()=>{

    console.log("App listening at PORT 4000")

})


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('mongoose connected');
  })
  .catch((err) => {
    console.log(err, 'something went wrong connecting MONGOOSE');
  });



//mentioning the URL(s) to scrape 
// const urlToScrape = ['https://aninews.in/topic/detail/breaking-topics/']
// scrapeNewsList(urlToScrape[0])

app.get('/breaking', async (req, res) => {
    try {
        const getNews = await NewsList.find();
        
        // Map the documents to only include the required fields
        const filteredNews = getNews.map(news => ({
            title: news.title,
            image: news.image,
            link: news.link,
            updatedTime: news.updatedTime,
            scrapedFrom: news.scrapedFrom
        }));
        
        res.json(filteredNews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the news.' });
    }
});


