"use strict"

const spaceModel = require("../Models/spaceModel");

function renderHome(req, res) {
    // Populate array of posts
    //const posts = spaceModel.populatePosts("home");
    // Test array
    const user = {"firstName": "Christian", "lastName": "Huggins", "gpa": "4.0", "major": "Computer Science", "img": false}
    // Will use this code for the post method to store the time and date
    const info = Date().split(' ');
    const date = info[0] + ' ' + info[1] + ' ' + info[2] + ', ' + info[3];
    const timeInfo = info[4].split(':');
    if (timeInfo[0] > 12){
        timeInfo[0] = timeInfo[0] - 12;
        timeInfo[2] = 'pm';
    } else {
        timeInfo[2] = 'am';
    }
    const time = timeInfo[0] + ':' + timeInfo[1] + timeInfo[2];

    const post = {"date": date, 
        "time": time, 
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
    const info = Date().split(' ');
    const date = info[0] + ' ' + info[1] + ' ' + info[2] + ', ' + info[3];
    const timeInfo = info[4].split(':');
    if (timeInfo[0] > 12){
        timeInfo[0] = timeInfo[0] - 12;
        timeInfo[2] = 'pm';
    } else {
        timeInfo[2] = 'am';
    }
    const time = timeInfo[0] + ':' + timeInfo[1] + timeInfo[2];

    const post = {"date": date, 
        "time": time, 
        "location": "Home", 
        "content": "Testing the " + location + " page",
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