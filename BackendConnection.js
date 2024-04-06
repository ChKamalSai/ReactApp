const mySql = require("mysql2")
const connection = mySql.createPool({
    host: "localhost",
    user: ,
    password: ,
    database: "GMT"
})
module.exports=connection
