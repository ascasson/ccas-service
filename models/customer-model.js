
const mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

const customerSchema = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    address: {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state_province: {type: String, required: true},
        country: {type: String, required: true}
    },
    orders: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Customer', orderSchema);