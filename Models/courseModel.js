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

/**
 * @brief       Gets all course information from the database given a name
 *
 * @detailed    Operates on the database to get a course's name, hours, and
 *              CRN given the name of the course itself. It then returns all
 *              of this data.
 *              
 * @param       course        the course that is being searched for
 * 
 * @return      Returns a json body containing a course's information
**/

function getCourseFromName(course) {
    const sql = 'SELECT * FROM Courses WHERE CourseName=@course';
    const stmt = db.prepare(sql);
    const courseData = stmt.get({course});

    return courseData;
}

/**
 * @brief       Gets all course information from the database given a CRN
 *
 * @detailed    Operates on the database to get a course's name, hours, and
 *              CRN given the CRN of the course itself. It then returns all
 *              of this data.
 *              
 * @param       CRN        the CRN of the course that is being searched for
 * 
 * @return      Returns a json body containing a course's information
**/

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
    // Gets every rating for the course and stores it in an array courses
    const courses = getCourseRatings(course);
    // Initializes a count and each course base score at 0
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

    // If there is not count, return 0 since there are no reviews
    if (count == 0){
        return 0;
    } else {
        // Initialize a json body with the average of each category
        const averages = {"Punctuality": (punctuality / count).toFixed(2),
                            "Professionalism": (profes / count).toFixed(2),
                            "Easiness": (easiness / count).toFixed(2),
                            "Interaction": (interaction / count).toFixed(2),
                            "CurveFrequency": (curveFreq / count).toFixed(2)}
        // Find the overall average
        return averages;
    }
}

/**
 * @brief       Gets the courses taken by a user
 *
 * @detailed    Given the email of a user, this function operates on the 
 *              database and creates an array of CRNs of the courses a user is 
 *              taking. It then utilizes a loop to iterate through each CRN to 
 *              get each courses data, and pushes that data into courses. The 
 *              array courses is then returned
 *              
 * @param       email        the email of the user
 * 
 * @return      Returns an array of json bodies containing course data
**/

function getUsersCourses(email) {
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

/**
 * @brief       Adds a course to the user's database
 *
 * @detailed    This calls a function to get the courses data given the CRN.
 *              It then inserts this data into the database of TakenCourses
 *              when it stores who the user is and what course they're taking.
 *              
 * @param       CRN         the CRN of the course that is looking to be added
 * 
 * @param       email       the email used for associating the user with the
 *                          course they are taking that is being added
**/

function addCourse(CRN, email) {
    const courseData = getCourseFromCRN(CRN);
    const courses = getUsersCourses(email);
    var alreadyAdded = false;

    for (let i = 0; i < courses.length; i++){
        if (courses[i].CRN == CRN){
            alreadyAdded = true;
        }
    }

    if (!alreadyAdded){
        const sql = 'INSERT INTO TakenCourses VALUES (@semesterID, @email, @CRN, @totalCredits)';
        const stmt = db.prepare(sql);
        stmt.run({"semesterID": "F2022",
                "email": email,
                "CRN": CRN,
                "totalCredits": courseData.credits});
    }
}

/**
 * @brief       Gets the hours the user is taking
 *
 * @detailed    Given the email of a user, this function operates on the 
 *              database and requests the number of hours a user is taking
 *              
 * @param       email        the email of the user
 * 
 * @return      Returns an array of hours the user is taking
**/

function checkCourseHours(email) {
    const sql = 'SELECT totalCredits FROM TakenCourses WHERE email=@email';
    const stmt = db.prepare(sql);
    const hours = stmt.all({email});

    return hours;
}

/**
 * @brief       Adds a rating to the course rating's database
 *
 * @detailed    This calls a function to get the courses data given the course
 *              name. It then creates a json body named review, that provides
 *              all information necessary to write into the courseRating db.
 *              It then inserts this json body into the database
 *              
 * @param       data        an array of values that we're provided by the user
 *                          in the rating.ejs file
 * 
 * @param       email       the email used for associating the user with the
 *                          course they are taking that is being added
**/

function addRating(data, UUID) {
    // Gets the course data given the course's name
    const course = getCourseFromName(data.course);
    // Initializes a json body containing all values needed for the database.
    const review = {"CRN": course.CRN,
                    "UserID": UUID,
                    "Punctuality": data.Punctuality,
                    "Professionalism": data.Professionalism,
                    "Easiness": data.Easiness,
                    "Interaction": data.Interaction,
                    "CurveFrequency": data.CurveFrequency};

    // Get CRNs of courses the user has rated
    const CRNs = checkRating(UUID);
    // Make flag for if a rating has already been made
    var alreadyRated = false;

    // Check if a rating has already been made, if so, change alreadyRated to 
    // true
    for (let i = 0; i < CRNs.length; i++){
        if (CRNs[i].CRN == course.CRN){
            alreadyRated = true;
        }
    }

    // If not already rated, insert the rating
    if (!alreadyRated){
        const sql = 'INSERT INTO CourseRating VALUES (@CRN, @UserID, @Punctuality, @Professionalism, @Easiness, @Interaction, @CurveFrequency)';
        const stmt = db.prepare(sql);
        stmt.run(review);
    }
}

/**
 * @brief       Gets all CRNs of courses a user rated
 *
 * @detailed    Given the user's id, this finds all CRNs of courses that a user
 *              has rated, and then returns an array of those CRNs
 *              
 * @param       UUID        the user's id number
 * 
 * @return      CRNs        an array containing all CRNs of courses a user
 *                          has rated
**/

function checkRating(UUID) {
    const sql = 'SELECT CRN FROM CourseRating WHERE UserID=@UUID';
    const stmt = db.prepare(sql);
    const CRNs = stmt.all({UUID});

    return CRNs;
}

/**
 * @brief       Deletes a course to the user's database
 *
 * @detailed    This operates on the database and deletes the course with the
 *              given CRN associatated witht he student's email
 *              
 * @param       CRN         the CRN of the course that is looking to be dropped
 * 
 * @param       email       the email used for associating the user with the
 *                          course they are taking that is being dropped
**/

function dropCourse(CRN, email){
    const sql = 'DELETE FROM TakenCourses WHERE CRN=@CRN AND email=@email';
    const stmt = db.prepare(sql);
    stmt.run({"CRN": CRN,
            "email": email});
}

module.exports = {
    getUsersCourses,
    getAllCourses,
    getCourseRating,
    getUsersCourses,
    getCourseFromCRN,
    checkCourseHours,
    addCourse,
    addRating,
    dropCourse
}