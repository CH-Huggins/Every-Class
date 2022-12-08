"use strict";

const userModel = require("../Models/userModel");
const argon2 = require("argon2");

/**
 * @brief       Creates a new user
 *
 * @detailed    ensures that the passwords given match and if they do,
 *              creates the user using the given username and password
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

async function createNewUser (req, res) {
    const {email, pswd, pswd_verify} = req.body;

    // If passwords don't match
    if (pswd != pswd_verify){
        return res.render("sign_up");
    } else {
        // Make a new user
        const createUser = await userModel.addUser(email, pswd);

        // If there is no new user, send an error
        if (!createUser) {
            return res.sendStatus(409);
        }

        // Redirect to the home page
        return res.redirect('/index.html');
    }
}

/**
 * @brief       Allows the student to login
 *
 * @detailed    This gets the user's email and password and as long as they
 *              exist and the password matched, it creates a user seession.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

async function logIn (req, res) {
    const {email, pswd} = req.body;
    const user = userModel.getUserbyEmail(email);

    if (user == null) {
        return res.render("log_in");
    }

    // update ejs to display incorrect password
    const correct = await argon2.verify(user.hash, pswd);

    /* Would do if email services worked
    if (!correct || !user.validated) { */
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
        }

        var name = email.split(".")[0].toString();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return res.redirect("/api/home");
    });
}

/**
 * @brief       Logs the user out
 *
 * @detailed    Given that the log out button is clicked, destroy the user
 *              session and redirect them to the home page. If there was a
 *              problem, send them back to the error home page.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

async function logOut(req, res) {
    if (req.session) {
        req.session.destroy( (error) => {
            if (error) {
                res.render("log_in");
            } else {
                res.redirect('/');
            }
        });
    } 
    else {
        res.end()
    }
}

module.exports = {
    createNewUser,
    logIn,
    logOut,
}