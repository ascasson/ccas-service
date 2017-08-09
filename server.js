//core modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const handleError = require('./lib/handle-error');

//routes
const ordersRouter = require("./routes/order-route");

//environment
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/orders'

const app = express();

mongoose.connect('mongodb://localhost/orders');
mongoose.connection.on('connected', () => {  
        console.log('db connection is now open');
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', ordersRouter);

app.use(handleError);

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = server;