"use strict";

const userModel = require("../Models/userModel");
const postModel = require("../Models/postModel");

/**
 * @brief       Renders a profile with all of the user's information
 *
 * @detailed    This renders a page that displays a student's name, GPA,
 *              and major. It also contains a section that shows all of a user's
 *              posts and where they were made.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function loadProfile (req,res) {
    if (req.session.isLoggedIn){
        const userInfo = userModel.getUserByUserID(req.session.user.userID);
        let user = {"firstName": "N/A", "lastName": "N/A", "gpa": "N/A", "major": "N/A"};

        if (userInfo[0].firstName != null){
            user = {"firstName": userInfo[0].firstName, "lastName": userInfo[0].lastName, "gpa": userInfo[0].GPA, "major": userInfo[0].major};
        }

        let posts = postModel.getUsersPosts(req.session.user.userID);
        posts = posts.sort((a, b) => {
            if (a.time > b.time){
                return -1
            }
        });

        res.render("profile", {"user": user, "posts": posts});
    } else {
        res.render("log_in");
    }
}

/**
 * @brief       Renders a page for the user to update their information
 *
 * @detailed    This allows the user to update their name, GPA, or major which
 *              the change will then be done to the database.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function updateProfile (req, res) {
    if (req.session.isLoggedIn){
        res.render("updateProfile")
    } else {
        res.render("log_in")
    }
}

/**
 * @brief       Renders a profile with all of the user's information
 *
 * @detailed    This renders a page that displays a student's name, GPA,
 *              and major. It also contains a section that shows all of a user's
 *              posts and where they were made. The happens after a student's
 *              information has been updated.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function profileUpdated (req, res) {
    if (req.session.isLoggedIn){
        const {firstName, lastName, GPA, major} = req.body;

        userModel.updateUser(req.session.user.userID, GPA, 
                                major, firstName, 
                                lastName);

        const userInfo = userModel.getUserByUserID(req.session.user.userID);

        let user = {"firstName": "N/A", "lastName": "N/A", "gpa": "N/A", "major": "N/A"};

        if (userInfo[0].firstName != null){
            user = {"firstName": userInfo[0].firstName, "lastName": userInfo[0].lastName, "gpa": userInfo[0].GPA, "major": userInfo[0].major};
        }

        let posts = postModel.getUsersPosts(req.session.user.userID);
        posts = posts.sort((a, b) => {
            if (a.time > b.time){
                return -1
            }
        });

        res.render("profile", {"user": user, "posts": posts});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    loadProfile,
    updateProfile,
    profileUpdated
}