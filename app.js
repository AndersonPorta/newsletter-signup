// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

// Set up express and body-parser
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Add static folder to server
app.use(express.static("public"));

// Get our html file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

// POST request
app.post("/", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    // Create data object following Mailchimp API documentation
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]      
    };

    var jsonData = JSON.stringify(data);    // Convert to JSON

    // Create options object following request NPM module documentation
    var options = {
        url: 'https://us3.api.mailchimp.com/3.0/lists/c245118730',
        method: 'POST',
        headers: {
            "Authorization": "anderson 8651d4893329ea1a3911c97dfca498cc-us3"
        },
        body: jsonData
    };

    // request NPM module
    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

// Redirect user to home page when the "Try again" button is pressed in failure.html
app.post("/failure", (req, res) => {
    res.redirect("/");
});

// Listen on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})