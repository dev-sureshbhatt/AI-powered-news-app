const mongoose = require('mongoose')

const newsListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  image: {
    type: String,
    // required: true,
  },
  link: {
    type: String,
    unique: true
  },
  updatedTime: {
    type: Date,
    required: true,
  },
  author:{
    type: String
  },
  scrapedFrom: {
    type: String
  }
}, {timestamps: true});

const NewsList = mongoose.model('NewsList', newsListSchema);

module.exports = NewsList