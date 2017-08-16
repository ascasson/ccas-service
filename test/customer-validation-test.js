const expect = require('chai').expect;
const shipRestrictionsCheck = require('../lib/customer-validation');

const port = process.env.PORT || 3000;
const baseUrl = `localhost:${port}`;

const exampleOrder1 = {
        make: 'ACME Autos',
        model: 'Great',
        package: 'awesome',
        customer_id: 12345,
    }

const exampleOrder2 = {
        make: 'Rainier Transportation Solutions',
        model: 'Great',
        package: 'awesome',
        customer_id: 54321,
    }

describe('Customer validation', () => {

    describe('state or province shipping check', () => {
        it('should return true', (done) => {
            const shipCheck = shipRestrictionsCheck(exampleOrder1.customer_id);
            expect(shipCheck).to.eql(false);
            done();
        })
    });

    describe('state or province shipping check', () => {
        it('should return false', (done) => {
            const shipCheck = shipRestrictionsCheck(exampleOrder2.customer_id);
            expect(shipCheck).to.eql(true);
            done();
        })
    });

});