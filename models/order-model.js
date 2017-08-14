
const mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

const orderSchema = mongoose.Schema({
    make: {type: String, required: true},
    model: {type: String, required: true},
    package: {type: String, required: true},
    customer_id: {type: Number, required: true},
    order_id: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderSchema);