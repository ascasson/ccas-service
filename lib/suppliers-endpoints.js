const Promise = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const bodyParse = require('body-parser');


const acmeKey = process.env.ACME_API_KEY || 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6';

superagentPromisePlugin.Promise = Promise;

const acmeAuto = (orderData) => {

    request.post('http://localhost:3050/acme/api/v45.1')
    .set('API-Key', acmeKey)
    .set('Content-type', 'application/x-www-form-urlencoded')
    .send({
        model: 'stuff',
        package: 'awesome',
        customer_id: Math.floor(Math.random() * 100000) + 1,
        order_test: Math.floor(Math.random() * 100000) + 1  
    })
    .then((res) => {
        expect(res.status).to.eql(200);
        done();
    })
    .catch(done);
}
