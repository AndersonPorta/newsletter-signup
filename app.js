// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// Set up express and body-parser
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Add static folder to server
app.use(express.static("public"));

// Get our html file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    console.log(firstName + lastName + email);
});
// Listen on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})