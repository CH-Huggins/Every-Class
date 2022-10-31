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

    const sql2 =
}

async function deleteUser() {

}

function getUserbyEmail(email) {
    const sql = `SELECT * 
                FROM Users
                JOIN Students ON users.userID=students.userID
                WHERE users.email=@email;
                `
    const stmt = db.prepare(sql);
    return stmt.get({"email": email});
}

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



