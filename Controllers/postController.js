"use strict"

const postModel = require("../Models/postModel");

function createPost(req, res) {

    if (!req.session.isLoggedIn) {
        return res.render("log_in");
    }

    const {postText} = req.body;

    const userID = req.session.user.userID;
    const createPost = postModel.createPost(postText, userID);

    if (!createPost) {
        //update to render
        return res.sendStatus(400);
    }
    //update to render
    res.sendStatus(201);
}

module.exports = {
    createPost
}