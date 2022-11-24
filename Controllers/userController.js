"use strict";

const userModel = require("../Models/userModel");
const argon2 = require("argon2");

async function createNewUser (req, res) {
    const {email, pswd} = req.body;

    const createUser = await userModel.addUser(email, pswd);

    if (!createUser) {
        return res.render("log_in");
    }
    else {
        return res.redirect("http://localhost:8080/")
    }
}

async function logIn (req, res) {
    const {email, pswd} = req.body;
    const user = userModel.getUserbyEmail(email);
    console.log("Initial Login Info", user);

    // update ejs to display no email found
    if (!email) {
        return res.sendStatus(400);
    }

    var name = email.split(".")[0].toString();
    name = name.charAt(0).toUpperCase() + name.slice(1);

    if(!user) {
        return res.render("log_in");
    }

    // update ejs to display incorrect password
    const correct = await argon2.verify(user.hash, pswd);
    if (!correct) {
        return res.render("log_in");
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
            "name": name,
        }
        console.log("User Info", req.session.user);
        return res.redirect("/api/home");
    });
}


function logOut(req, res) {
    if (req.session) {
        req.session.destroy( (error) => {
            if (error) {
                //deal with error
                return res.redirect("http://localhost:8080/");
            } else {
                req.session = null;
                return res.redirect("http://localhost:8080/");
            }
        });
    } 
    else {
        res.end();
    }
}

module.exports = {
    createNewUser,
    logIn,
    logOut,
}