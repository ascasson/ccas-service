const Promise = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

const rainierBaseUrl = 'http://localhost:3051/rainier/v10.0';
const rainierStorefront = 'ccas-bb9630c04f';

superagentPromisePlugin.Promise = Promise;

//1. Function to determine which supplier is requested based on Make

//2. Function for getting order from ACME
    // POST an order using api_key

//3. Function for getting order from Rainier
    // GET a one-time token (own module)
    // POST an order (own module)

const rainierToken = (storeFront) => {
    return new Promise((resolve, reject) => {
        request.get(`${rainierBaseUrl}?storefront=${rainierStorefront}`)
            .then((res) => {
                //response should include a token that will be resolved
                const token = res.token;
                resolve(token)
            })
            .catch(err => reject(httpErrors(400, err.message)));
    });
}
