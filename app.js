"use strict";

// ========================================================================== //
// ============================ Boiler Plate ================================ //
// ========================================================================== //

require("dotenv").config();

// Standard App Setup
const express = require("express");
const app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// Production Security
const helmet = require("helmet");

// Initializing variable for if deploying in development
const isDevelopement = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

// Initializing variable for if deploying in production
const isProduction = process.env.NODE_ENV === "production";

//Redis Session Management
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();



// if in production, set up protections
if (isProduction) {
	app.set('trust proxy', 1);
	app.use(require("helmet")()); // Add helmet in production
}

// Development/Production Session Configuration
const sessionConfig = {
	store: new RedisStore({ client: redisClient }),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	name: "session",
	cookie: {
			sameSite: isProduction,
			secure: isProduction,
			httpOnly: true,
	    maxAge: process.env.MAX_AGE || 1000 * 60 * 60 * 8, // Defaults to 8 hours
	}
};
app.use(session(sessionConfig));



// Error Handlers
const {notFoundHandler, productionErrorHandler, catchAsyncErrors} = require("./utils/errorHandlers");

// ========================================================================== //
// ============================= Actual Code ================================ //
// ========================================================================== //

// Validators
const userValidator = require("./Validators/userValidator");
const postValidator = require("./Validators/postValidator");

// Controllers
const userController = require("./Controllers/userController");
const postController = require("./Controllers/postController");

// Nav Bar Controllers
const spaceController = require("./Controllers/spaceController");
const profileController = require("./Controllers/profileController");
const courseController = require("./Controllers/courseController")

// Global Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '200kb'}));

// Endpoints (Seperate into alotted sections) DONT FORGET VALIDATORS
//app.get("/location/:possibleParam", nameValidator, nameController.renderName);

app.post("/api/user", userValidator.registerValidator, userController.createNewUser);
app.post("/api/login", userValidator.loginValidator, userController.logIn);
app.post("/api/posts", postValidator.postValidator, postController.createPost);

// Nav Bar
app.get("/api/home", spaceController.renderHome);
app.get("/api/courses", courseController.renderCourses);
// TODO
app.get("/api/library",);
app.get("/api/profile", profileController.loadProfile);
// TODO
app.get("/api/library",);
app.post("/api/logOut", userController.logOut);

// Course Pages
// Course Main Page
app.get("/api/course/:course", courseController.renderCourse);
// Course Space
app.get("/api/space/:course", spaceController.renderSpace);
// TODO
// Review Page
app.get("/api/review/:course", courseController.renderCourseReviews);
app.post("/api/courseRating", courseController.postCourseReview);
// Add Course Page
app.get("/api/addCourse", courseController.renderAddCourse);
app.post("/api/addedCourse", courseController.renderAddedCourse);

// ========================================================================== //
// ============================ Error Handlers ============================== //
// ========================================================================== //

// Error Handlers Implemented
// Handles 404 errors
app.use(notFoundHandler);

// Handles 500 errors
if(isProduction){
	app.use(productionErrorHandler);
}

module.exports = app;