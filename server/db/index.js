const {Pool} = require('pg')
//Is what is going to connect to put postgres database
const pool = new Pool();
module.exports = {
    query:(text,params) => pool.query(text,params)
}