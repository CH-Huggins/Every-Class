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

/**
 * @brief       Renders standard courses page upon nav bar link
 *
 * @detailed    This renders the standard courses page that lists all
 *              courses a user is taking
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderCourses(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes an array courses of all courses a user is taken given
        // their email
        const courses = courseModel.getUsersCourses(req.session.user.email);
        // Returns true for added as false is only delivered when max hours
        // are being taken
        res.render("courses", {"courses": courses,
                                "added": true});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders standard course page upon courses link
 *
 * @detailed    This renders the standard course page that shows the courses
 *              ratings and links to the course space and ratings page
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderCourse(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes course to the name that was clicked on the courses page
        const course = req.params.course;
        // Initializes courseRating which gets a json body of the ratings
        // of a given course
        const courseRating = courseModel.getCourseRating(course);
        // Gives course and the rating of that course
        res.render("course", {"course": course, "courseRating": courseRating});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders add course page upon clicking the add button on
 *              the courses page
 *
 * @detailed    This renders the add course page that shows the all of the
 *              courses that are offered and allows the user to select one
 *              to add to their CoursesTaken db
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderAddCourse(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes an array of every course offered
        let allCourses = courseModel.getAllCourses();
        // Performs a quick sort on the array based on the course names
        allCourses = allCourses.sort((a, b) => {
            if (a.CourseName < b.CourseName){
                return -1
            }
        });
        // Gives every course possible
        res.render("addCourse", {"allCourses": allCourses});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders courses page after adding a course
 *
 * @detailed    This renders the standard courses page that lists all
 *              courses a user is taking after adding the new course selected
 *              from the addCourse.ejs file
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderAddedCourse(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes hours a student is taking
        const hours = courseModel.checkCourseHours(req.session.user.email);
        let totalHours = 0
        // Initializes course to be a json body of course data given the CRN
        const course = courseModel.getCourseFromCRN(req.body.CRN);

        // Adds up the hours
        for (let i = 0; i < hours.length; i++){
            // Add up the hours
            totalHours += hours[i].totalCredits;
        }

        // If the hours would be under 18, add the course
        if (totalHours + course.credits < 18){
            // Adds the course to the database and affiliates it with the user
            courseModel.addCourse(req.body.CRN, req.session.user.email);
            // Gets the user's courses
            const courses = courseModel.getUsersCourses(req.session.user.email);
            // Returns true for added as false is only delivered when max hours
            // are being taken
            res.render("courses", {"courses": courses,
                                    "added": true});
        } else {
            // Gets the user's courses
            const courses = courseModel.getUsersCourses(req.session.user.email);

            // Returns false for added as false is  delivered when max hours
            // are being taken
            res.render("courses", {"courses": courses,
                                    "added": false});
        }
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders courses page after dropping a course
 *
 * @detailed    This renders the standard courses page that lists all
 *              courses a user is taking after dropping the  course selected
 *              from the courses.ejs file
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderDroppedCourse(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Calls function to delete the course from the database
        courseModel.dropCourse(req.body.CRN, req.session.user.email);
        // Gets the user's courses
        const courses = courseModel.getUsersCourses(req.session.user.email);
        // Returns true for added as false is only delivered when max hours
        // are being taken
        res.render("courses", {"courses": courses,
                                "added": true});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

/**
 * @brief       Renders ratings page for a course
 *
 * @detailed    This renders the ratings page where a user can give a course
 *              ratings
 *              
 * @param       req         the request sent by the client
 * 
 * @param       res         the response sent be the server
**/

function renderCourseReviews(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        // Initializes the course passed through the params
        const course = req.params.course;
        // Passes the course so that the form for the rating can pass the course
        // in the next endpoint so that the rating can be given to the proper
        // course
        res.render("rating", {"course": course});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

function postCourseReview(req, res) {
    // If logged in, operate
    if (req.session.isLoggedIn){
        const courses = courseModel.getUsersCourses(req.session.user.email);
        courseModel.addRating(req.body, req.session.user.userID);

        // Returns true for added as false is only delivered when max hours
        // are being taken
        res.render("courses", {"courses": courses,
                                "added": true});
    } else {
        // If not, redirect to login page
        res.render("log_in");
    }
}

module.exports = {
    renderCourses,
    renderCourse,
    renderAddCourse,
    renderAddedCourse,
    renderCourseReviews,
    renderDroppedCourse,
    postCourseReview
}