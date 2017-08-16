# CCSA-AUTOMOTIVE ORDERS SERVICE
This is a simple REST API using ExpressJS. It enables users to create new vehicle orders. In actual practice, the service would communicate directly
to external API's provided by suppliers, but in this scenario mock servers play that role.

## Setup Locally
Make sure MongoDB v3 is installed, though this isn't required to run tests or if specifying a 'testing' NODE_ENV environment variable.
In such cases, Mockgoose is used.

Install all packages:

    npm install

Start the server:

    npm start

Orders cannot be created unless the supplier API's are working. Run the following scripts in separate tabs:

    npm run acme
    npm run rainier

## Testing
Running tests is simple. Mock servers are provided for supplier API calls. Run the following npm script to execute the test suite:

    npm test

## Orders
In this case, orders needed to be generated as json entries. When traditional POST requests are made to create a new order, an 'orders'
directory is created if none exists, and any new orders are stored in the filesytem. This is done purely for simplicity and demonstration of
expected outputs.

When tests are run, the directory is created, the orders are created, and then the directory and its contents are removed afterwards.