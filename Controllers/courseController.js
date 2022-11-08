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

const { RedisClient } = require("redis");
const courseModel = require("../Models/courseModel");

function renderCourses(req, res) {
    if (req.session.isLoggedIn){
        const courses = courseModel.getUsersCourses(req.session.user.email);
        
        res.render("courses", {"courses": courses});
    } else {
        res.render("log_in");
    }
}

function renderCourse(req, res) {
    if (req.session.isLoggedIn){
        const course = req.params.course;
        const courseRating = courseModel.getCourseRating(course);
        res.render("course", {"course": course, "courseRating": courseRating});
    } else {
        res.render("log_in");
    }
}

function renderAddCourse(req, res) {
    if (req.session.isLoggedIn){
        let allCourses = courseModel.getAllCourses();
        allCourses = allCourses.sort((a, b) => {
            if (a.CourseName < b.CourseName){
                return -1
            }
        });

        res.render("addCourse", {"allCourses": allCourses});
    } else {
        res.render("log_in");
    }
}

function renderAddedCourse(req, res) {
    if (req.session.isLoggedIn){
        courseModel.addCourse(req.body.CRN, req.session.user.email);
        const courses = courseModel.getUsersCourses(req.session.user.email);

        res.render("courses", {"courses": courses});
    } else {
        res.render("log_in");
    }
}

function renderCourseReviews(req, res) {
    if (req.session.isLoggedIn){
        const course = req.params.course;

        res.render("rating", {"course": course});
    } else {
        res.render("log_in");
    }
}

function postCourseReview(req, res) {
    if (req.session.isLoggedIn){
        const courses = courseModel.getUsersCourses(req.session.user.email);
        courseModel.addRating(req.body, req.session.user.userID);

        res.render("courses", {"courses": courses});
    } else {
        res.render("log_in");
    }
}

module.exports = {
    renderCourses,
    renderCourse,
    renderAddCourse,
    renderAddedCourse,
    renderCourseReviews,
    postCourseReview
}