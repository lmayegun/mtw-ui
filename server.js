'use strict';

const app = require('express')();
const responseTime = require('response-time');
const NodeCache = require("node-cache");
const images = require('./src/images.json');

const cache = new NodeCache({ stdTTL: 15 });

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const verifyCache = (req, res, next) => {
  try {
    const { limit } = req.query;
    if (cache.has(limit)) {
      return res.status(200).json(cache.get(limit));
    }
    return next();
  } catch (err) {
    throw new Error(err);
  }
};

app.use(responseTime((req, res, time) => {
  console.log('response time is:');
  console.log(`${req.method} ${req.url} ${time}`);
}));

app.get('/images', verifyCache, ({ query }, res) => {
  const i = (query.limit) ? images.slice(0, parseInt(query.limit)) : images;
  let data;
  try{
    cache.set(i.length, i);
  } catch(e){
    console.log(e);
  }

  // return cached data 
  if (cache.get(i.length)) {
    return res.status(200).json(cache.get(i.length));
  }

  // else get new data. 
  // async simulator with Timeout
  setTimeout(() => {
    data = res.status(200).json(i);
    cache.set(i.length, i);
    return res.status(200).json(i);
  }, randomInterval(500, 1500));
});

app.listen(5000, () => {
  process.stdout.write('Server is available on http://localhost:5000/\n');
});
