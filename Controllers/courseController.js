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
    const course1 = {"CRN": "402395", "CourseName": "Debate", "Credits": "1"}
    const course2 = {"CRN": "404923", "CourseName": "Physics II", "Credits": "4"}
    const course3 = {"CRN": "453032", "CourseName": "Analysis of Algorithms", "Credits": "3"}
    const course4 = {"CRN": "432502", "CourseName": "Database Systems", "Credits": "3"}
    const course5 = {"CRN": "463723", "CourseName": "Java Apps", "Credits": "3"}
    const course6 = {"CRN": "429853", "CourseName": "Software Engineering", "Credits": "3"}
    const courses = [course1, course2, course3, course4, course5, course6];

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