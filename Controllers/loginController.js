"use script";

const loginModel = require("../Models/loginModel");
/* ----------------------------------------------------
        REQUIRE DATA FROM log_in.html
   ---------------------------------------------------- */
function loginControl(req, res){
    var email = req.query.email;
    var password = req.query.pswd;
    const post = {"name": "User's Name",
                    "timePosted": "10-6-22 11:59",
                    "message": "This is a message posted."};
    const posts = [];
    
    for(let i=0; i<20; i++){
        posts.push(post);
    }

    if(loginModel.login(email, password)){
        res.render("home", {"posts": posts});
    }else{
        res.render("log_in")
    }
    
}

module.exports = {
    loginControl
}