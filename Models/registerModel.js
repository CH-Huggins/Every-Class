"use strict";
// Require databaseController to insert values into database
var config = require('../Controllers/databaseController');
var connection= config.connection;

function checkEmail(email) {
    // Sets email to a variable
    let parsed = email.split('@'); // This is throwing an error on setup.ejs

    // If the second portion of the email is an astate email ending
    if (name[1] = `smail.astate.edu`){
        // Then store it

        // Return true
        return true;
    } else {
        // Don't actually do an error, just placeholder for invalid email

        // Return false
        return false;
    }
}

function checkPassword(pass) {

}

function storeCredentials(email, pass){
    // Store the credentials in the database
    let query = 'INSERT INTO students VALUES (?, ?, null, null);';
    connection.query(query, [email, pass], (err, rows) => {
        if (err) throw err;
        console.log("ROW INSERTED WITH EMAIL: " + email + " AND PASSWORD: " + pass); // DUMMY 
    });
}

module.exports = {
    checkEmail,
    checkPassword,
    storeCredentials
}