"use strict";

function loadProfile (req,res) {
    if (!req.session.isLoggedIn){
        res.render("profile");
    }
}

module.exports = {
    loadProfile
}