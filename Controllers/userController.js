"use strict";

const userModel = require("../Models/userModel");
const argon2 = require("argon2");

async function createNewUser (req, res) {
    console.log(req.body);
    const {email, pswd} = req.body;

    console.log(email, pswd);
    const createUser = await userModel.addUser(email, pswd);

    if (!createUser) {
        return res.sendStatus(409);
    }

    res.sendStatus(201);
}

async function logIn (req, res) {
    const {email, pswd} = req.body;
    const user = userModel.getUserbyEmail(email);
    console.log(user);

    // update ejs to display no email found
    if (!email) {
        return res.sendStatus(400);
    }

    // update ejs to display incorrect password
    const correct = await argon2.verify(user.hash, pswd);
    if (!correct) {
        return res.sendStatus(400);
    };

    req.session.regenerate( (error) => {
        if(error) {
            //update to render error on login
            console.log(error);
            return res.sendStatus(500);
        }
        req.session.isLoggedIn = true;
        req.session.user = {
            "email": user.email,
            "userID": user.userID,
        }

        var name = email.split(".")[0].toString();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return res.render("generalSpace", {"email": name});
    });
}

async function logOut(req, res) {
    if (req.session) {
        req.session.destroy( (error) => {
            if (error) {
                res.render("log_in");
            } else {
                res.send('Logout successful')
            }
        });
    } 
    else {
        res.end()
    }
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
    logOut,
}