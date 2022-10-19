"use strict";

// Validator Code from Christopher Saldivar
// Github: https://github.com/ChrisDSaldivar


function makeBodyValidator (schema) {
    return function (req, res, next) {
        const {value, error} = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true, 
            errors: {
                escapeHtml: true,
            }
        });
        
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            console.log(errorMessages);
            return res.status(400).json({"errors": errorMessages});
        } 

        req.body = value;
        next();
    }
}

module.exports = {
    makeBodyValidator,
};