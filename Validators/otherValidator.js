"use strict";
// Requisites
const joi = require("joi");
const {makeValidator} = require("./makeValidator");

// Create a schema for the emissions

// Example Schema
/*
const nameSchema = joi.object({
    emission: joi.number()
        .required(),
    type: joi.string()
        .required(),
});
*/

// Make a validator using the makeValidator function passing the schema
// prop can be 'query', 'params' or 'body'
const nameValidator = makeValidator(nameSchema, prop);

module.exports = {
    emissionsValidator
}