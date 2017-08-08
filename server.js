//core modules
const express = require('express');

//routes
const ordersRouter = require(__dirname + "/routes/orders");

//environment
const port = process.env.PORT || 3000;

const app = express();

app.use('/', ordersRouter);

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});