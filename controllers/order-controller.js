const Order = require('../models/order-model');
const httpErrors = require('http-errors');

// TODO: Testing this module
const createOrder = (orderData) => {
    console.log('You created an order!');
    return new Promise((resolve, reject) => {
        new Order(orderData).save()
        .then(order => resolve(order))
        .catch(err => reject(httpErrors(400, err.message)));
    });
}

// TODO: Testing this module
const fetchAllOrders = () => {
    console.log('You fetched all orders!');
    return new Promise((resolve, reject) => {
        Order.find({make: 'Ferrari'})
        .then(resolve)
        .catch(err => reject(httpErrors(404, err.message)));
    });
}

module.exports.createOrder = createOrder;
module.exports.fetchAllOrders = fetchAllOrders;
