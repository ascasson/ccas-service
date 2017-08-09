
const mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

const orderSchema = mongoose.Schema({
    make: {type: String, required: true, Default: 'N/A'},
    model: {type: String, required: true, Default: 'N/A'},
    package: {type: String, required: true, Default: 'N/A'},
    customer_id: {type: Number, required: true},
    order: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderSchema);