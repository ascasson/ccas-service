const Router = require('express').Router;

const ordersController = require('../controllers/order-controller');

const ordersRouter = module.exports = new Router;

ordersRouter.get('/orders', (req, res, next) => {
    ordersController.fetchAllOrders()
    .then(orders => res.json(orders))
    .catch(next);
});

ordersRouter.post('/order', (req, res, next) => {
    ordersController.createOrder(req.body)
    .then((order) => {
        const urlDownload = `http://ccsa-sales.com/orders/download/order-${order.order}.json`
        res.status(200).json(urlDownload);
    })
    .catch(next);
});