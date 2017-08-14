//core modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const handleError = require('../../lib/handle-error');

//environment
const port = 3051

const app = express();

app.get('/rainier/v10.0', function (req, res) {
  res.send('hello from the rainier server')
})

app.listen(port, () => {
    console.log('Rainier server listening on port 3051');
})