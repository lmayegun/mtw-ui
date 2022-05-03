'use strict';

const app = require('express')();
const responseTime = require('response-time');
const NodeCache = require("node-cache");
const images = require('./src/images.json');

const cache = new NodeCache({ stdTTL: 15 });

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

app.use(responseTime((req, res, time) => {
  console.log('response time is:');
  console.log(`${req.method} ${req.url} ${time}`);
}));

app.get('/images', ({ query }, res) => {
  const i = (query.limit) ? images.slice(0, parseInt(query.limit)) : images;

  setTimeout(() => {
    return res.status(200).json(i);
  }, randomInterval(500, 1500));
});

app.listen(5000, () => {
  process.stdout.write('Server is available on http://localhost:5000/\n');
});
