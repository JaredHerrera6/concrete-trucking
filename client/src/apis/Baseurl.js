import axios from "axios"

//NODE_ENV  = 'development '
//NDOE_ENV = 'production'

//if we are in production baseurl = /api/v1
//Else baseurl = "http://localhost:3005/api/v1"

//const baseURL = "http://localhost:3005/api/v1"

const baseURL = process.env.NODE_ENV === 'production' ? "api/v1" : "http://localhost:3001/api/v1"

export default axios.create({
    baseURL,
})
//This Will Serve as our base URL