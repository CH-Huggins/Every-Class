"use strict";

const registerModel = require("../Models/registerModel");

function register(req, res) {
    const email = req.email;
    const pass = req.pswd;

    if (registerModel.checkEmail(email) === true && 
        registerModel.checkPassword(pass) === true){
        
        // Store the information
        registerModel.storeCredentials(email, pass);
        // Render the setup page
        res.render("setup", {"email":email});
    } else {
        // Credentials Invalud
    }
}

module.exports = {
    register
}