"use strict";
const db = require("./db");
const argon2 = require("argon2");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/**
 * @brief       Inserts a new user into the database
 *
 * @detailed    Given an email and password, create a unique user ID and 
 *              insert all of the data into the database
 *              
 * @param       email       the user's email
 * 
 * @param       password    the user's password
 * 
 * @return      Returns whether or not the insertion worked or not
**/

async function addUser(email, password) {
    const uuid = crypto.randomUUID();

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

/**
 * @brief       Gets the user
 *
 * @detailed    Given the email, find the user that is associated with that
 *              email
 *              
 * @param       email       Used to find the user associated with the email
 * 
 * @return      Returns the user
**/

function getUserbyEmail(email) {
    const sql = "SELECT * FROM Users WHERE email=@email";
    const stmt = db.prepare(sql);
    return stmt.get({"email": email});
}

/**
 * @brief       Gets the user
 *
 * @detailed    Given the id, find the user that is associated with that id
 *              
 * @param       id          Used to find the user associated with the id
 * 
 * @return      Returns the user
**/

function getUserByUserID(userID) {
    const sql = "SELECT * FROM users WHERE userID=@userID";
    const stmt = db.prepare(sql);
    return stmt.all({userID});
}

/**
 * @brief       Gets all users
 *
 * @detailed    Find all users that are in teh database, reformat the array,
 *              and return that array
 * 
 * @return      Returns an array containing a user's ID, first name, and last
 *              name
**/

function getAllUsers() {
    const sql = 'SELECT * FROM users';
    const stmt = db.prepare(sql);
    const users = stmt.all();
    const info = [];

    for (let i = 0; i < users.length; i++){
        const data = {"userID": users[i].userID,
                        "firstName": users[i].firstName,
                        "lastName": users[i].lastName};

        info.push(data);
    }
    return info;
}

/**
 * @brief       Checks a user's password
 *
 * @detailed    Given the password and the verification password, this function
 *              checks to ensure they are the same and returns true or false
 *              
 * @param       pass            First password
 * 
 * @param       passVerif       Verified password
 * 
 * @return      Returns true or false based on if the passwords match
**/

function checkPassword(pass, passVerif) {
    if (pass == passVerif){
        console.log("Passwords match");
        return true;
    } else {
        console.log("passwords do not match");
        return false;
    }
}

/**
 * @brief       Send an account verification email
 *
 * @detailed    Given the email and a user's ID, it emails a user using the
 *              everyclass email for them to verify their account.
 *              
 * @param       email       User's email to contact them
 * 
 * @param       userID      User's ID associated with their account
**/
// Not used because we are poor

function sendEmail(email, userID) {
    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "everyclassdotorg@gmail.com",
            pass: "P@$$\/\/0RD"
        }
    });    

    const sender = "Every Class";
    const emailOptions = {
        from: sender,
        to: email,
        subject: "Confirm Email",
        html: `<a href=http://localhost:${process.env.PORT}/verify/${userID}> Click here </a> to verify your email.`
    }

    transport.sendMail(emailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("email sent");
        }
    });
}

/**
 * @brief       Verifies the user
 *
 * @detailed    Given the userID, the account becomes validated proving that
 *              they own their email
 *              
 * @param       userID          The ID associated with the user's account
**/

function checkUser(userID) {
    const sql = 'UPDATE users SET validated=true WHERE userID=@userID';
    const stmt = db.prepare(sql);
    stmt.run({userID});
}

/**
 * @brief       Updates the user's information
 *
 * @detailed    Given the user's ID, GPA, major, first name, and last name
 *              provided when the user is updating their account, their data in
 *              the database is updated displaying their new values
 *              
 * @param       userID          The ID associated with the user's account
 * 
 * @param       GPA             The user's Grade Point Average
 * 
 * @param       major           The user's major
 * 
 * @param       firstName       The user's first name
 * 
 * @param       lastName        The user's last name
**/

function updateUser(userID, GPA, major, firstName, lastName) {
    const sql = 'UPDATE users SET GPA=@GPA, major=@major, firstName=@firstName, lastName=@lastName WHERE userID=@userID';
    const stmt = db.prepare(sql);
    stmt.run({"GPA": GPA,
                "major": major,
                "firstName": firstName,
                "lastName": lastName,
                "userID": userID});
}

module.exports = {
    addUser,
    getUserbyEmail,
    getUserByUserID,
    checkPassword,
    getAllUsers,
    checkUser,
    updateUser
}