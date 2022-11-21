"use strict"

const db = require("./db");
const crypto = require("crypto");


//get specific room on user request
function getSpecificRoom(roomNumber) {
    const sql = `SELECT roomNumber
                 FROM Library
                 WHERE roomNumber=@roomNumber
                 `;
    const stmt = db.prepare(sql);
    return stmt.get({"roomNumber": roomNumber});
}

function checkRoomUser(userID) {
    const sql = `SELECT userID
                 FROM Library
                 WHERE userID=@userID
                 `;
    const stmt = db.prepare(sql);
    return stmt.get({"userID": userID});
}


//change to update later
function checkIn(userId, roomNumber, occupied, timeIn, timeOut) {
    const sql = `Insert INTO Library
                    (userID, roomNumber, occupied)
                 VALUES (@userID, @roomNumber, @occupied)
                 `;
    const stmt = db.prepare(sql);
     try {
        stmt.run({
            "roomID": crypto.randomUUID(),
            "userID": userId,
            "roomNumber": roomNumber,
            "occupied": occupied
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

function checkOut(userID) {
    const sql = `DELETE
                 FROM Library
                 WHERE userID = @userID
                 `;
    const stmt = db.prepare(sql);
    try {
        stmt.run({"userID": userID});
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

function checkAllResererved(occupied) {
    const sql = `SELECT *
                FROM LIBRARY
                WHERE occupied = @occupied
                `;
    const stmt = db.prepare(sql);
    return stmt.all({"occupied": occupied, "roomNumber": roomNumber});
};

function checkSpecificResererved(occupied, roomNumber) {
    const sql = `SELECT *
                FROM LIBRARY
                WHERE occupied = @occupied AND roomNumber = @roomNumber
                `;
    const stmt = db.prepare(sql);
    return stmt.get({"occupied": occupied, "roomNumber": roomNumber});
};

function libraryLog(userID, roomNumber, occupied) {
    const sql = `INSERT INTO 
                    (userID, roomNumber, roomID, occupied)
                 VALUES 
                    (@userID, @roomNumber, @roomID, @occupied)
                 `;
    const stmt = db.prepare(sql);
    return stmt.get({"userID": userID, "occupied": occupied, "roomNumber": roomNumber});
    
}


// library log

module.exports = {
    checkRoomUser,
    getSpecificRoom,
    checkIn,
    checkOut,
    checkAllResererved,
    checkSpecificResererved,
    libraryLog
}