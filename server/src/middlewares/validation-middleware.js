//validationResult extracts the validation errors from a request and makes them available in a result object
const {validationResult} = require('express-validator')

exports.validationMiddleware = (req,res,next) => {
    let errors = validationResult(req)
    //if the errors is not empty, return status code 400 along with the array of erros
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array()
        })
    }
    next()
}