"use strict";

// Requisites
require('dotenv').config()
const fs = require("fs");
const db = require("../Models/db.js");

// Read the schema.sql file into a string
const schemaString = fs.readFileSync(__dirname + "/schema.sql", "utf-8");

// Run sql file
db.exec(schemaString);