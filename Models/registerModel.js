"use strict";


function checkEmail(email) {
    // Sets email to a variable
    let parsed = email.split('@');

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
}

module.exports = {
    checkEmail,
    checkPassword,
    storeCredentials
}