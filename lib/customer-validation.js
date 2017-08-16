const shipRestrictions = require('./data/ship-restrictions');
const customers = require('../mocks/data/customers').customers;

const shipRestrictionCheck = (customer) => {
    let state_province = '';

    for(let i = 0; i <= customers.length; i++) {
        let id = customers[i].customer_id
        if(id == customer) {
            state_province = customers[i].address.state_province;
            break
        }
    }

    if(shipRestrictions.state_province.includes(state_province)) {
        return true;
    }
    
    return false;
}

module.exports = shipRestrictionCheck;