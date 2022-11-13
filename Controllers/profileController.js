"use strict";

function loadProfile (req,res) {
    const user = {"firstName": "Christian", "lastName": "Huggins", "gpa": "4.0", "major": "Computer Science"}
    const post = {"date": "10/31/2022", "time": "1:00pm", "location": "Java Apps", "content": "Hello!"}
    const posts = [post, post, post, post, post, post, post];

    if (req.session.isLoggedIn){
        res.render("profile", {"user": user, "posts": posts});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    loadProfile
}