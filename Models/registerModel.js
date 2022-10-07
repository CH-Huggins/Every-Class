"use strict";

const db = require("./db");
const nodemailer = require("nodemailer");
require("dotenv").config();

	
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

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
    const sql = 'INSERT INTO users VALUES (@email, @pass, null, null);';
    const stmt = db.prepare(sql);
    // Will need to hash the password here, but that's a later thing
    stmt.run({"email": email,
        "pass": pass});
        

    console.log("ROW INSERTED WITH EMAIL: " + email + " AND PASSWORD: " + pass); // DUMMY 
}

async function validationEmail(email) {  
    const message = "You're getting this email because you registered for" + 
        " EveryClass.org. If you didn't register for this site, ignore this email";

    const mail = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Validate Account",
        text: message,
        html: ""
    }

    try {
        await transporter.sendMail(mail);
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
}

module.exports = {
    checkEmail,
    checkPassword,
    storeCredentials,
    validationEmail
}