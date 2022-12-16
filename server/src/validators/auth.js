//Check is a form of a sanitizer function to check somwthing
const {check} = require('express-validator')
const db = require('../db')
//bcryptjs enables storing of passowrds as hashed password instead of plaintext
const {compare} = require ('bcryptjs')

//password constant 
const password = check('password')
.isLength({min : 6, max :15})
.withMessage('Password has to be between 6 and 15 characters')

//Username constant 
const username = check('username')
.isLength({min:6,max:15})
.withMessage('Username has to be between 6 and 15 characters')

//Email Constant 
const email = check('email').isEmail().withMessage('Please provide a valid email')

//Phone number constant 
const phone = check('phone')
.isLength({min:10,max:11})
.withMessage('Phone number has to be between 10 - 11 characters')

//Checks if username exists constant 
const usernameExists = check('username').custom(async (value) => {
    const {rows} = await db.query
    ('SELECT * from drivers WHERE username = $1 UNION SELECT * from customers WHERE username = $1 UNION SELECT * from managers WHERE username = $1',
    [value])
    //If Rows has any row , then the inserted username was found so it already exists.
    if(rows.length){
        throw new Error ('Username already exists')
    }
})

//login validation
//.custom allows for a field to be checked for custom requirements
const loginFieldsCheck = check('username').custom(async(value,{req}) =>{
    const user = await db.query
    ('SELECT * from drivers WHERE username = $1 UNION SELECT * from customers WHERE username = $1 UNION SELECT * from managers WHERE username = $1',
    [value])
    //If the length of user.rows is 0 then we throw an error that The Username does not exist
    if(!user.rows.length){
        throw new Error('Username does not Exist')
    }
    //compares the password provided to the passowrd of the user retrieved(from the username provided)
    const validPassword = await compare (req.body.password, user.rows[0].password)

    if(!validPassword){
        throw new Error('Wrong Password')
    }
    //If all requisites are passed, the req.user is given the all the info from the database
    req.user = user.rows[0]
})

module.exports = {
    registerValidation:[username, password,email,phone, usernameExists],
    loginValidation:[loginFieldsCheck]
}