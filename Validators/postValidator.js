"use strict";

const joi = require("joi");
const {makeValidator} = require("./makeValidator");

const postSchema = joi.object({
    "postText": joi.string()
        .required()
})

const postValidator = makeValidator(postSchema, `body`, "post");

module.exports = {
    postValidator
};