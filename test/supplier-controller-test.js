const fs = require('fs');

const expect = require('chai').expect;
const Promise = require('q');
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const supplierController = require('../controllers/supplier-controller');

const rainierServer = require('../mocks/servers/rainier-server');
const acmeServer = require('../mocks/servers/acme-server');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}`;
const rainierBaseUrl = 'http://localhost:3051/rainier/v10.0';

superagentPromisePlugin.Promise = Promise;

const exampleOrder = {
        make: 'ACME Autos',
        model: 'anvil',
        package: 'std',
        customer_id: 12345,
    }

describe('Supplier controller', () => {

    describe('Supplier check', () => {
        it('should return a supplier module name', (done) => {
            const supplierName = supplierController.supplierCheck('Rainier Transportation Solutions');
            expect(supplierName).to.eql('rainierOrder');
            done();
        })
    });

    describe('Rainier order create', () => {
        it('should respond with a supplier order id', (done) => {
            supplierController.rainierOrder(exampleOrder)
                .then((order_id) => {
                    expect(Number.isInteger(order_id)).to.eql(true);
                    done();
                })
                .catch(done)
        });
    });

    describe('ACME order create', () => {
        it('should respond with a supplier order id', (done) => {
            supplierController.acmeOrder(exampleOrder)
                .then((order) => {
                    expect(Number.isInteger(order)).to.eql(true);
                    done();
                })
                .catch(done)
        });
    });

});