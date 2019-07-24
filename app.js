// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// Set up express and body-parser
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


// Listen on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})