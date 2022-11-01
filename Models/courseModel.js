/**
 *******************************************************************************
 * @file    courseModel.js
 * @brief   Model function that contains all functions that manage course info
 *
 * @author  Christian Huggins
 * @date    November 1st, 2022
 *******************************************************************************
**/

"use strict"

/**
 * @brief       Gets all courses of a user
 *
 * @detailed    Operates on the database to get the courses currently being
 *              taken by a user given their email, and then returning an array.
 *              If there are no classes, the array should be returned empty.
 *              
 * @param       email        the email of a user
 * 
 * @return      Returns the courses currently being taken by a user
**/

function getUsersCourses(email) {
    const usersCourses = [];

    return usersCourses;
}

/**
 * @brief       Gets all courses offered by the university
 *
 * @detailed    Operates on the database to get the courses currently being
 *              offered by the university through a simple stmt.all command
 * 
 * @return      Returns all courses
**/

function getAllCourses() {
    // Should just use a stmt all sql command to get the entire course db and
    // store it in an array
    const sql = 'SELECT * FROM Courses';
    const stmt = db.prepare(sql);
    const allCourses = stmt.all();

    return allCourses;
}

/**
 * @brief       Gets all ratings for a given course
 *
 * @detailed    Operates on the database to get the ratings of the course
 *              a user is currently interacting with. This will then return
 *              an array of all reviews. If there are no reviews, the array
 *              should return empty.
 *              
 * @param       course        the course that ratings are desired for
 * 
 * @return      Returns an array of all ratings of a given course
**/

function getCourseRatings(course) {
    // Should return professor ratings and if none, return an empty array
    const courseRatings = [];

    return courseRatings;
}

/**
 * @brief       Gets the average of all course ratings
 *
 * @detailed    This calls the above getCoursesRatings and is given an array.
 *              So long as that array exists, it will iterate through it to
 *              average all 5 sections into one score and then add it to the 
 *              total sum to be averaged. It then returns that overall average.
 *              
 * @param       course        the course that an overall rating is desired for
 * 
 * @return      Returns the overall rating of the given course
**/

function getCourseRating(course) {
    // Should average all ratings for the course
    const courses = getCourseRatings(course);
    let sum = 0;
    let count = 0;

    // Iterate through the array
    for(let i = 0; i < courses.length; i++){
        let singleRating = 0;
        
        // TODO === CHANGE THESE RATINGS TO THEIR ACTUAL NAMES
        // Adds all sections of a review to a single category
        singleRating += courses[i].review1;
        singleRating += courses[i].review2;
        singleRating += courses[i].review3;
        singleRating += courses[i].review4;
        singleRating += courses[i].review5;

        // Divides the singleRating value by the total number of sections
        sum += singleRating / 5;
        // Increases the count used for average
        count++;
    }

    if (sum == 0){
        return 0;
    } else {
        // Find the overall average
        return average = sum / count;
    }
}

module.exports = {
    getUsersCourses,
    getAllCourses,
    getCourseRating
}