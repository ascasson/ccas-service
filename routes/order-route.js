const Router = require('express').Router;

const orderController = require('../controllers/order-controller');
const supplierController = require('../controllers/supplier-controller');

const ordersRouter = module.exports = new Router;

ordersRouter.get('/orders', (req, res, next) => {
    orderController.fetchAllOrders()
    .then(orders => res.json(orders))
    .catch(next);
});

ordersRouter.post('/order', (req, res, next) => {
    const supplierModuleName = supplierController.supplierCheck(req.body.make);
    
    supplierController[supplierModuleName](req.body)
        .then((data) => {
            req.body.supplier_order_id = data;
            orderController.createOrder(req.body)
                .then((order) => {
                    const urlDownload = `http://ccsa-sales.com/orders/download/order-${order._id}.json`
                    res.status(200).json(urlDownload);
                })
                .catch(next);
        })
        .catch(next);
});