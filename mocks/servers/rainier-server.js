//core modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const handleError = require('../../lib/handle-error');

const port = 3051

const app = express();

app.get('/rainier/v10.0/nonce_token', function (req, res) {
  if (req.query.storefront === 'ccas-bb9630c04f') {
    res.json({nonce_token: 'ff6bfd673ab6ae03d8911'});
  } else {
    res.status(403).send({ error: 'Forbidden' })
  }
});

app.post('/rainier/v10.0/request_customized_model', function (req, res) {
  res.json({order_id: Math.floor(Math.random() * 100000) + 1});
});

app.listen(port, () => {
    console.log('Rainier server listening on port 3051');
});