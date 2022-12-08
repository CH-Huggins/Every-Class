"use strict"

const spaceModel = require("../Models/spaceModel");
const postModel = require("../Models/postModel")

/**
 * @brief       Renders the Home Space
 *
 * @detailed    This gets all posts that have been posted in the home space
 *              as well as lets students write posts.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderHome(req, res) {
    if (req.session.isLoggedIn){
        let posts = postModel.getPosts("Home");
        posts = posts.sort((a, b) => {
            if (a.time > b.time){
                return -1
            }
        });

        res.render("space", {"posts": posts, "location": "Home"});
    } else {
        res.render("log_in");
    }
}

/**
 * @brief       Renders a course Space
 *
 * @detailed    This gets all posts that have been posted in a course's
 *              designated space. It also allows the user to write posts.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderSpace(req, res) {
    if (req.session.isLoggedIn){
        const location = req.params.course;
        let posts = postModel.getPosts(location);
        posts = posts.sort((a, b) => {
            if (a.time > b.time){
                return -1
            }
        });

        res.render("space", {"posts": posts, "location": location});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    renderHome,
    renderSpace
}