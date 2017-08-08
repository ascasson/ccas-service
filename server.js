//core modules
const express = require('express');
//routes
//environment
const port = process.env.PORT || 3000;

const app = express();

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});