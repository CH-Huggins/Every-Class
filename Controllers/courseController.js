"use strict"

const courseModel = require("../Models/courseModel");

function renderCourses(req, res) {
    // For when implement
    //const courses = courseModel.getUsersCourses;
    // Practice
    const course = {"CRN": "402395", "CourseName": "Over Achieving 101", "Credits": "1"}
    const courses = [course, course, course, course, course];

    if (req.session.isLoggedIn){
        res.render("courses", {"courses": courses});
    } else {
        res.render("log_in");
    }
}

function renderCourse(req, res) {
    const course = req.params.course;

    if (req.session.isLoggedIn){
        res.render("course", {"course": course});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    renderCourses,
    renderCourse
}