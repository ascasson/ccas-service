const mongoose = require('mongoose');
const fs = require('fs');
const rimraf = require('rimraf');
const Order = require('../models/order-model');

const expect = require('chai').expect;
const Promise = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const server = require('../server');
const rainierServer = require('../mocks/servers/rainier-server');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}`;

superagentPromisePlugin.Promise = Promise;

describe('Orders', () => {

    before((done) => {
        fs.mkdir('orders', (err) => {
            console.log('Orders directory created')
        });
        request.post(`${baseUrl}/order`)
        .send({
            make: 'Rainier Transportation Solutions',
            model: 'olympic',
            package: 'mtn',
            customer_id: Math.floor(Math.random() * 100000) + 1
        })
        .then((res) => {
            expect(res.status).to.eql(200);
            done();
        })
        .catch(done);
    });

    after((done) => {
        Order.remove({}, (err) => {
        rimraf('orders', (err) => {
            console.log('Orders directory removed')
        });
            done();
        });
    });

    describe('POST new Rainier order', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'Rainier Transportation Solutions',
                    model: 'stuff',
                    package: 'awesome',
                    customer_id: Math.floor(Math.random() * 100000) + 1
                })
                .then((res) => {
                    expect(res.body.includes('http')).to.eql(true);
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        });
    });

    describe('POST new ACME Autos order', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'ACME Autos',
                    model: 'stuff',
                    package: 'awesome',
                    customer_id: Math.floor(Math.random() * 100000) + 1
                })
                .then((res) => {
                    expect(res.body.includes('http')).to.eql(true);
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        })
    });

    describe('GET all orders', () => {
        it('should GET all orders', (done) => {
            request.get(`${baseUrl}/orders`)
                .then((res) => {
                    expect(res.body[0].make).to.equal('Rainier Transportation Solutions');
                    expect(res.body.length).to.equal(3);
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        });
    });

//end parent block
});