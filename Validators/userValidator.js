"use strict";

const joi = require("joi");
const {makeValidator} = require("./makeValidator");

const registerSchema = joi.object({
    "email": joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['edu'] } })
        .pattern(/^[a-zA-Z]+\.[a-zA-Z0-9]+@smail\.astate\.edu$/)
        .required(),

    "pswd": joi.string()
        .min(7)
        .required()
        .token(),

    "pswd_verify": joi.string()
        .valid(joi.ref('pswd'))
        .required()
        .token(),
})

const loginSchema = joi.object({
    "email": joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['edu'] } })
        .pattern(/^[a-zA-Z]+\.[a-zA-Z0-9]+@smail\.astate\.edu$/)
        .required(),

    "pswd": joi.string()
        .min(7)
        .required()
        .token(),
})

// Make a validator using the makeValidator function passing the schema
const registerValidator = makeValidator(registerSchema, `body`);
const loginValidator    = makeValidator(loginSchema, `body`);

module.exports = {
    registerValidator,
    loginValidator,
};