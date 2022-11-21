"use strict"

const libraryModel = require("../Models/libraryModel");
const schedule = require("node-schedule");



//needs email set up, and the timestamp parsed
//need to see what the timestamp will look like

function checkIntoRoom(req, res) {

    if (!req.session.isLoggedIn) {
        return res.redirect("log_in");
    }

    const {roomNumber, timeIn, timeOut} = req.body;
    const userID = req.session.user.userID;

    //check if it got occupied while they were trying to send the request
    const checkIfOccupied = libraryModel.checkSpecificResererved(`1`, roomNumber);
    console.log("Occupied:", checkIfOccupied);

    // check if the user already has a room booked
    const checkUser = libraryModel.checkRoomUser(userID);
    console.log(checkUser);

    // ** EJS UDDATE
    if(checkIfOccupied || checkUser) {
        return res.sendStatus(500);
    }

    //room is not occupied or user has not submitted multiple requests, can check in
    const checkIn = libraryModel.checkIn(userID, roomNumber, 1, timeIn, timeOut);    
    console.log(checkIn);
    if (!checkIn) {
        return res.sendStatus(400);
    }
    // schedule the time to checkout

    const date = new Date("2022-03-25");
    const librarySchedule = schedule.scheduleJob((date, function() {
        libraryModel.checkOut(userID);

        // set up node mail

    }));

    // ** EJS UPDATE
    res.sendStatus(201);
}

function showAvailableRooms(req, res) {
    
    const checkReserved = libraryModel.checkAllResererved(1);
    console.log(checkReserved); 

    //**EJS UPDATE **/
    if (!checkReserved) {
        res.sendStatus(500);
    }

    //**EJS UPDATE **/
    res.sendStatus(201);
}

function checkOutManual (req, res) {

    if (!req.session.isLoggedIn) {
        return res.redirect("log_in");
    }
    const userID = req.session.user.userID;
    const checkOut = libraryModel.checkOut(userID);

    // set up node mail

    const job = schedule.scheduledJobs['librarySchedule'];
    if(job) {
        const result = schedule.cancelJob('librarySchedule');
        console.log(result);
    }

    console.log(checkOut);
    if(!checkOut) {
        return res.sendStatus(400);
    }
    
    res.sendStatus(201);
    
}




module.exports = {
    checkIntoRoom,
    showAvailableRooms,
    checkOutManual
}