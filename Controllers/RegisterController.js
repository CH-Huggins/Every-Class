"use strict";

const { RedisClient } = require("redis");
const registerModel = require("../Models/registerModel");

function register(req, res) {
    const email = req.query.email;
    const pass = req.query.pswd;
    const passVerif = req.query.pswd_verify;

    if (registerModel.checkEmail(email) === true && 
        registerModel.checkPassword(pass, passVerif) === true){
        // Store the information
        registerModel.storeCredentials(email, pass);
        // Render the setup page
        res.render("setup", {"email": email});
    } else {
        // Credentials Invalid
        res.render("sign_up");
    }
}

module.exports = {
    register
}