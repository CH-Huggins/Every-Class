"use strict";
const db = require("./db");
const argon2 = require("argon2");
const crypto = require("crypto");


async function addUser(email, password) {
    const uuid = crypto.randomUUID();
    console.log(email,password);

    const hash = await argon2.hash(password);
    const sql = `INSERT INTO users
                    (email, userID, hash)
                VALUES
                    (@email, @userID, @hash)
                `;
    const stmt = db.prepare(sql);
        try {
        stmt.run({
            "userID": uuid,
            "email": email,
            "hash": hash
        });
        return true;
    }
    catch (error) {
        console.log("error", error);
        return false;
    }
}

function getUserbyEmail(email) {
    const sql = "SELECT * FROM Users WHERE email=@email";
    const stmt = db.prepare(sql);
    return stmt.get({"email": email});
}


//function checkEmail(email) {
//    //
//    if (email.includes('@')){
//        // Sets email to a variable
//        let parsed = email.split('@'); // This is throwing an error on setup.ejs
//
//        // If the second portion of the email is an astate email ending
//        if (parsed[1] == `smail.astate.edu`){
//            // Then store it
//
//            // Return true
//            return true;
//        } else {
//            // Don't actually do an error, just placeholder for invalid email
//
//            // Return false
//            return false;
//        }
//    } else {
//        return false;
//    } 
//}

function checkPassword(pass, passVerif) {
    if (pass == passVerif){
        console.log("Passwords match");
        return true;
    } else {
        console.log("passwords do not match");
        return false;
    }
}

module.exports = {
    addUser,
    getUserbyEmail,
    checkPassword,
}



//function storeCredentials(email, pass){
//    // Store the credentials in the database
//    const sql = 'INSERT INTO users VALUES (@email, @pass, null, null);';
//    const stmt = db.prepare(sql);
//    // Will need to hash the password here, but that's a later thing
//    stmt.run({"email": email,
//        "pass": pass});
//        
//
//    console.log("ROW INSERTED WITH EMAIL: " + email + " AND PASSWORD: " + pass); // DUMMY 
//}

//function login(email, pass) {
//    const stmt = db.prepare('SELECT * FROM users WHERE email = @email;');
//    const inf = stmt.all({email});
//    console.log(inf);
//    if(inf[0] != null){ // If query returns values
//        const passwordCheck = inf[0].password;
//        if(passwordCheck === pass)
//            return true;
//        else
//            return false;
//    }else{
//        return false;
//    }
//
//}


