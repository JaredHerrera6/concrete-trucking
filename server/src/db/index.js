const {Pool} = require('pg')
//This is what will connect us to out database
const pool = new Pool();
//Pool already knows to look for the env variables needed to connect to the database
module.exports = {
    query:(text,params) => pool.query(text,params)
}