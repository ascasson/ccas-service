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

