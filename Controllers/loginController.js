"use script";

const loginModel = require("../Models/loginModel");
var config = require('../Controllers/databaseController');
var connection= config.connection;

/* ----------------------------------------------------
        REQUIRE DATA FROM log_in.html
   ---------------------------------------------------- */
function loginControl(req, res){

    const data = loginModel.login(req.query.email, req.query.pswd);
    var email = req.query.email;
    var password = req.query.pswd;
    const sqlLogin = 'select name from students where email = ? and password = ?';
    connection.query(sqlLogin, [email, password] , function (error, results, fields) {
        if (error) throw error;
        var name = results[0].name;

        // Send user's name to /home.ejs
        res.render("home", {"email": req.query.email,"name": name});
      });
    
}

module.exports = {
    loginControl
}