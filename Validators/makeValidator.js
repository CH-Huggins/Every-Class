"use strict";

// Validator Code from Christopher Saldivar
// Github: https://github.com/ChrisDSaldivar


function makeValidator (schema, prop, location) {
    return function (req, res, next) {
        const {value, error} = schema.validate(req[prop], {
            abortEarly: false,
            stripUnknown: true, 
            errors: {
                escapeHtml: true,
            }
        });
        
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            //return res.status(400).json({errorMessages});

            if (location == "login"){
                return res.redirect("/?invalid=true")
            } else if (location == "sign_up") {
                return res.render("sign_up");
            }
        } 

        req[prop] = value;
        
        next();
    }
}

module.exports = {
    makeValidator,
};