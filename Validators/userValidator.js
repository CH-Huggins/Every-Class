"use strict";

const joi = require("joi");
const {makeBodyValidator} = require("./makeValidator");

const registerSchema = joi.object({
    "email": joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['edu'] } })
        .pattern(/[a-zA-Z]+\.[a-zA-Z]+@smail\.astate\.edu/)
        .required()
        .token(),

    "pswd": joi.string()
        .min(7)
        .required()
        .token(),

    "pswd_verify": joi.string()
        .valid(joi.ref('password'))
        .required()
        .token(),
})

const loginSchema = joi.object({
    "email": joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['edu'] } })
        .pattern(/[a-zA-Z]+\.[a-zA-Z]+@smail\.astate\.edu/)
        .required()
        .token(),

    "pswd": joi.string()
        .min(7)
        .required()
        .token(),
})

// Make a validator using the makeValidator function passing the schema
const registerValidator = makeBodyValidator(registerSchema);
const loginValidator    = makeBodyValidator(loginSchema);

module.exports = {
    registerValidator,
    loginValidator,
};