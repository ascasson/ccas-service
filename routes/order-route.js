const Router = require('express').Router;

const ordersController = require('../controllers/order-controller');

const ordersRouter = module.exports = new Router;

const orderExample = {
    make: 'Ferrari',
    model: '430',
    package: 'The best',
    customer_id: 12345
};

ordersRouter.get('/orders', (req, res, next) => {
    console.log('Fetching orders')
    ordersController.fetchAllOrders()
    .then(order => res.json(order))
    .catch(next);
});

ordersRouter.post('/order', (req, res, next) => {
    console.log('Creating order');
    // Includes an example set of data
    ordersController.createOrder(orderExample)
    .then(order => res.json(order))
    .catch(next);
});