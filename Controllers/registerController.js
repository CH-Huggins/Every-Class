"use strict";

const registerModel = require("../Models/registerModel");

function register(req, res) {
    const email = req.query.email;
    const pass = req.query.pswd;

    if (registerModel.checkEmail(email) === true && 
        registerModel.checkPassword(pass) === true){

        // Store the information
        registerModel.storeCredentials(email, pass);
z
        // Render the setup page
        res.render("setup", {"email":email});
    } else {
        // Credentials Invalud
    }
}

module.exports = {
    register
}