"use strict";

const loginModel = require("../Models/loginModel");

function loginControl(req, res){
    const email = req.query.email;
    const pass = req.query.pswd;

    const data = loginModel.login(email, pass);

    res.render("home", {"email": email, "pass": pass});
}

module.exports = {
    loginControl
}