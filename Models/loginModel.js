"use strict";
const e = require("express");
const db = require("./db");

// Function for validating email and verifying it

function validateEmail(email) {
    
}

// Function for validating password and verifying it

function validatePassword(pass) {

}

function login(email, pass) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = @email;');
    const inf = stmt.all({email});
    console.log(inf);
    if(inf[0] != null){ // If query returns values
        const passwordCheck = inf[0].password;
        if(passwordCheck === pass)
            return true;
        else
            return false;
    }else{
        return false;
    }

}

module.exports = {
    login
}