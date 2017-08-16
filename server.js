const express = require('express');
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const bodyParser = require('body-parser');
const httpErrors = require('http-errors');


const mockgoose = new Mockgoose(mongoose);

const handleError = require('./lib/handle-error');

const ordersRouter = require("./routes/order-route");

//environment
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'dev';
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/orders'

const app = express();

if(process.env.NODE_ENV === 'testing') {
    mockgoose.prepareStorage().then(() => {
        mongoose.connect('mongodb://localhost/orders');
        mongoose.connection.on('connected', () => {  
            console.log('mockgoose db connection is now open');
        });
    });

} else {
    mongoose.connect('mongodb://localhost/orders');
    mongoose.connection.on('connected', () => {  
        console.log('db connection is now open');
    });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', ordersRouter);

// app.all('*', function(req, res, next){
//   next(httpErrors(404, 'no such route'));
// });

app.use(handleError);

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = server;