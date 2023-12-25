const axios = require('axios');
const moment = require('moment');
const cron = require('cron');

const apiKey = 'YOUR_API_KEY_HERE';
const newsLimit = 10;
const postInterval = '0 0,6,12,18 * * *'; // every 6 hours

function getNews() {
  axios.get(`http://api.mediastack.com/v1/news?access_key=${apiKey}&limit=${newsLimit}`)
    .then(response => {
      const news = response.data.data;
      if (news.length > 0) {
        const latestNews = news[0].title;
        postToX(`Latest News: ${latestNews}`);
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
    });
}

function postToX(message) {
  // Add your X API code here to post the message
}

// Schedule the news update task
const job = new cron.CronJob(postInterval, getNews);
job.start();

console.log('News script started. Press Ctrl+C to stop.');