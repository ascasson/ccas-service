const mongoose = require('mongoose');
const fs = require('fs');
const rimraf = require('rimraf');
const Order = require('../models/order-model');

const expect = require('chai').expect;
const Promise = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const server = require('../server');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}`;

superagentPromisePlugin.Promise = Promise;

describe('Orders', () => {
//begin parent block
    // do before the tests begin
    beforeEach((done) => {
        fs.mkdir('orders', (err) => {
            console.log('made the directory')
        });
        request.post(`${baseUrl}/order`)
        .send({
            make: 'Ferrari',
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
    });
    // after all tests have run
    afterEach((done) => {
        Order.remove({}, (err) => {
        rimraf('orders', (err) => {
            console.log('Orders directory removed')
        });
            done();
        });
    });

    // test POST orders route
    describe('/POST order', () => {
        it('should POST an order', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'Maserati',
                    model: 'stuff',
                    package: 'awesome',
                    customer_id: Math.floor(Math.random() * 100000) + 1,
                    order: Math.floor(Math.random() * 100000) + 1 
                })
                .then((res) => {
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        });
    });

     // test GET orders route
    describe('/GET orders', () => {
        it('should GET all orders and return a success status', (done) => {
            request.get(`${baseUrl}/orders`)
                .then((res) => {
                    expect(res.status).to.equal(200);
                    done();
                })
                .catch(done);
        });
    });

    describe('/GET orders', () => {
        it('should GET all orders with a first index make value equal to Ferrari', (done) => {
            request.get(`${baseUrl}/orders`)
                .then((res) => {
                    expect(res.body[0].make).to.eql('Ferrari');
                    done();
                })
                .catch(done);
        });
    });

    describe('/GET orders', () => {
        it('should GET all orders as an array with length of 3', (done) => {
            request.get(`${baseUrl}/orders`)
                .then((res) => {
                    expect(res.body.length).to.eql(1);
                    done();
                })
                .catch(done);
        });
    });

//end parent block
});