const mongoose = require('mongoose');
const Order = require('../models/order-model');

const expect = require('chai').expect;
const Promise = require('q');
// const request = require('superagent-promise')(require('superagent'), Promise);
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const server = require('../server');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}`;

superagentPromisePlugin.Promise = Promise;

describe('Orders', () => {
//begin parent block
    // do before each test
    beforeEach((done) => {
        Order.remove({}, (err) => {
            done();
        });
    })
    // test GET orders route
    describe('/GET orders', () => {
        it('should GET all orders', (done) => {
            request.get(`${baseUrl}/orders`)
                .then((res) => {
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        });
    });

    // test POST orders route
    describe('/POST order', () => {
        it('should POST an order', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'Ferrari',
                    model: '430',
                    package: 'awesome',
                    customer_id: Math.random()
                })
                .then((res) => {
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        });
    });

//end parent block
});