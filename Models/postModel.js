"use strict"

const db = require("./db");
const crypto = require("crypto");
const userModel = require("../Models/userModel");

/**
 * @brief       Creates a post
 *
 * @detailed    This takes a space location, a user's ID, and the message and
 *              inserts a json body containing those parameters as well as a
 *              randomly generated post ID, the time, date, and the user's
 *              information
 *              
 * @param       location    The certain space that the message is being sent in
 * 
 * @param       userID      The user's ID that is submitting the post
 * 
 * @param       content     The message the user is trying to send
**/

function makePost(location, userID, content) {
    const postID = getPostID();
    // spaceID = location
    // authorID = userID
    // postText = content
    const time = getTime();
    const date = getDate();
    const user = userModel.getUserByUserID(userID);

    const sql = 'INSERT INTO Posts VALUES (@postID, @location, @userID, @content, @time, @date, @firstName, @lastName, @major)';
    const stmt = db.prepare(sql);

    // If there is no post ID, don't submit
    if (!postID){
        return -1;
    } else {
        stmt.run({"postID": postID,
                "location": location,
                "userID": userID,
                "content": content,
                "time": time,
                "date": date,
                "firstName": user[0].firstName,
                "lastName": user[0].lastName,
                "major": user[0].major});
    }
}

/**
 * @brief       Gets posts
 *
 * @detailed    This takes a location and returns an array of all posts that
 *              exist in the space
 *              
 * @param       location    The space that the user is in
 * 
 * @return      Returns an array of posts
**/

function getPosts(location) {
    const check = checkLocation(location);

    if (check == 0){
        return [];
    } else {
        const sql = 'SELECT * FROM Posts WHERE spaceID=@location';
        const stmt = db.prepare(sql);
        const posts = stmt.all({location});
        return posts;
    }
}

/**
 * @brief       Gets all posts by a user
 *
 * @detailed    This take a user's ID and returns all posts made by them
 *              
 * @param       userID  The user's ID used for finding their posts
 * 
 * @return      Returns an array of posts
**/

function getUsersPosts(userID) {
    const sql = 'SELECT * FROM Posts WHERE authorID=@userID';
    const stmt = db.prepare(sql);
    return stmt.all({userID})
}

/**
 * @brief       Checks if there are posts in a location
 *
 * @detailed    Given the Space location that the user is in, return what posts
 *              are in the location
 *              
 * @param       location    Used to determine where to look for posts at
 * 
 * @return      Returns the posts that exist, or 0 if they don't
**/

function checkLocation(location) {
    const sql = 'SELECT * FROM POSTS WHERE spaceID=@location';
    const stmt = db.prepare(sql);
    return stmt.get({location});
}

/**
 * @brief       Gets post ID
 *
 * @detailed    This randomly generates a postID and ensures it does not already
 *              exist. If it does, it generates a new one until it gets a unique
 *              ID.
 *              
 * @return      Returns a unique post ID
**/

function getPostID() {
    const sql = 'SELECT postID FROM Posts';
    const stmt = db.prepare(sql);
    const ids = stmt.all();

    // Get a new id as long as it exists in the database
    do{
        var id = crypto.randomUUID();
    } while (ids.includes(id));

    return id;
}

/**
 * @brief       Gets the current time reformatted
 *
 * @detailed    Calls the JavaScript "Date()" function and parses it to look
 *              presentable and to only get the time
 *              
 * @return      Returns the reformatted time
**/

function getTime() {
    const info = Date().split(' ');
    const timeInfo = info[4].split(':');
    if (timeInfo[0] > 12){
        timeInfo[0] = timeInfo[0] - 12;
        timeInfo[2] = 'pm';
    } else {
        timeInfo[2] = 'am';
    }
    const time = timeInfo[0] + ':' + timeInfo[1] + timeInfo[2];

    return time
}

/**
 * @brief       Gets the current date reformatted
 *
 * @detailed    Calls the JavaScript "Date()" function and parses it to look
 *              presentable and to only get the date
 *              
 * @return      Returns the reformatted date
**/

function getDate() {
    const info = Date().split(' ');
    const date = info[0] + ' ' + info[1] + ' ' + info[2] + ', ' + info[3];

    return date;
}

module.exports = {
    makePost,
    getPosts,
    getUsersPosts
}