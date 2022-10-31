"use strict"

const db = require("./db");
const crypto = require("crypto");

function makePost(text, author) {

    const postID = crypto.randomUUID();

    const sql = ` 
                INSERT INTO Posts
                    (postID, author, postText)
                VALUES
                    (@postID, @author, @text)
                `;

    const stmt = db.prepare(sql);

    try {
        stmt.run({
            "postID": postID,
            "author": author,
            "postText": text
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function getUserPosts() {
    const sql = `
        SELECT`

}


module.exports = {
    makePost,
    getUserPosts,
}