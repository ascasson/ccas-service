const fs = require('fs');
const Order = require('../models/order-model');
const httpErrors = require('http-errors');

const createOrder = (orderData) => {
    return new Promise((resolve, reject) => {
        //1. Get supplier_order_id
        
        //2. Create new order in the database
        new Order(orderData).save()
        .then((order) => {
            const orderPlaced = `./orders/order-${order.order}.json`;
            const jsonOrder = JSON.stringify(order);

            //Checking existence of the orders directory
            fs.stat('orders/', (err, stats) => {
                if (err) {
                    fs.mkdir('orders', (err) => {
                        fs.writeFile(orderPlaced, jsonOrder, (err) => {
                            if (err) throw err;
                            resolve(order);
                        });
                    });
                } else {
                    fs.writeFile(orderPlaced, jsonOrder, (err) => {
                        if (err) throw err;
                        resolve(order);
                    });
                }
            });
        })
        .catch(err => reject(httpErrors(400, err.message)));
    });
}

const fetchAllOrders = () => {
    return new Promise((resolve, reject) => {
        Order.find({})
        .then(resolve)
        .catch(err => reject(httpErrors(404, err.message)));
    });
}

module.exports.createOrder = createOrder;
module.exports.fetchAllOrders = fetchAllOrders;
