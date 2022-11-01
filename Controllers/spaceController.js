"use strict"

const spaceModel = require("../Models/spaceModel");

function renderHome(req, res) {
    // Populate array of posts
    //const posts = spaceModel.populatePosts("home");
    // Test array
    const user = {"firstName": "Christian", "lastName": "Huggins", "gpa": "4.0", "major": "Computer Science", "img": false}

    const post = {"date": "10/31/2022", 
        "time": "1:00pm", 
        "location": "Home", 
        "content": "Testing the home page",
        "user": user}
    const posts = [post, post, post, post, post, post, post];

    if (req.session.isLoggedIn){
        res.render("space", {"posts": posts, "location": "Home"});
    } else {
        res.render("log_in");
    }
}

function renderSpace(req, res) {
    const location = req.params.course;
    // Populate array of posts
    //const posts = spaceModel.populatePosts(location);
    // Test array
    const user = {"firstName": "Christian", "lastName": "Huggins", "gpa": "4.0", "major": "Computer Science", "img": false}

    const post = {"date": "10/31/2022", 
        "time": "1:00pm", 
        "location": "Home", 
        "content": "Testing the home page",
        "user": user}
    const posts = [post, post, post, post, post, post, post];

    if (req.session.isLoggedIn){
        res.render("space", {"posts": posts, "location": location});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    renderHome,
    renderSpace
}