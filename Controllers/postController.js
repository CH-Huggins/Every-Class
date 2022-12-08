"use strict"

const postModel = require("../Models/postModel");

/**
 * @brief       Renders all posts in a space
 *
 * @detailed    This renders all posts within a space after adding the user's
 *              newest post to the database.
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function makePost(req, res) {
    if (req.session.isLoggedIn){
        const location = req.body.location;

        // Adds the post to the database
        postModel.makePost(location, req.session.user.userID, req.body.content);
        
        // Get all of the posts
        let posts = postModel.getPosts(location);
        // Sort them by time
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
    makePost
}