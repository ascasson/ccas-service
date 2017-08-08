const Router = require('express').Router;

const ordersRouter = module.exports = new Router;

ordersRouter.get('/orders', (req, res, next) => {
    res.send("You hit the GET orders endpoint! Noice!");
});