"use strict";

const userModel = require("../Models/userModel");
const argon2 = require("argon2");

async function createNewUser (req, res) {
    const {email, password} = req.body;

    console.log(email, password);
    const createUser = await userModel.addUser(email, password);

    if (!createUser) {
        return res.sendStatus(409);
    }

    res.sendStatus(201);
}

async function logIn (req, res) {
    const {email, password} = req.body;
    const user = userModel.getUserbyEmail(email);

    if (!email) {
        return res.sendStatus(400);
        console.log("email not found");
    }

    // ** UPDATE THIS TO RETURN A BETTER RESPONSE STATUS WHEN FAILED
    const correct = await argon2.verify(user.hash, password);
    if (!correct) {
        return res.sendStatus(400);
    };

    req.session.regenerate( (error) => {
        if(error) {
            console.log(error);
            return res.sendStatus(500);
        }
        req.session.isLoggedIn = true;
        req.session.user = {
            "email": user.email,
            "userID": user.userID,
        }

        return res.sendStatus(200);
    });
}

//function register(req, res) {
//    const email = req.query.email;
//    const pass = req.query.pswd;
//    const passVerif = req.query.pswd_verify;
//
//    if (registerModel.checkEmail(email) === true && 
//        registerModel.checkPassword(pass, passVerif) === true){
//        // Store the information
//        registerModel.storeCredentials(email, pass);
//        // Render the setup page
//        res.render("setup", {"email": email});
//    } else {
//        // Credentials Invalid
//        res.render("sign_up");
//    }
//}
//
//const loginModel = require("../Models/loginModel");
///* ----------------------------------------------------
//        REQUIRE DATA FROM log_in.html
//   ---------------------------------------------------- */
//function loginControl(req, res){
//    var email = req.query.email;
//    var password = req.query.pswd;
//    if(loginModel.login(email, password)){
//        res.render("home", {"email": email});
//    }else{
//        res.render("log_in")
//    }
//    
//}

module.exports = {
    createNewUser,
    logIn, 
}