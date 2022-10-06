"use strict";
const db = require("./db");

function checkEmail(email) {
    //
    if (email.includes('@')){
        // Sets email to a variable
        let parsed = email.split('@'); // This is throwing an error on setup.ejs

        // If the second portion of the email is an astate email ending
        if (parsed[1] == `smail.astate.edu`){
            // Then store it

            // Return true
            return true;
        } else {
            // Don't actually do an error, just placeholder for invalid email

            // Return false
            return false;
        }
    } else {
        return false;
    }
    
}

function checkPassword(pass, passVerif) {
    if (pass == passVerif){
        console.log("Passwords match");
        return true;
    } else {
        console.log("passwords do not match");
        return false;
    }
}


function storeCredentials(email, pass){
    // Store the credentials in the database
    // Create uuid
        const { v4: uuidv4 } = require('uuid');
        var userid = uuidv4();
        const sql = 'INSERT INTO users VALUES (@email, @pass, @userid, null, null);';
        const stmt = db.prepare(sql);
    // Will need to hash the password here, but that's a later thing
        stmt.run({"email": email,
            "pass": pass,
            "userid": userid});
    
        // DUMMY FUNCTION -andrea
        console.log("ROW INSERTED WITH EMAIL: " + email + " AND PASSWORD: " + pass
                    + " AND UUID: " + userid); 
}

module.exports = {
    checkEmail,
    checkPassword,
    storeCredentials
}