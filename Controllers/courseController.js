/**
 *******************************************************************************
 * @file    courseController.js
 * @brief   Controller for rendering all course ejs files with their respective
 *          information
 *
 * @author  Christian Huggins
 * @date    November 1st, 2022
 *******************************************************************************
**/
"use strict"

const courseModel = require("../Models/courseModel");

function renderCourses(req, res) {
    // For when implement
    //const courses = courseModel.getUsersCourses(email);
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
    const courseRating = courseModel.getCourseRating(course);

    if (req.session.isLoggedIn){
        res.render("course", {"course": course, "courseRating": courseRating});
    } else {
        res.render("log_in");
    }
}

// Need a view for still
function renderAddCourse(req, res) {
    const allCourses = courseModel.getAllCourses;

    if (req.session.isLoggedIn){
        res.render("addCourse", {"allCourses": allCourses});
    } else {
        res.render("log_in");
    }
}

function renderCourseReviews(req, res) {

}

module.exports = {
    renderCourses,
    renderCourse,
    renderAddCourse,
    renderCourseReviews
}