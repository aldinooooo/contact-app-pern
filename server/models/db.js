const Pool = require('pg').Pool

const pool = new Pool({
    user:'postgres',
    password:'iLoveF2B',
    host:'localhost',
    port:'5432',
    database:'contacts'
})

module.exports = pool