const PromiseSuper = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

const suppliers = require('../lib/data/suppliers');

const rainierBaseUrl = 'http://localhost:3051/rainier/v10.0';
const rainierStorefront = 'ccas-bb9630c04f';

const acmeBaseUrl = 'http://localhost:3050/acme/api/v45.1'
const acmeKey = 'cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6'

superagentPromisePlugin.Promise = PromiseSuper;

const supplierCheck = (make) => {
    if(suppliers[make]) {
        return suppliers[make].orderModule;
    } else {
        return 'No supplier';
    }
}

const acmeOrder =(orderDetails) => {
    return new Promise((resolve, reject) => {
        request.post(`${acmeBaseUrl}/order`)
            .set('X-API-Key', acmeKey)
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                model: orderDetails.model,
                package: orderDetails.package
            })
            .then((res) => {
                resolve(res.body.order);
            })
            .catch((err) => {
                reject(err);
            })
        });
}

const rainierOrder = (orderDetails) => {
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
                        reject(err);
                    })
            })
            .catch((err) => {
                reject(err.status);
            });
    });
}

module.exports.rainierOrder = rainierOrder;
module.exports.acmeOrder = acmeOrder;
module.exports.supplierCheck = supplierCheck;