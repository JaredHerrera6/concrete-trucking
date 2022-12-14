//Passport is a strategey for authenticating with a json webtoken
//This module lets you authenticate endpoints using a json web token 
//Intended to be used to secure RESTful endpoint without sessions
const passport = require('passport')
const {Strategy} = require('passport-jwt')
const { SECRET } = require('../constants')
const db = require('../db')
//Checks to see if the user sends the correct tokoen

const cookieExtractor = function (req){
    let token = null
    //function checks to see if the user sends a cookie that is called token
    if(req && req.cookies) token =  req.cookies['token']
    //if the cookie is called token, we return the token
    return token
}
//const options
const opts = {
    secretOrKey : SECRET,
    jwtFromRequest : cookieExtractor,
}
//initialize the passport 
passport.use(
    //we get the username from the token 
    // This is how we find the token
    new Strategy(opts, async ({username}, done) => {
        try {
            const{rows} = await db.query
            ('SELECT * from drivers WHERE username = $1 UNION SELECT * from customers WHERE username = $1 UNION SELECT * from managers WHERE username = $1',
            [username])
            //If the rows length does not exist or is empty, we return 401 not authorized
            if(!rows.length){
                throw new Error('401 not authorized')
            }
            //we create a user with this username 
            let user = {username : rows[0].username}
            //We then return this user object that we can not actually use. 
            return await done(null,user)
        } catch (error) {
            console.log(error.message)
            done(null,false)
        }
    })
)
