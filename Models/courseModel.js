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

const db = require("./db");

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
    // Get CRN to find reviews for course
    const CRN = getCRN(course);
    
    // Gets all Ratings from the database given the CRN
    const sql = 'SELECT * FROM CourseRating WHERE CRN=@CRN';
    const stmt = db.prepare(sql);
    const courseRatings = stmt.all({CRN});
    // Returns an array of all ratings
    return courseRatings;
}

/**
 * @brief       Gets the CRN of a course given the course name
 *
 * @detailed    Operates on the database to get the CRN of a course provided
 *              the name of the course itself
 *              
 * @param       course        the course that the CRN is being desired
 * 
 * @return      Returns the CRN of a given course
**/

function getCRN(course) {
    const sql = 'SELECT CRN FROM Courses WHERE CourseName=@course';
    const stmt = db.prepare(sql);
    const CRN = stmt.get({course});

    return CRN.CRN;
}

function getCourseFromName(course) {
    const sql = 'SELECT * FROM Courses WHERE CourseName=@course';
    const stmt = db.prepare(sql);
    const courseData = stmt.get({course});

    return courseData;
}

function getCourseFromCRN(CRN) {
    const sql = 'SELECT * FROM Courses WHERE CRN=@CRN';
    const stmt = db.prepare(sql);
    const courseData = stmt.get({CRN});

    return courseData;
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
    let count = 0;
    let punctuality = 0;
    let profes = 0;
    let easiness = 0;
    let interaction = 0;
    let curveFreq = 0;

    // Iterate through the array
    for(let i = 0; i < courses.length; i++){
        // Adds up all sections of all reviews
        punctuality += courses[i].Punctuality;
        profes += courses[i].Professionalism;
        easiness += courses[i].Easiness;
        interaction += courses[i].Interaction;
        curveFreq += courses[i].CurveFrequency;

        // Increases the count used for average
        count++;
    }

    if (count == 0){
        return 0;
    } else {
        const averages = {"Punctuality": punctuality / count,
                            "Professionalism": profes / count,
                            "Easiness": easiness / count,
                            "Interaction": interaction / count,
                            "CurveFrequency": curveFreq / count}
        // Find the overall average
        return averages;
    }
}

function getUsersCourses(email) {
    // YET TO BE TESTED
    const sql = 'SELECT CRN FROM TakenCourses WHERE email=@email';
    const stmt = db.prepare(sql);
    const CRNs = stmt.all({email});
    const courses = [];

    for (let i = 0; i < CRNs.length; i++){
        const course = getCourseFromCRN(CRNs[i].CRN);
        courses.push(course);
    }

    return courses;
}

function addCourse(CRN, email) {
    const courseData = getCourseFromCRN(CRN);
    const sql = 'INSERT INTO TakenCourses VALUES (@semesterID, @email, @CRN, @totalCredits)';
    const stmt = db.prepare(sql);
    stmt.run({"semesterID": "F2022",
                "email": email,
                "CRN": CRN,
                "totalCredits": courseData.credits});
}

function addRating(data, UUID) {
    const course = getCourseFromName(data.course);
    const review = {"CRN": course.CRN,
                    "UserID": UUID,
                    "Punctuality": data.Punctuality,
                    "Professionalism": data.Professionalism,
                    "Easiness": data.Easiness,
                    "Interaction": data.Interaction,
                    "CurveFrequency": data.CurveFrequency};

    const sql = 'INSERT INTO CourseRating VALUES (@CRN, @UserID, @Punctuality, @Professionalism, @Easiness, @Interaction, @CurveFrequency)';
    const stmt = db.prepare(sql);
    stmt.run(review);

}

module.exports = {
    getUsersCourses,
    getAllCourses,
    getCourseRating,
    getUsersCourses,
    addCourse,
    addRating
}