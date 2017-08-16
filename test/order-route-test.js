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
            customer_id: 12345
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

    describe('successful POST new Rainier order', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'Rainier Transportation Solutions',
                    model: 'stuff',
                    package: 'awesome',
                    customer_id: 12345
                })
                .then((res) => {
                    expect(res.body.includes('http://ccsa-sales.com/orders/download/order-')).to.eql(true);
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        });
    });

    describe('unsuccessful POST new Rainier order', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    model: 'stuff',
                    package: 'awesome',
                    customer_id: 12345
                })
                .then(done)
                .catch((err) => {
                    expect(err.status).to.eql(400);
                    expect(err.message).to.eql('Bad Request');
                    done();
                });
        });
    });

    describe('successful POST new ACME Autos order', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'ACME Autos',
                    model: 'stuff',
                    package: 'awesome',
                    customer_id: 12345
                })
                .then((res) => {
                    expect(res.body.includes('http://ccsa-sales.com/orders/download/order-')).to.eql(true);
                    expect(res.status).to.eql(200);
                    done();
                })
                .catch(done);
        })
    });

    describe('unsuccessful POST new ACME Autos order', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'ACME Autos',
                    package: 'awesome',
                    customer_id: 12345
                })
                .then(done)
                .catch((err) => {
                    expect(err.status).to.eql(400);
                    expect(err.message).to.eql('Bad Request');
                    done();
                });
        })
    });

    describe('unshippable customer address', () => {
        it('should create a new order and return a url', (done) => {
            request.post(`${baseUrl}/order`)
                .send({
                    make: 'ACME Autos',
                    package: 'awesome',
                    customer_id: 54321
                })
                .then(done)
                .catch((err) => {
                    expect(err.status).to.eql(400);
                    expect(err.message).to.eql('Bad Request');
                    done();
                });
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

    describe('GET unregistered route', () => {
        it('should GET all orders', (done) => {
            request.get(`${baseUrl}/orders/all`)
                .then(done)
                .catch((err) => {
                    expect(err.status).to.eql(404);
                    expect(err.message).to.eql('Not Found');
                    done();
                });
        });
    });

//end parent block
});