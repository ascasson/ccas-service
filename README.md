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

## Assumptions
I made some basic assumptions primarily about customers:
- It was assumed that customers would have already registered with the user-client and their customerId's would have been available already via an existing user model.
- It was assumed that, while customers could potentially order more than one vehicle, only a single order would be placed at a time.

## What's Next?
There is plenty that needs expanding in this existing service, but some aspects to dive into near term would include:
- Dedicated configuration to handle environment variables and various build environments (Note: for simplicity and time constraints, some sensitive keys were hardcoded in modules)
- Securing the GET /orders route for internal use only, perhaps through the use of JSON Web Tokens and/or Sessions.
- Improve error handling
- Validating supplier models and packages, despite the user-client likely providing its own validation before users submit an order