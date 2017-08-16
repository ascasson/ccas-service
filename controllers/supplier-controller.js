const PromiseSuper = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

const suppliers = require('../lib/data/suppliers');

const rainierBaseUrl = 'http://localhost:3051/rainier/v10.0';
const rainierStorefront = 'ccas-bb9630c04f';

superagentPromisePlugin.Promise = PromiseSuper;

const supplierCheck = (make) => {
    if(suppliers[make]) {
        return suppliers[make].orderModule;
    } else {
        return 'No supplier';
    }
}

//2. Function for getting order from ACME
    // POST an order using api_key

const createRainierOrder = (orderDetails) => {
    return new Promise((resolve, reject) => {
        request.get(`${rainierBaseUrl}/nonce_token?storefront=${rainierStorefront}`)
            .then((res) => {
                request.post(`${rainierBaseUrl}/request_customized_model`)
                    .send({
                        token: res.body.nonce_token,
                        model: orderDetails.model,
                        package: orderDetails.package
                    })
                    .then((res) => {
                        resolve(res.body.order_id);
                    })
                    .catch((err) => {
                        reject(err.status);
                    })
            })
            .catch((err) => {
                reject(err.status);
            });
    });
}

module.exports.rainierOrder = createRainierOrder;
module.exports.supplierCheck = supplierCheck;