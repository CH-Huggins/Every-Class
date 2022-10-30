"use strict";

const joi = require("joi");
const {makeValidator} = require("./makeValidator");

const registerSchema = joi.object({
    "email": joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['edu'] } })
        .pattern(/^[a-zA-Z]+\.[a-zA-Z0-9]+@smail\.astate\.edu$/)
        .required()
        .messages({
            'string.pattern.base': `"email" must be an astate email'`,
            'string.empty': `"email" cannot be an empty field`,
            'string.min': `"email" should have a minimum length of {#limit}`,
            'any.required': `"email" is a required field`
        }),

    "pswd": joi.string()
        .min(7)
        .required()
        .token()
        .messages({
            'string.base': `"password" should be a type of 'text'`,
            'string.empty': `"password" cannot be empty`,
            'string.min': `"password" should have a minimum length of {#limit}`,
            'any.required': `"password" is a required field`
        }),

    "pswd_verify": joi.string()
        .valid(joi.ref('pswd'))
        .required()
        .token()
        .messages({
            'string.empty': `this field is required`,
            'any.only': "passwords do not match",
        }),
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