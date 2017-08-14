//core modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiKeyAccept = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';

const handleError = require('../../lib/handle-error');

//environment
const port = 3050

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/acme/api/v45.1', function (req, res) {
    if (req.headers['x-api-key'] === apiKeyAccept) {
        return res.send('hello from the acme server')
    }
    res.status(401).send('You are not allowed access to this resource.');
})

app.listen(port, () => {
    console.log('ACME server listening on port 3051');
})