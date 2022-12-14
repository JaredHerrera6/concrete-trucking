const {Router} = require('express')
//imports the controllers from auth.js in the controller folder
const {getUsers,protected, login, register} = require('../controllers/auth')
const {userAuth} = require('../middlewares/auth-middleware')
const { validationMiddleware } = require('../middlewares/validation-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')

//Initialize the Router
const router = Router()
//Gets the users by using the getUser function in the auth.js(controllers) file.
router.get('/get-users',getUsers)

router.get('/protected',userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)

router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout')

module.exports= router






