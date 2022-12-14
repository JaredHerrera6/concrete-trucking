const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const {SECRET} = require ('../constants')

//get The users stored in the Database
exports.getUsers = async(req,res) => {
    try{
        const {rows} = await db.query('SELECT id , username from drivers UNION select id , username from managers UNION select id , username from customers')
        return res.status(200).json({
            success:true,
            users:rows
        })
    }catch(error){
        console.log(error.message)
    }
}
//For the meantime we will only be registering new customers
exports.register = async (req,res) => {
    const {first_name, last_name, email, phone_number, address, username, password} = req.body 
    try {
        //This will hash the password in order to add a form of security
        const hashedpassword = await hash(password,10)
        await db.query
        ('insert into customers (first_name, last_name, email, phone_number, address, username, password) values($1,$2,$3,$4,$5,$6,$7),',
        [first_name, last_name, email, phone_number, address, username, hashedpassword])

        return res.status(201).json({
            success:true,
            message:'The registration was successful'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async(req,res) => {
    let user = req.user
    payload = {
        id:user.id,
        username : user.username
    }
    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token',token,{httpOnly:true}).json({
            success:true,
            message:'Logged in Successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protected = async(req,res) => {
    try {
        return res.status(200).json({
            info:'protected info'
        })
    } catch (error){
        console.log(error.message)
    }
}

exports.logout = async(req,res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly:true}).json({
            success:true,
            message:'Logged out successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error:error.message
        })
    }
}